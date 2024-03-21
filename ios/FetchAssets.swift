import Photos

open class ExtendedOptions: PHFetchOptions {
    var page: Int = 0
    var offset: Int = 0
}

class FetchAssetsOptions {
    let options = ExtendedOptions()
    var skip: Int {
        return options.page * options.offset
    }
    
    init(
        page: Int?,
        offset: Int?
    ) {
        self.options.page = page ?? 0
        self.options.offset = offset ?? 0
    }
}

class FetchAssetResult {
    var width: Int
    var height: Int
    var creationDate: Date?
    var path: String
    
    init(width: Int, height: Int, creationDate: Date?, path: String) {
        self.width = width
        self.height = height
        self.creationDate = creationDate
        self.path = path
    }
    
    func getResult () -> Dictionary<String, Any> {
        let dict = [
            "width": width,
            "height": height,
            "creationDate": creationDate ?? "",
            "path": path
        ] as [String : Any]
        
        return dict
    }
}

