const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
	  rules: [
	    {
	    	test: /\.js$/,
	    	exclude: /node_modules/,
	    	loader: "babel-loader",
	    	query: {
          plugins: ['transform-class-properties', "transform-object-rest-spread"]
        }
	    }
	  ]
	}
};