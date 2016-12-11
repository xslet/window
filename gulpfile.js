const gulp = require('gulp')
const fun = require('gulp-fun-style')
const del = require('del')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const replace = require('gulp-replace')
const sourcemaps = require('gulp-sourcemaps')
const jsdoc = require('gulp-jsdoc3')
const eslint = require('gulp-eslint')
const plumber = require('gulp-plumber')
const mocha = require('gulp-spawn-mocha')

const path = require('path')
const EOL = '\n';

var filesForWeb = [
  'res/header.forweb',
  'src/lib/defineUnitOfSize.js',
  'src/lib/defineRootFontSize.js',
  'src/lib/defineConvertUnit.js',
  'src/lib/calcScrollbarWidth.js',
  'src/lib/defineRelayout.js',
  'src/defineWindow.js',
  'res/footer.forweb',
]

var testToolsForWeb = [
  'node_modules/mocha/mocha.css',
  'node_modules/mocha/mocha.js',
  'node_modules/chai/chai.js',
  'node_modules/@xslet/platform/dist/xslet.platform.min.js',
]

var srcfiles = filesForWeb.filter(file => path.extname(file) === '.js')
var testfiles = ['test/node/**/*.test.js']

var destfile = 'dist/xslet.window.js'
var minifile = 'dist/xslet.window.min.js'

fun.build = [['clean', [['webify', 'lint', 'minify', 'makedoc']] ]]
fun.build.description = 'Makes product js files and document files.'

fun.clean = ['cleanDest', 'cleanTest', 'cleanDocs']
fun.clean.description = 'Cleans all product files.'

fun.cleanDest = done => del(['dist/**'], done)
fun.cleanTest = done =>
  del(['test/web/**/*.js', 'test/web/tools', 'coverage/**'], done)
fun.cleanDocs = done => del(['docs/**'], done)

fun.webify = ['webifyDest', 'webifyTest', 'copyTestTools']

fun.webifyDest = () =>
  gulp.src(filesForWeb)
      .pipe(replace(/(^|[\r\n]+)(module\.exports *=.*[\r\n]+)+/g, EOL))
      .pipe(replace(/(^|[\r\n]+)((|.*[; =]+)require *\(.*[\r\n]+)+/g, EOL))
      .pipe(replace(/(^|[\r\n]+)(["']use strict["'];.*[\r\n]+)+/g, EOL))
      .pipe(replace(/(^|[\r\n]+)\/\* *[\r\n]+ \* *Copyright.*[\r\n]+.*[\r\n]+ *\*\/ *[\r\n]+/, EOL))
      .pipe(concat(path.basename(destfile)))
      .pipe(gulp.dest(path.dirname(destfile)))

fun.webifyTest = () =>
  gulp.src(['src/**/*.js', 'test/node/**/*.js', '!test/node/helper/**'])
      .pipe(replace(/(^|[\r\n]+)(module\.exports *=.*[\r\n]+)+/g, EOL))
      .pipe(replace(/(^|[\r\n]+)((|.*[; =]+)require *\(.*[\r\n]+)+/g, EOL))
      .pipe(replace(/(^|[\r\n]+)(["']use strict["'];.*[\r\n]+)+/g, EOL))
      .pipe(gulp.dest('./test/web'))

fun.copyTestTools = () =>
  gulp.src(testToolsForWeb)
      .pipe(gulp.dest('test/web/tools'))

fun.minify = () =>
  gulp.src(destfile)
      .pipe(sourcemaps.init())
      .pipe(concat(path.basename(minifile)))
      .pipe(uglify({ preserveComments: 'some' }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(path.dirname(minifile)))

fun.lint = () =>
  gulp.src(srcfiles)
      .pipe(plumber())
      .pipe(eslint())
      .pipe(eslint.format())
fun.lint.description = 'Lint js source files.'

fun.makedoc = ['jsdoc', 'copyDistToDocs', 'copyTestToDocs']

fun.jsdoc = done =>
  gulp.src([destfile, 'README.md'])
      .pipe(plumber())
      .pipe(jsdoc(require('./.jsdoc.json'), done))

fun.copyDistToDocs = () =>
  gulp.src('dist/**')
      .pipe(gulp.dest('docs/dist'))

fun.copyTestToDocs = () =>
  gulp.src('test/web/**')
      .pipe(gulp.dest('docs/test/web'))

fun.test = () =>
  gulp.src(testfiles)
      .pipe(plumber())
      .pipe(mocha())
fun.test.description = 'Runs the unit tests.'

fun.coverage = () =>
  gulp.src(testfiles)
      .pipe(plumber())
      .pipe(mocha({ istanbul: true }))
fun.coverage.description = 'Measures the coverage of the unit tests.'

fun.watch = {
  watch: [].concat(srcfiles, testfiles),
  call: [['build', 'test']],
}
fun.watch.description = 'Watches file changes, then builds and tests.'

fun.default = fun.watch
