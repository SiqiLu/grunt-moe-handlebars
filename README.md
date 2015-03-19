# grunt-moe-handlebars

> Generate static html file using handlebars for moe team.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-moe-handlebars --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-moe-handlebars');
```

## The "mhandlebars" task

### Overview
In your project's Gruntfile, add a section named `mhandlebars` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  mhandlebars: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

####partialsDir
Type: String

Default: ```test/partials```

This option accepts a directory, which will be processed. 

####compilerOptions
Type: Object

Default: ```{}```

This option allows you to specify a hash of options which will be passed directly to the Handlebars compiler.

Supports a variety of options that alter how the template executes

* `data`: Set to false to disable @data tracking.
* `compat`: Set to true to enable recursive field lookup.
* `knownHelpers`: Hash containing list of helpers that are known to exist (truthy) at template execution time. Passing this allows the compiler to optimize a number of cases. Builtin helpers are automatically included in this list and may be omitted by setting that value to false.
* `knownHelpersOnly`: Set to true to allow further optimzations based on the known helpers list.
* `trackIds`: Set to true to include the id names used to resolve parameters for helpers.
* `noEscape`: Set to true to not HTML escape any content.
* `strict`: Run in strict mode. In this mode, templates will throw rather than silently ignore missing fields. This has the side effect of disabling inverse operatins such as {{^foo}}{{/foo}} unless fields are explicitly included in the source object.
* `assumeObjects`: Removes object existence checks when traversing paths. This is a subset of strict mode that generates optimized templates when the data inputs are known to be safe.


### Usage Examples

```js
mhandlebars: {
      options: {
        partialsDir: 'test/partials/',
        compilerOptions: {
			knownHelpers: {
		      "my-helper": true,
		      "another-helper": true
		    },
		    knownHelpersOnly: true
		}
      }
    }
```
