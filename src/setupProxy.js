const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/.netlify/functions",
    createProxyMiddleware({
      target: "http://localhost:9000",
      // changeOrigin: true,
      pathRewrite: {
        "^/\\.netlify/functions": "",
      },
    })
  );
};

// "proxy": {
//   "/.netlify/functions": {
//     "target": "http://localhost:9000",
// "pathRewrite": {
//   "^/\\.netlify/functions": ""
// }
//   }
// }
