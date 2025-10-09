module Jekyll
  # Converts Obsidian-style audio embeds to HTML5 <audio> at build time.
  # Examples:
  #   ![[song.mp3]]
  #   ![[assets/audio/clip.m4a|title=Interview|preload=metadata]]
  #   ![[recording.ogg|autoplay|loop]]
  # Behavior:
  #   - If no folder is provided, assumes audio files live under /assets/
  #   - Adds controls and preload="metadata" by default
  #   - Supports optional modifiers after the first pipe (|):
  #       • title=My Title
  #       • preload=auto|metadata|none
  #       • autoplay | loop | muted | controls
  #       • class=foo bar
  class ObsidianAudioEmbeds < Generator
    safe true
    priority :high

    def generate(site)
      docs = (site.collections.values.flat_map(&:docs) + site.pages).compact
      docs.each { |d| d.content = transform(d.content, site) }
    end

    private

    def transform(text, site)
      baseurl = site.baseurl.to_s.sub(%r{/*$}, '')

      # Shield fenced code blocks
      shields = []
      shielded = text.gsub(/```[\t ]*([a-zA-Z0-9_-]+)?\n([\s\S]*?)\n```/) do |m|
        token = "__OBSIDIAN_AUDIO_EMBED_SHIELD_#{shields.length}__"
        shields << m
        token
      end

      processed = shielded.gsub(/!\[\[(.+?)(?:\|([^\]]+))?\]\]/) do
        raw = Regexp.last_match(1).strip
        mod = (Regexp.last_match(2) || '').strip

        next Regexp.last_match(0) unless audio_path?(raw)

        # Normalize any path that contains an assets/ segment to start at assets/
        normalized = raw.dup
        if (m = normalized.match(/assets\//i))
          normalized = normalized[m.begin(0)..-1]
          normalized.sub!(/\Aassets\//i, 'assets/')
        end

        # Default to /assets when no folder is provided
        path = normalized.include?('/') ? normalized : "assets/#{normalized}"
        src  = "#{baseurl}/#{encode_url(path)}"

        opts = parse_modifiers(mod)
        mime = mime_type_for(src)

        attrs = []
        attrs << %(controls) if opts[:controls] != false
        preload = %w[auto metadata none].include?(opts[:preload]) ? opts[:preload] : 'metadata'
        attrs << %(preload="#{preload}")
        attrs << %(autoplay) if opts[:autoplay]
        attrs << %(loop) if opts[:loop]
        attrs << %(muted) if opts[:muted]
        attrs << %(title="#{html_escape(opts[:title])}") if opts[:title]
        attrs << %(class="#{html_escape(opts[:classes].join(' '))}") if opts[:classes]&.any?

        # Build audio element with primary source
        audio = []
        audio << %(<audio #{attrs.join(' ')}>)
        audio << %(<source src="#{html_escape(src)}" type="#{mime}">)
        # graceful fallback link
        audio << %(Your browser does not support the audio element. )
        audio << %(<a href="#{html_escape(src)}">Download audio</a>)
        audio << %(</audio>)
        audio.join
      end

      # Restore fenced code blocks
      processed.gsub(/__OBSIDIAN_AUDIO_EMBED_SHIELD_(\d+)__/) do
        idx = Regexp.last_match(1).to_i
        shields[idx]
      end
    end

    def audio_path?(raw)
      raw =~ /\.(mp3|m4a|aac|flac|ogg|oga|wav)(?:\?|#|$)/i
    end

    def parse_modifiers(mod)
      result = { title: nil, preload: nil, autoplay: false, loop: false, muted: false, controls: true, classes: [] }
      return result if mod.nil? || mod.empty?

      tokens = mod.split('|').map { |t| t.strip }.reject(&:empty?)
      tokens.each do |t|
        case t
        when /^title=(.+)$/i
          result[:title] = $1.strip
        when /^preload=(auto|metadata|none)$/i
          result[:preload] = $1.downcase
        when /^class=(.+)$/i
          result[:classes].concat($1.strip.split(/\s+/))
        when /^autoplay$/i
          result[:autoplay] = true
        when /^loop$/i
          result[:loop] = true
        when /^muted$/i
          result[:muted] = true
        when /^controls$/i
          result[:controls] = true
        when /^no-controls$/i
          result[:controls] = false
        end
      end
      result
    end

    def encode_url(path)
      enc = path.dup
      enc.gsub!(' ', '%20')
      enc.gsub!('#', '%23')
      enc.gsub!('(', '%28')
      enc.gsub!(')', '%29')
      enc.gsub!('[', '%5B')
      enc.gsub!(']', '%5D')
      enc
    end

    def mime_type_for(url)
      if url =~ /\.(mp3)(?:\?|#|$)/i
        'audio/mpeg'
      elsif url =~ /\.(m4a|aac)(?:\?|#|$)/i
        'audio/mp4'
      elsif url =~ /\.(ogg|oga)(?:\?|#|$)/i
        'audio/ogg'
      elsif url =~ /\.(wav)(?:\?|#|$)/i
        'audio/wav'
      elsif url =~ /\.(flac)(?:\?|#|$)/i
        'audio/flac'
      else
        'audio/mpeg'
      end
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

