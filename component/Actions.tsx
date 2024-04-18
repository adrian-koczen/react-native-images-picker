import { useEffect } from 'react'
import { View, StyleSheet, Text, Pressable, Dimensions } from 'react-native'
import { Asset } from "react-native-images-picker"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

type ActionsProps = {
    selectedImages: Array<Asset>,
    onSubmit(images: Array<Asset>): void
}

export const Actions: React.FunctionComponent<ActionsProps> = ({
    selectedImages,
    onSubmit
}) => {
    const dimensions = Dimensions.get('window')
    const width = useSharedValue(0)
    const textOpacity = useSharedValue(0)
    const submitOpacity = useSharedValue(0)
    const animatedSelectedImagesStyle = useAnimatedStyle(() => ({
        width: width.value
    }))
    const animatedTextOpacityStyle = useAnimatedStyle(() => ({
        opacity: textOpacity.value
    }))
    const animatedSubmitOpacityStyle = useAnimatedStyle(() => ({
        opacity: submitOpacity.value
    }))

    useEffect(() => {
        width.value = withTiming(dimensions.width * 0.8, { duration: 300 }, () => {
            textOpacity.value = withTiming(1, { duration: 250 })
            submitOpacity.value = withTiming(1, { duration: 250 })
        })
    }, [])

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.selectedImages,
                    animatedSelectedImagesStyle
                ]}
            >
                <Animated.Text
                    style={[
                        styles.selectedImagesText,
                        animatedTextOpacityStyle
                    ]}
                >
                    Selected images: {selectedImages.length}
                </Animated.Text>
                <Animated.View style={[animatedSubmitOpacityStyle]}>
                    <Pressable
                        onPress={() => onSubmit(selectedImages)}
                        style={styles.submit}
                    >
                        <Animated.Text style={styles.submitText}>
                            Done
                        </Animated.Text>
                    </Pressable>
                </Animated.View>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 16,
        width: '100%',
        height: 42,
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
    },
    selectedImages: {
        width: '80%',
        height: '100%',
        borderRadius: 50,
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 8,
        shadowColor: '#000000'
    },
    submit: {
        borderRadius: 50,
        backgroundColor: '#239fd0',
        height: '100%',
        width: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    submitText: {
        color: '#FFFFFF',
        fontWeight: '500'
    },
    selectedImagesText: {
        fontWeight: '500'
    }
})
