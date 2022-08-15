// If this file ("./src/setupProxy.js") exists, 
// then the dev server of the React app will load this as a middleware of an express server automatically.

const { createProxyMiddleware } = require('http-proxy-middleware');
const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:45192';

// 👇 Set URL paths of server-side Web API endpoints as an array. 
//    The dev server of the React app will pass through requests from browsers to the ASP.NET Core server 
//    when the URL path of those requests starts with one of the URL paths in this array.

const context = [
    "/weatherforecast",
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: target,
        secure: false,
        headers: {
            Connection: 'Keep-Alive'
        }
    });

    app.use(appProxy);
};
