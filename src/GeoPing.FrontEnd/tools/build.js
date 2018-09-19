var webpack = require('webpack');
var webpackConfig = require('../webpack.prod');
var colors = require('colors');
var fs = require('fs');
process.env.NODE_ENV = 'production';
console.log('Generating minified bundle for production via Webpack. This will take a moment...'.blue);
webpack(webpackConfig).run(function (err, stats) {
  colors.yellow;
  if (err) {
    console.log(err.bold.red);
    return 1;
  }
  var jsonStats = stats.toJson();
  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(function (error) { return console.log(error.red); });
  }
  if (jsonStats.hasWarnings) {
    var str = 'Webpack generated the following warnings: '.bold;
    console.log(str.yellow);
    jsonStats.warnings.map(function (warning) { return console.log(warning.yellow); });
  }
  console.log("Webpack stats: " + stats);
  var dir = './dist/assets/';
  var subdirs = ['', 'styles/', 'images/'];
  subdirs.forEach(function (sdir) {
    if (!fs.existsSync(dir + sdir)) {
      fs.mkdirSync(dir + sdir);
    }
  });
  //fs.createReadStream('src/index.html').pipe(fs.createWriteStream('dist/index.html'));
  fs.createReadStream('src/assets/styles/style.css').pipe(fs.createWriteStream('dist/assets/styles/style.css'));
  fs.createReadStream('src/assets/images/avatar.png').pipe(fs.createWriteStream('dist/assets/images/avatar.png'));
  console.log('index.html and asssets written to /dist'.blue);
  console.log('Your app has been compiled in production mode and written to /dist. It\'s ready to roll!'.blue);
  return 0;
});
