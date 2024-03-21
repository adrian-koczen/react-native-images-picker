const { withInfoPlist } = require('expo/config-plugins')

module.exports = function withPermissions(config) {
    return withInfoPlist(config, config => {
        config.modResults.NSPhotoLibraryUsageDescription = 'We need access to your photo library'

        return config
    })
}
