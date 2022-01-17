# MTG Card Search

## Setup

Because Webpack5 no longer includes polyfills. 
Go to node_modules/react-scripts/config/webpack.config.js

### const NodePolyfillPlugin = require("node-polyfill-webpack-plugin"); 
### ...
### ...
### module.exports = {
###     return {
###         resolve: {
###             fallback: {
###                 "fs": false,
###                 "tls": false,
###             },
###         }
###     }
###    // Other rules...
###    plugins: [
###        new NodePolyfillPlugin()
###    ]
### }




