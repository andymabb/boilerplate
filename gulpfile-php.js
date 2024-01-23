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

function nunjucks() {
    return gulp.src('src/pages/**/*.+(html|nunjucks|njk)')
    .pipe(nunjucksRender({
        path: ['src/templates']
      }))
      .pipe(gulp.dest('src'));
}
exports.nunjucks = nunjucks;

// For use with nunjacks
// function html(){
//   return gulp.src('src/pages/**/*.+(html|nunjucks|njk)')
//   .pipe(nunjucksRender({
//       path: ['src/templates']
//     }))
//         .pipe(cachebust({type: 'timestamp'}))
//         .pipe(minifyHTML({collapseWhitespace: true}))
//         .pipe(gulp.dest(paths.html.dest))
// }
// exports.html = html;

//For use without templating / nunjucks

function html(){
    return gulp.src(paths.html.src)
        .pipe(cachebust({type: 'timestamp'}))
        .pipe(minifyHTML({collapseWhitespace: true}))
        .pipe(gulp.dest(paths.html.dest))
}
exports.html = html;

function reload(done) {
  server.reload();
  done();
}

// Proxy - for php files

function serve(done) {
  server.init({
    proxy: "mysites.local/GITHUB-start/dist"
  });
  done();
}

// Static (html) files
//function serve(done) {
//  server.init({
//    server: {
//      baseDir: "./build"
//    }
//  });
//  done();
//}

const watch = () => gulp.watch('src/**/*.*', gulp.series(html, css, js, reload));

//with nunjacks
//const dev = gulp.series(html, css, js, serve, nunjucks, watch);
//exports.default=dev;

//without nunjacks
const dev = gulp.series(html, css, js, serve, watch);
exports.default=dev;
