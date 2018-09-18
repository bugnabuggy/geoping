import * as express from 'express';
import * as webpack from 'webpack';
import * as path from 'path';
import { yellow } from 'colors';

const config = require ( '../webpack.dev' );
const port = 3000;
const app = express ();
const compiler = webpack ( config );

app.use ( '/assets', express.static ( path.join ( __dirname, '../src/assets/' ) ) );

app.use ( require ( 'webpack-dev-middleware' ) ( compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
} ) );

app.use ( require ( 'webpack-hot-middleware' ) ( compiler ) );
app.get ( '*', function ( req: any, res: any ) {
  // console.log(`${req.url}_f`);
  res.sendFile ( path.join ( __dirname, '../src/index.html' ) );
} );

app.listen ( port, function ( err: any ) {
  if ( err ) {
    console.log ( 'start' );
    console.log ( err );
  } else {
    console.log ( yellow(`http://localhost:${port}`) );
    // open(`http://localhost:${port}`);
  }
} );
