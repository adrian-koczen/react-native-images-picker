import { Fragment, useEffect, useState } from 'react'
import { StyleSheet, Dimensions, Image, View, Text } from 'react-native'
import Animated, { FadeOut } from 'react-native-reanimated'
import { FlashList } from "@shopify/flash-list"
import { fetchAssets, Asset } from '../js'

const INITIAL_OFFSET = 40
const ITEMS_PER_ROW = 3

const InitialLoader: React.FunctionComponent = () => (
    <Animated.View
        exiting={FadeOut}
        style={styles.loading}
    />
)

export const Images: React.FunctionComponent = () => {
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(0)
    const [images, setImages] = useState<Array<Asset>>([])
    const screenWidth = Dimensions.get('window').width
    const imageWidth = screenWidth / ITEMS_PER_ROW

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
            <FlashList
                numColumns={3}
                data={images}
                onEndReachedThreshold={1}
                estimatedItemSize={imageWidth || 100}
                contentContainerStyle={styles.flashList}
                renderItem={(item) => (
                    <View style={styles.imageWrapper}>
                        <Image
                            key={item.item.path}
                            source={{ uri: `file://${item.item.path}` }}
                            style={styles.image}
                        />
                    </View>
                )}
                onEndReached={() => setPage(page + 1)}
            />
        </Fragment>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        aspectRatio: 1
    },
    imageWrapper: {
        padding: 1
    },
    flashList: {
        backgroundColor: '#000000'
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
