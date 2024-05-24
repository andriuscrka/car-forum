const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const crypto = require('crypto');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');

function generateNonce() {
  return crypto.randomBytes(16).toString('base64');
}

const nonce = generateNonce();

module.exports = (envVars) => {
  const { env } = envVars;

  const cspConfig = {
    'object-src': '\'none\'',
    'base-uri': '\'self\'',
    'default-src': '\'self\' \'unsafe-inline\'',
    'script-src': `'self' 'unsafe-inline' 'nonce-${nonce}'`,
    'style-src': '\'self\' \'unsafe-inline\'',
    'img-src': '\'self\'',
    'connect-src': '\'self\' http://localhost:3000',
  };

  commonConfig.plugins.push(
    new CspHtmlWebpackPlugin(cspConfig)
  );

  commonConfig.devServer = {
    ...commonConfig.devServer,
    headers: {
      'Content-Security-Policy': Object.entries(cspConfig)
        .map(([key, value]) => `${key} ${value}`)
        .join('; ')
    }
  };

  const envConfig = require(`./webpack.${env}.js`);
  const config = merge(commonConfig, envConfig);

  return config;
};