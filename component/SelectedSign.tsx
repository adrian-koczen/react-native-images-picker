import { useEffect } from 'react'
import { StyleSheet, Image } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
// @ts-ignore
import check from './check.png'

const SCALE = 1

export const SelectedSign: React.FunctionComponent = () => {
    const scale = useSharedValue(0)
    const insideScale = useSharedValue(0)
    const containerAnimatedStyle = useAnimatedStyle(() => ({
        height: 20,
        width: 20,
        transform: [{ scale: scale.value }]
    }))
    const insideContainerAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: insideScale.value }]
    }))

    useEffect(() => {
        scale.value = withTiming(SCALE, { duration: 50 }, () => {
            insideScale.value = withTiming(SCALE, { duration: 100 })
        })
    }, [])

    return (
        <Animated.View
            style={[
                containerAnimatedStyle,
                styles.container
            ]}
        >
            <Animated.View
                style={[,
                    insideContainerAnimatedStyle,
                    styles.insideContainer
                ]}
            >
                <Image
                    source={check}
                    style={styles.checkIcon}
                />
            </Animated.View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: '#FFFFFF',
        borderRadius: 50,
        zIndex: 999,
        padding: 1
    },
    insideContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        backgroundColor: '#239fd0'
    },
    checkIcon: {
        transform: [{ scale: 0.35 }],
        position: 'absolute',
        top: -4,
        left: -6
    }
})
