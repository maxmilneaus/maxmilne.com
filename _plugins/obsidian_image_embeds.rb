module Jekyll
  # Converts Obsidian-style image embeds to HTML <img> tags at build time.
  # Supported syntaxes in content (as seen in Obsidian Preview):
  #   ![[file.jpg]]
  #   ![[file.jpg|100]]
  #   ![[file.jpg|640x480]]
  #   ![[file.jpg|My Alt Text]]
  #   ![[file.jpg|My Alt|320x200|right|class=rounded shadow|title=A title]]
  #   ![[file.jpg|align=center]]
  #   ![[sub/folder/file.jpg]]
  # Behavior:
  #   - If no folder is provided, assumes images live under /assets/
  #   - Spaces in filenames are percent-encoded
  #   - Respects site.baseurl
  #   - Adds loading="lazy"
  #   - Optional modifiers after the first pipe (|) allow:
  #       • width: "200" or "200x150"
  #       • alt text: free-form token or "alt=..."
  #       • classes: "class=foo bar"
  #       • alignment: "left", "right", or "center" (adds CSS classes)
  #       • title: "title=..."
  #   - Leaves standard Markdown images alone
  class ObsidianImageEmbeds < Generator
    safe true
    priority :high

    def generate(site)
      docs = (site.collections.values.flat_map(&:docs) + site.pages).compact
      docs.each { |d| d.content = transform(d.content, site) }
    end

    private

    def transform(text, site)
      baseurl = site.baseurl.to_s.sub(%r{/*$}, '')

      # 0) Temporarily shield fenced code blocks so we don't transform inside them
      shields = []
      shielded = text.gsub(/```[\t ]*([a-zA-Z0-9_-]+)?\n([\s\S]*?)\n```/) do |m|
        token = "__OBSIDIAN_IMG_EMBED_SHIELD_#{shields.length}__"
        shields << m
        token
      end

      # 1) Convert Obsidian image embeds in the unshielded content
      processed = shielded.gsub(/!\[\[(.+?)(?:\|([^\]]+))?\]\]/) do
        raw = Regexp.last_match(1).strip
        mod = (Regexp.last_match(2) || '').strip

        # Skip non-image targets (audio/video/providers); handled elsewhere or left as-is
        if non_image_target?(raw)
          next Regexp.last_match(0)
        end

        # Normalize any path that contains an assets/ segment to start at assets/
        normalized = raw.dup
        if (m = normalized.match(/assets\//i))
          normalized = normalized[m.begin(0)..-1] # keep from 'assets/' onward
          normalized.sub!(/\Aassets\//i, 'assets/')
        end

        # Path resolution:
        # - If no folder provided, default to assets/<file>
        # - If a folder is provided but doesn't start with 'assets/' or '/', treat it as assets/<folder>/<file>
        #   This enables shorthand like ![[photos/session-01/shot.jpg]] → /assets/photos/session-01/shot.jpg
        if normalized.include?('/')
          if normalized =~ /\Aassets\//i || normalized.start_with?('/')
            path = normalized
          else
            path = "assets/#{normalized}"
          end
        else
          path = "assets/#{normalized}"
        end
        src  = "#{baseurl}/#{encode_url(path)}"

        # Parse modifiers
        opts = parse_modifiers(mod)
        w, h = [opts[:width], opts[:height]]
        alt = opts[:alt] || File.basename(raw, File.extname(raw)).tr('_-', ' ').strip
        classes = opts[:classes]
        title = opts[:title]

        attrs = []
        attrs << %(src="#{html_escape(src)}")
        attrs << %(alt="#{html_escape(alt)}")
        loading = opts[:loading] && %w[lazy eager].include?(opts[:loading]) ? opts[:loading] : 'lazy'
        attrs << %(loading="#{loading}")
        attrs << %(width="#{w}") if w
        attrs << %(height="#{h}") if h
        attrs << %(class="#{html_escape(classes.join(' '))}") if classes && !classes.empty?
        attrs << %(title="#{html_escape(title)}") if title && !title.empty?
        "<img #{attrs.join(' ')} />"
      end

      # 2) Restore fenced code blocks
      processed.gsub(/__OBSIDIAN_IMG_EMBED_SHIELD_(\d+)__/) do
        idx = Regexp.last_match(1).to_i
        shields[idx]
      end
    end

    def non_image_target?(raw)
      r = raw.strip
      # Explicit provider prefixes
      return true if r =~ /^(youtube|vimeo):/i

      # Audio/video file extensions
      return true if r =~ /\.(mp3|m4a|aac|flac|ogg|oga|wav|webm|ogv|mp4|m4v|mov)(?:\?|#|$)/i

      # External hosts for video providers
      if r =~ %r{^https?://}i
        begin
          uri = URI.parse(r)
          host = (uri.host || '').downcase
          return true if host.include?('youtube.com') || host.include?('youtu.be') || host.include?('vimeo.com') || host.include?('player.vimeo.com')
        rescue URI::InvalidURIError
        end
      end

      false
    end

    def parse_modifiers(mod)
      result = { width: nil, height: nil, alt: nil, classes: [], title: nil, loading: nil }
      return result if mod.nil? || mod.empty?

      tokens = mod.split('|').map { |t| t.strip }.reject(&:empty?)
      tokens.each do |t|
        case t
        when /^\d+x\d+$/i
          w, h = t.downcase.split('x').map(&:to_i)
          result[:width], result[:height] = w, h
        when /^\d+$/
          result[:width] = t.to_i
        when /^alt=(.+)$/i
          result[:alt] = $1.strip
        when /^class=(.+)$/i
          classes = $1.strip
          result[:classes].concat(classes.split(/\s+/)) unless classes.empty?
        when /^title=(.+)$/i
          result[:title] = $1.strip
        when /^(eager|lazy)$/i
          result[:loading] = $1.downcase
        when /^loading=(eager|lazy)$/i
          result[:loading] = $1.downcase
        when /^(left|right|center)$/i
          align = $1.downcase
          result[:classes] << "align-#{align}"
        when /^align=(left|right|center)$/i
          align = $1.downcase
          result[:classes] << "align-#{align}"
        # Full-bleed / wide variants
        when /^(full|full[-_ ]?width|full[-_ ]?bleed)$/i
          result[:classes] << 'full-bleed'
        when /^(wide|wide[-_ ]?crop|bleed[-_ ]?crop|hero)$/i
          result[:classes] << 'wide-crop'
        when /^(page\+?|page[-_ ]?plus|page[-_ ]?wide|container)$/i
          result[:classes] << 'page-plus'
        else
          # Fallback: first free-form token becomes alt text
          result[:alt] ||= t
        end
      end

      result
    end

    def encode_url(path)
      # Minimal percent-encoding for common characters in filenames
      enc = path.dup
      enc.gsub!(' ', '%20')
      enc.gsub!('#', '%23')
      enc.gsub!('(', '%28')
      enc.gsub!(')', '%29')
      enc.gsub!('[', '%5B')
      enc.gsub!(']', '%5D')
      enc
    end

    def html_escape(str)
      str.to_s
        .gsub('&', '&amp;')
        .gsub('"', '&quot;')
        .gsub("'", '&#39;')
        .gsub('<', '&lt;')
        .gsub('>', '&gt;')
    end
  end
end
