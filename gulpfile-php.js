const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require("gulp-postcss");
const cssnano = require('cssnano');
const postcssCustomProperties = require('postcss-custom-properties');
const autoprefixer = require('autoprefixer');
const postcssImport = require("postcss-import");
const cssmin = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const minifyHTML = require("gulp-htmlmin");
const browserSync = require('browser-sync');
const cachebust = require('gulp-cache-bust');
const nunjucksRender = require('gulp-nunjucks-render');

const server = browserSync.create();

const paths = {
  js: {
    src: 'src/js/*.js',
    dest: 'dist/js/'
  },
  css: {
    src: 'src/css/style.css',
    dest: 'dist/css/'
  },

  html: {
    src:  "src/**/*.+(html|htm|php)",
    dest: "dist"
  }
};

function css(){
  var plugins=[
    postcssImport(),
    autoprefixer(),
    cssnano(),
    postcssCustomProperties()
  ]
  return gulp.src(paths.css.src)
    .pipe( sourcemaps.init() )
    .pipe( postcss(plugins) )
    .pipe( sourcemaps.write('.') )
    .pipe( gulp.dest(paths.css.dest) )
}
exports.css = css;


function js() {
  return gulp.src(paths.js.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest(paths.js.dest));
}
exports.js = js;

function reload(done) {
  server.reload();
  done();
}

// Proxy - for php files

function serve(done) {
  server.init({
    proxy: "mysites.local/jo-new/dist"
  });
  done();
}

const watch = () => gulp.watch('src/**/*.*', gulp.series(html, css, js, reload));

const dev = gulp.series(html, css, js, serve, watch);
exports.default=dev;
