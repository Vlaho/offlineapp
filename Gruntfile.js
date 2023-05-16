module.exports = function(grunt) {
    grunt.initConfig({
      dir:{
          webapp: 'IconExplorer/src',
          dist: 'dist'
      },

      clean: {
          "preload": ["webapp/Component-preload.js"],
          "openui5": ['webapp/openui5']
      },
      
      "openui5_preload": {
          component: {
              options: {
                  compress: false,
                  resources: {
                      cwd: "webapp",
                      prefix: "sap/ui/demo/iconexplorer",
                      src: [
                          "Component.js",
                          "**/*.js",
                          "**/*.fragment.xml",
                          "**/*.view.xml",
                          "**/*.properties",
                          "manifest.json",
                          "!Component-preload.js",
                          "!test/**",
                          "!openui5/**"
                      ]
                  },
                  dest: "webapp"
              },
              components: "sap/ui/demo/iconexplorer"
          }
      }
  });
  
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-openui5");
  
  grunt.registerTask('build', ['clean', 'openui5_preload']);
  grunt.registerTask('default', ['build']);
};