import Foundation

class ReactNativePickerUtils: NSObject {
    static func error(domain: String, code: Int) -> Error {
        let Error = NSError(domain: domain, code: code)
        
        return Error
    }
}
