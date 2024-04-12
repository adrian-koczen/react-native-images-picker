import { Asset } from "react-native-images-picker"

export type ImagesPickerProps = {
    isOpen: boolean,
    height?: number,
    onClose(state: boolean): void,
    onSubmit(images: Array<Asset>): void
}

export type PickerProps = {
    height?: number,
    onClose(state: boolean): void,
    onSubmit(images: Array<Asset>): void
}

export type ImagesProps = {
    onSelect(asset: Asset): void
}
