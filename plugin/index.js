const { withPlugins } = require('expo/config-plugins')
const withAndroidManifest = require('./withAndroidManifest')
const withInfoPlist = require('./withInfoPlist')

module.exports = function withChain(config) {
  return withPlugins(config, [
    [withAndroidManifest],
    [withInfoPlist]
  ])
}
