var pkg = require('./package.json'),
  gulp = require('gulp'),
  webpack = require('webpack'),
  WebpackDevServer = require('webpack-dev-server'),
  eslint = require('gulp-eslint');

const webpackConfig = require('./webpack.config.js'),
  devConfig = webpackConfig(true),
  prodConfig = webpackConfig(false, { banner: banner() });

function banner() {
  return `/*
  * ${pkg.name} ${pkg.version}
  * ${pkg.homepage}
  *
  * The MIT License (MIT)
  * Copyright (c) 2018 Hyun-Seok.Kim, dragmove@gmail.com
  */
`;
}

// tasks
gulp.task('webpack-dev-server', function () {
  const compiler = webpack(devConfig);

  var server = new WebpackDevServer(compiler, devConfig.devServer);
  server.listen(devConfig.devServer.port, 'localhost', (err) => {
    if (err) console.error('[webpack-dev-server failed to start :', err);
  });
});

gulp.task('build:dev', function (callback) {
  const compiler = webpack(devConfig);

  compiler.run((error, stats) => {
    if (error) throw new Error(error);
    callback();
  });
});

gulp.task('build', function (callback) {
  const compiler = webpack(prodConfig);

  compiler.run((error, stats) => {
    if (error) throw new Error(error);
    callback();
  });
});