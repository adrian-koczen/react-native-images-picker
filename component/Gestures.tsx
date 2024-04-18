import React, { Fragment, useEffect, useState } from "react"
import { Dimensions, Pressable, StyleSheet, View } from "react-native"
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { PickerProps } from './types'
import { Images } from './Images'
import { Actions } from "./Actions"
import { useSelectedImages } from "./useSelectedImages"

export const Gestures: React.FunctionComponent<PickerProps> = ({
    onClose,
    onSubmit,
    height
}) => {
    const [shouldHideActions, setShouldHideActions] = useState(false)
    const [shouldClose, setShouldClose] = useState(false)
    const dimensions = Dimensions.get('window')
    const initialHeight = height
        ? dimensions.height * height
        : dimensions.height * 0.5
    const beginValue = useSharedValue(0)
    const pickerSavedHeight = useSharedValue(initialHeight)
    const pickerHeight = useSharedValue(initialHeight)
    const translateY = useSharedValue(pickerHeight.value)
    const pickerStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
        height: pickerHeight.value
    }))
    const pan = Gesture.Pan()
    const { onSelect, selectedImages } = useSelectedImages()

    useEffect(() => {
        translateY.value = withTiming(0, { duration: 300, easing: Easing.bezier(0.25, 0.1, 0.25, 1) })
    }, [])

    const handleClose = () => {
        translateY.value = withTiming(pickerHeight.value, { duration: 200 }, () => {
            runOnJS(onClose)(false)
        })
    }

    const onEnd = () => {
        const shouldCollapseHeight = dimensions.height * 0.5
        const shouldExpandHeight = dimensions.height * 0.5

        if (shouldClose || pickerHeight.value < shouldCollapseHeight) {
            pickerHeight.value = withTiming(0, { duration: 200 }, () => {
                runOnJS(onClose)(false)
                pickerSavedHeight.value = pickerHeight.value
            })

            return
        }

        if (pickerHeight.value > shouldExpandHeight) {
            pickerHeight.value = withTiming(dimensions.height * 0.9, { duration: 200 }, () => {
                pickerSavedHeight.value = pickerHeight.value
            })

            setShouldClose(true)
        }
    }

    pan
        .onBegin(event => {
            beginValue.value = event.y
        })
        .onUpdate(event => {
            if (event.translationY > 0) {
                setShouldHideActions(true)
            }

            pickerHeight.value = Math.min(pickerSavedHeight.value - event.translationY, dimensions.height * 0.9)
        })
        .onEnd(() => {
            pickerSavedHeight.value = pickerHeight.value
            onEnd()
        })

    return (
        <Fragment>
            <Pressable
                onPress={handleClose}
                style={styles.close}
            />
                <Animated.View
                    style={[
                        pickerStyle,
                        styles.picker
                    ]}
                >
                    <GestureDetector gesture={pan}>
                        <View style={styles.header}>
                            <View style={styles.line} />
                        </View>
                    </GestureDetector>
                    <Images
                        onSelect={onSelect}
                        selectedImages={selectedImages}
                    />
                    {(selectedImages.length > 0 && !shouldHideActions) && (
                        <Actions
                            onSubmit={value => {
                                onSubmit(value)
                                handleClose()
                            }}
                            selectedImages={selectedImages}
                        />
                    )}
                </Animated.View>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    close: {
        height: '100%',
        width: '100%'
    },
    picker: {
        position: 'absolute',
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        zIndex: 999,
        bottom: 0
    },
    header: {
        backgroundColor: '#000000',
        height: 32,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    line: {
        width: 60,
        height: 6,
        backgroundColor: '#FFFFFF',
        borderRadius: 50
    }
})
