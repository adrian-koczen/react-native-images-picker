const { withAndroidManifest } = require('expo/config-plugins')

module.exports = function withPermissions(config) {
    return withAndroidManifest(config, config => {
        config.modResults.manifest['uses-permission'].push({
            $: {
                'android:name': 'android.permission.READ_MEDIA_IMAGES'
            }
        })

        return config
    })
}
