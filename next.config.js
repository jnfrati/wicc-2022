/* eslint-disable */
const withSass = require("@zeit/next-sass");
const withLess = require("@zeit/next-less");
const withCSS = require("@zeit/next-css");
const { modifiedVariables } = require("./constants/theme");

const CopyPlugin = require("copy-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";

// fix: prevents error when .less files are required by node
if (typeof require !== "undefined") {
  require.extensions[".less"] = (file) => {};
}

module.exports = withCSS({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  },
  ...withLess(
    withSass({
      lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: modifiedVariables,
      },
      typescript: {
        ignoreBuildErrors: true,
      },
      publicRuntimeConfig: {
        REMARK_HOST: process.env.REMARK_HOST,
        REMARK_SITE_ID: process.env.REMARK_SITE_ID,
        REMARK_LOCALE: process.env.REMARK_LOCALE,
        firebaseConfig: {
          apiKey: process.env.FIREBASE_API_KEY,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          databaseURL: process.env.FIREBASE_DB_URL,
          projectId: process.env.FIREBASE_PROJECT_ID,
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.FIREBASE_APP_ID,
          measurementId: process.env.FIREBASE_MEASSUREMENT_ID,
        },
        SITE_URL: process.env.URL,
      },
      webpack: (config) => {
        // Note: we provide webpack above so you should not `require` it
        // Perform customizations to webpack config
        config.plugins.push(
          new CopyPlugin({
            patterns: [
              {
                from: "node_modules/pdfjs-dist/cmaps/",
                to: "cmaps/",
              },
            ],
          })
        );
        console.log(config.plugins);
        // Important: return the modified config
        return config;
      },
    })
  ),
});
