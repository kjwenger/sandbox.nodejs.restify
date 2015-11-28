# https://github.com/senchalabs/jsduck/wiki/Single-line-tags

require "jsduck/tag/tag"

class SeeTag < JsDuck::Tag::Tag
  def initialize
    @tagname = :see
    @pattern = "see"
    @html_position = POS_DOC + 0.1
    @repeatable = true
  end

  def parse_doc(scanner, position)
    text = scanner.match(/.*$/)
    return { :tagname => :see, :text => text }
  end

  def process_doc(context, see_tags, position)
    context[:see] = see_tags.map {|tag| tag[:text] }
  end

  def to_html(context)
    sees = context[:see].map {|see| "<b>#{see}</b>" }.join(" and ")
    <<-EOHTML
      <p>#{sees}</p>
    EOHTML
  end
end