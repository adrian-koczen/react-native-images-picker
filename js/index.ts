import NativeModule from './NativeModule'
import { Asset, FetchAssetsOptions } from './NativeModule'

const requestPermissions = NativeModule.requestPermissions
const fetchAssets = NativeModule.fetchAssets

export {
    requestPermissions,
    fetchAssets,
    Asset,
    FetchAssetsOptions
}
