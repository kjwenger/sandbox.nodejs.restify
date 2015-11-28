#https://github.com/senchalabs/jsduck/wiki/Overriding-built-in-tags

require "jsduck/tag/author"

class JsDuck::Tag::Author
  def to_html(context)
    "<p class='author-highlight'>It's a author!</p>"
  end
end