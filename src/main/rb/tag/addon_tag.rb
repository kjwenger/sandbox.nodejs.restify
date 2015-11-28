# https://github.com/senchalabs/jsduck/wiki/Single-line-tags

require "jsduck/tag/tag"

class AddonTag < JsDuck::Tag::Tag
  def initialize
    @tagname = :addon
    @pattern = "addon"
    @html_position = POS_DOC + 0.1
    @repeatable = true
  end

  def parse_doc(scanner, position)
    text = scanner.match(/.*$/)
    return { :tagname => :addon, :text => text }
  end

  def process_doc(context, addon_tags, position)
    context[:addon] = addon_tags.map {|tag| tag[:text] }
  end

  def to_html(context)
    addons = context[:addon].map {|addon| "<b>#{addon}</b>" }.join(" and ")
    <<-EOHTML
      <p>Requires Node.JS v8 addon modules: #{addons}</p>
    EOHTML
  end
end