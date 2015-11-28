# https://github.com/senchalabs/jsduck/wiki/Single-line-tags

require "jsduck/tag/tag"

class DateTag < JsDuck::Tag::Tag
  def initialize
    @tagname = :date
    @pattern = "date"
    @html_position = POS_DOC + 0.1
    @repeatable = true
  end

  def parse_doc(scanner, position)
    text = scanner.match(/.*$/)
    return { :tagname => :date, :text => text }
  end

  def process_doc(context, date_tags, position)
    context[:date] = date_tags.map {|tag| tag[:text] }
  end

  def to_html(context)
    dates = context[:date].map {|date| "<b>#{date}</b>" }.join(" and ")
    <<-EOHTML
      <p>#{dates}</p>
    EOHTML
  end
end