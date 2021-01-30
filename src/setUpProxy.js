const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(
        proxy("/product", {
            target: "https://oshop-7cf49.firebaseio.com",
            secure: false,
            changeOrigin: true
        })
    );
};