const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync').create();
const del = require('del');

// Пути к файлам
const paths = {
  html: { src: 'src/*.html', dest: 'dist/' },
  styles: { src: 'src/scss/**/*.scss', dest: 'dist/css/' },
  scripts: { src: 'src/js/**/*.js', dest: 'dist/js/' },
  images: { src: 'src/images/**/*', dest: 'dist/images/' },
  fonts: { src: 'src/fonts/**/*', dest: 'dist/fonts/' },
  admin: { src: 'src/admin/**/*', dest: 'dist/admin/' },
  content: { src: 'content/**/*', dest: 'dist/content/' },
  seo: { src: 'src/*.txt', dest: 'dist/' },
  sitemap: { src: 'src/*.xml', dest: 'dist/' },
};

// Удаление папки dist
function clean() {
  return del(['dist']);
}

// HTML → минификация и перенос
function html() {
  return src(paths.html.src)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(paths.html.dest));
}

// SCSS → CSS + минификация
function styles() {
  return src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

// JS → минификация
function scripts() {
  return src(paths.scripts.src)
    .pipe(uglify())
    .pipe(dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

// Картинки → сжатие
function images() {
  return src(paths.images.src)
    .pipe(imagemin())
    .pipe(dest(paths.images.dest));
}

// Шрифты → просто копирование
function fonts() {
  return src(paths.fonts.src)
    .pipe(dest(paths.fonts.dest));
}

// Копируем админку
function admin() {
  return src(paths.admin.src)
    .pipe(dest(paths.admin.dest));
}

// Копируем данные CMS
function content() {
  return src(paths.content.src)
    .pipe(dest(paths.content.dest));
}

// Копируем robots.txt
function seo() {
  return src(paths.seo.src)
    .pipe(dest(paths.seo.dest));
}

// Копируем sitemap.xml
function sitemap() {
  return src(paths.sitemap.src)
    .pipe(dest(paths.sitemap.dest));
}

// Сервер + слежка за файлами
function serve() {
  browserSync.init({
    server: { baseDir: 'dist' },
    notify: false,
    open: false,
  });

  watch(paths.html.src, html).on('change', browserSync.reload);
  watch(paths.styles.src, styles);
  watch(paths.scripts.src, scripts);
  watch(paths.images.src, images).on('change', browserSync.reload);
  watch(paths.admin.src, admin).on('change', browserSync.reload);
  watch(paths.content.src, content).on('change', browserSync.reload);
  watch(paths.seo.src, seo).on('change', browserSync.reload);
  watch(paths.sitemap.src, sitemap).on('change', browserSync.reload);
}

// Сборка проекта
const build = series(
  clean,
  parallel(html, styles, scripts, images, fonts, admin, content, seo, sitemap)
);

// Экспорт задач
exports.default = series(build, serve);
exports.build = build;
