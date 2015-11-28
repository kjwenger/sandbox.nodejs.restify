# https://github.com/senchalabs/jsduck/wiki/Single-line-tags

require "jsduck/tag/tag"

class ExampleTag < JsDuck::Tag::Tag
  def initialize
    @tagname = :example
    @pattern = "example"
    @html_position = POS_DOC + 0.1
    @repeatable = true
  end

  def parse_doc(scanner, position)
    text = scanner.match(/.*$/)
    return { :tagname => :example, :text => text }
  end

  def process_doc(context, example_tags, position)
    context[:example] = example_tags.map {|tag| tag[:text] }
  end

  def to_html(context)
    examples = context[:example].map {|example| "<b>#{example}</b>" }.join(" and ")
    <<-EOHTML
      <p>#{examples}</p>
    EOHTML
  end
end