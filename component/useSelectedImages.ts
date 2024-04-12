import { useState } from 'react'
import { Asset } from 'react-native-images-picker'

export const useSelectedImages = () => {
    const [selectedImages, setSelectedImages] = useState<Array<Asset>>([])

    const onSelect = (image: Asset) => {
        setSelectedImages(prevState => {
            const isAlreadySelected = prevState.some(selectedImage => selectedImage.path === image.path)

            if (isAlreadySelected) {
                return prevState.filter(selectedImage => selectedImage.path !== image.path)
            }

            return [...prevState, image]
        })
    }

    return {
        onSelect,
        selectedImages
    }
}
