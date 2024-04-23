package com.reactnativeimagespicker

import android.Manifest
import android.content.ContentResolver
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.provider.MediaStore
import android.provider.OpenableColumns
import android.util.Log
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.modules.core.PermissionAwareActivity
import com.facebook.react.modules.core.PermissionListener
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.bridge.WritableNativeMap

class MediaPermission(var permission: String, var requestCode: Int)

class ReactNativeImagesPickerModule(reactContext: ReactApplicationContext) : NativeModuleSpec(reactContext) {
  override fun getName() = NAME

  override fun requiresMainQueueSetup(): Boolean {
    return true
  }

  override fun requestPermissions(promise: Promise) {
    val activity = reactApplicationContext.currentActivity as PermissionAwareActivity
    val listener = PermissionListener { _, _, grantResults ->
      val isGranted = grantResults[0] == -0

      if (isGranted) {
        promise.resolve(true)
        return@PermissionListener true
      }

      promise.resolve(false)
      return@PermissionListener false
    }

    if (Build.VERSION.SDK_INT >= 33) {
      val mediaPermission = MediaPermission(Manifest.permission.READ_MEDIA_IMAGES, 101)

      return activity.requestPermissions(arrayOf(mediaPermission.permission), mediaPermission.requestCode, listener)
    }

    val externalStoragePermission = MediaPermission(Manifest.permission.READ_EXTERNAL_STORAGE, 3009)

    activity.requestPermissions(arrayOf(externalStoragePermission.permission), externalStoragePermission.requestCode, listener)
  }

  override fun fetchAssets(options: ReadableMap, promise: Promise) {
    val images = WritableNativeArray()
    val activity = reactApplicationContext.currentActivity
    val projection = arrayOf(
            MediaStore.Images.Media.DATA,
            MediaStore.Images.Media.HEIGHT,
            MediaStore.Images.Media.WIDTH,
            MediaStore.Images.ImageColumns.DATE_ADDED
    )
    val page = options.getInt("page")
    val offset = options.getInt("offset")
    val skip = page * offset
    val sortOrder = "${MediaStore.Images.ImageColumns.DATE_ADDED} DESC"

    val cursor = activity?.contentResolver?.query(
            MediaStore.Images.Media.EXTERNAL_CONTENT_URI,
            projection,
            null,
            null,
            sortOrder
    )

    if (cursor != null) {
      var i = 0

      while (cursor.moveToNext() && i < offset) {
        val index = cursor.position

        if (index >= skip) {
          val data = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Images.ImageColumns.DATA))
          val height = cursor.getInt(cursor.getColumnIndexOrThrow(MediaStore.Images.ImageColumns.HEIGHT))
          val width = cursor.getInt(cursor.getColumnIndexOrThrow(MediaStore.Images.ImageColumns.WIDTH))
          val map = WritableNativeMap()

          map.putString("path", data)
          map.putInt("height", height)
          map.putInt("width", width)
          images.pushMap(map)
          i++
        }
      }
      cursor.close()
    }

    promise.resolve(images)
  }

  companion object {
    const val NAME = "ReactNativeImagesPicker"
  }
}
