package com.reactnativeimagespicker;

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class ReactNativeImagesPickerPackage : TurboReactPackage() {
    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? =
        if (name == ReactNativeImagesPickerModule.NAME) {
            ReactNativeImagesPickerModule(reactContext)
        } else {
            null
        }

    override fun getReactModuleInfoProvider() = ReactModuleInfoProvider {
        mapOf(
            ReactNativeImagesPickerModule.NAME to ReactModuleInfo(
            ReactNativeImagesPickerModule.NAME,
            ReactNativeImagesPickerModule.NAME,
            false,
            false,
            true,
            false,
            true
          )
        )
    }
}
