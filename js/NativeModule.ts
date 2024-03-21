import { TurboModule, TurboModuleRegistry } from 'react-native'

type FetchAssetsOptions = {
    page: number,
    offset: number
}

type FetchAsset = {
    width: number,
    height: number,
    path: string
}

export interface Spec extends TurboModule {
    requiresMainQueueSetup(): boolean,
    requestPermissions(): Promise<boolean>,
    fetchAssets(options: FetchAssetsOptions): Promise<Array<FetchAsset>>
}

export default TurboModuleRegistry.get<Spec>('ReactNativeImagesPicker') as Spec
