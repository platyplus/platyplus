const Handlebars = require('handlebars')
Handlebars.registerHelper('lowercase', function(aString) {
  return aString.toLowerCase()
})

module.exports = {
  inputDir: './src',
  outputDir: './dist',
  prefix: 'huma',
  templates: { css: './css.hbs' }
}
