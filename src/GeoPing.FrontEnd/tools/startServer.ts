import * as express from 'express';
import * as webpack from 'webpack';
import * as path from 'path';
import * as colors from 'colors';

const config = require('../webpack.dev');
const port = 3003;
const app = express();
const compiler = webpack(config);

app.use('/assets',express.static(path.join( __dirname, '../src/assets/')));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));
app.get('*', function (req, res) {
  console.log(`${req.url}_f`);
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, function (err: any) {
  if (err) {
    console.log('start');
    console.log(err);
  } else {
    colors.yellow;
    console.log(`http://localhost:${port}`.yellow);
    //open(`http://localhost:${port}`);
  }
}); 
