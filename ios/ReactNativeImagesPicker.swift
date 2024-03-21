import Foundation
import PhotosUI

@objc(ReactNativeImagesPicker)
class ReactNativeImagesPicker: NSObject {
    @objc
    @available(iOS 14, *)
    func requestPermissions(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        PHPhotoLibrary.requestAuthorization(for: PHAccessLevel.readWrite) { (status) in
            switch status {
            case .authorized, .limited:
                resolve(true)
            case .denied, .restricted, .notDetermined:
                resolve(false)
            @unknown default:
                resolve(false)
            }
        }
    }
    
    @objc
    @available(iOS 14, *)
    func fetchAssets(
        _ options: Dictionary<String, Int>,
        resolver resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) -> Void {
        let authorizationStatus = PHPhotoLibrary.authorizationStatus(for: PHAccessLevel.readWrite)
        
        if (authorizationStatus != PHAuthorizationStatus.authorized) {
            return
        }
        
        var arrayOfAsset: Array<PHAsset> = []
        let fetchOptions = FetchAssetsOptions(page: options["page"], offset: options["offset"])
        var result: Array<Dictionary<String, Any>?> =  Array(repeating: nil, count: fetchOptions.options.offset)
        let assets = PHAsset.fetchAssets(with: PHAssetMediaType.image, options: fetchOptions.options)
        
        assets.enumerateObjects{ (asset, count, stop) in
            if (arrayOfAsset.count < fetchOptions.options.offset && count >= fetchOptions.skip) {
                arrayOfAsset.append(asset)
            }
        }
        
        let dspatchGroup = DispatchGroup()

        for (index, asset) in arrayOfAsset.enumerated() {
            dspatchGroup.enter()
            
            asset.requestContentEditingInput(with: nil) { (input, info) in
                let path = input?.fullSizeImageURL
                
                if ((path) != nil) {
                    result[index] = FetchAssetResult(width: asset.pixelWidth, height: asset.pixelHeight, creationDate: asset.modificationDate, path: String(describing: path!)).getResult()
                }
                dspatchGroup.leave()
            }
        }
        
        dspatchGroup.notify(queue: .main) {
            let clearResult = result.compactMap { $0 }
            
            resolve(clearResult)
        }
    }

    @objc
    static func requiresMainQueueSetup() -> Bool {
        return false
    }
}
