export type ImagesPickerProps = {
    isOpen: boolean,
    height?: number,
    onClose(state: boolean): void
}

export type PickerProps = {
    height?: number,
    onClose(state: boolean): void
}
