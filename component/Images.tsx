import React from 'react'
import { Fragment, useEffect, useState } from 'react'
import { StyleSheet, Dimensions, FlatList } from 'react-native'
import Animated, { FadeOut } from 'react-native-reanimated'
import { fetchAssets, Asset } from 'react-native-images-picker'
import { ImageComponent } from './ImageComponent'

const INITIAL_OFFSET = 20
const ITEMS_PER_ROW = 3

const InitialLoader: React.FunctionComponent = () => (
    <Animated.View
        exiting={FadeOut}
        style={styles.loading}
    />
)

type ImagesProps = {
    onSelect(asset: Asset): void,
    selectedImages: Array<Asset>
}

const MemoizedImageComponent = React.memo(ImageComponent)

export const Images: React.FunctionComponent<ImagesProps> = ({
    onSelect,
    selectedImages
}) => {
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(0)
    const [images, setImages] = useState<Array<Asset>>([])
    const screenWidth = Dimensions.get('window').width
    const imageWidth = (screenWidth / 3) - 2

    const fetchImages = async () => {
        const images = await fetchAssets({
            offset: INITIAL_OFFSET,
            page
        })

        setImages(prevImages => [...prevImages, ...images])
    }

    useEffect(() => {
        fetchImages()
    }, [page])

    useEffect(() => {
        // TODO: This is temporary hack to show the loader on initial load
        setTimeout(() => {
            setLoading(false)
        }, 250)
    }, [])

    return (
        <Fragment>
            {loading && (
                <InitialLoader />
            )}
            <FlatList
                numColumns={ITEMS_PER_ROW}
                data={images}
                onEndReachedThreshold={1}
                contentContainerStyle={styles.flashList}
                keyExtractor={(item) => item.path}
                removeClippedSubviews={true}
                extraData={selectedImages}
                renderItem={(item) => {
                    const isSelected = selectedImages.some(image => image.path === item.item.path)

                    return (
                        <MemoizedImageComponent
                            isSelected={isSelected}
                            asset={item.item}
                            onSelect={onSelect}
                            imageWidth={imageWidth}
                        />
                    )
                }}
                onEndReached={() => setPage(page + 1)}
            />
        </Fragment>
    )
}

const styles = StyleSheet.create({
    flashList: {
        backgroundColor: '#000000',
        justifyContent: 'space-between'
    },
    loading: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        zIndex: 999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
