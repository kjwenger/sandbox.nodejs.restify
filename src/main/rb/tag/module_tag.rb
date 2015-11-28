# https://github.com/senchalabs/jsduck/wiki/Single-line-tags

require "jsduck/tag/tag"

# Module is a reserved word in ruby: http://bparanj.blogspot.com/2011/07/reserved-words-in-rails.html
class MogulTag < JsDuck::Tag::Tag
  def initialize
    @tagname = :mogul
    @pattern = "module"
    @html_position = POS_DOC + 0.1
    @repeatable = true
  end

  def parse_doc(scanner, position)
    text = scanner.match(/.*$/)
    return { :tagname => :mogul, :text => text }
  end

  def process_doc(context, mogul_tags, position)
    context[:mogul] = mogul_tags.map {|tag| tag[:text] }
  end

  def to_html(context)
    moguls = context[:mogul].map {|mogul| "<b>#{mogul}</b>" }.join(" and ")
    <<-EOHTML
      <p>Requires Node.JS modules: #{moguls}</p>
    EOHTML
  end
end