import { TurboModule, TurboModuleRegistry } from 'react-native'

export type FetchAssetsOptions = {
    page: number,
    offset: number
}

export type Asset = {
    width: number,
    height: number,
    path: string
}

export interface Spec extends TurboModule {
    requiresMainQueueSetup(): boolean,
    requestPermissions(): Promise<boolean>,
    fetchAssets(options: FetchAssetsOptions): Promise<Array<Asset>>
}

export default TurboModuleRegistry.get<Spec>('ReactNativeImagesPicker') as Spec
