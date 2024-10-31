// webpack.config.js
module.exports = {
  // your existing configuration
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {
      // custom middleware code if needed
      return middlewares;
    },
  },
};
