# See http://brunch.readthedocs.org/en/latest/config.html for documentation.

exports.config =
  plugins:
    uglify:
      mangle: true
      compress:
        global_defs:
          DEBUG: false

    pleeease:
      optimizers:
        import: true
        mqpacker: true
        minifier: true

  paths:
    public: "../www"

  overrides:
    production:
      optimize: true
      sourceMaps: false
      plugins:
        autoReload:
          enabled: false

  files:
    javascripts:
      joinTo:
        "js/app.js": /^app/
        "js/vendor.js": /^vendor/
      order:
        before: [
          "vendor/js/lodash.compat.js"
          "vendor/js/deferred.js"
          "vendor/js/exo.js"
          "vendor/js/backbone.nativeview.js"
        ]

    stylesheets:
      joinTo:
        # Only compile the application's stylesheet
        # leaving compilation to the import rules
        "css/app.css": /\.sass/

    templates:
      defaultExtension: "jade"
      joinTo: "js/app.js"

  framework: "backbone"
