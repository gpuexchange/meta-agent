let mix = require('laravel-mix');

mix.sass('src/frontend/styles/main.sass', 'generated')
    .js('src/frontend/index.js', 'generated/frontend.js')
    .version()
    .setPublicPath('build');