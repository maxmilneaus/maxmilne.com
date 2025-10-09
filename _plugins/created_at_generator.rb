require 'time'

module Jekyll
  class CreatedAtGenerator < Generator
    safe true
    priority :low

    def generate(site)
      # Avoid calling `dig` on Jekyll::Collection (deprecated in Jekyll 4.4).
      # Access the collection, then its docs array explicitly.
      notes = (site.collections['notes']&.docs) || []
      (notes).each do |doc|
        created_time = determine_created_time(doc)
        next unless created_time

        # Expose as convenient fields for Liquid sorting/formatting
        doc.data['created_at'] = created_time
        doc.data['created_at_timestamp'] = created_time.to_i
      end
    end

    private

    # Determine a document's creation time with the following precedence:
    # 1) Front matter: created_at | created | date_created
    # 2) Front matter: date (Jekyll default)
    # 3) Filesystem birth time (if supported), else mtime
    def determine_created_time(doc)
      # 1) Explicit front matter fields
      %w[created_at created date_created].each do |key|
        if (val = doc.data[key])
          t = parse_time(val)
          return t if t
        end
      end

      # 2) Jekyll's date front matter or inferred date
      if (val = doc.data['date'])
        t = parse_time(val)
        return t if t
      end

      # 3) Filesystem times
      path = doc.path
      begin
        return File.birthtime(path)
      rescue StandardError
        # birthtime not supported; fall back to mtime
        begin
          return File.mtime(path)
        rescue StandardError
          return nil
        end
      end
    end

    def parse_time(val)
      return val if val.is_a?(Time)
      return val.to_time if val.respond_to?(:to_time)
      Time.parse(val.to_s)
    rescue StandardError
      nil
    end
  end
end
