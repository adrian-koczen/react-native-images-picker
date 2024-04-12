import React, { useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { requestPermissions } from "react-native-images-picker"
import { Gestures } from './Gestures'
import { ImagesPickerProps } from './types'

export const ImagesPicker: React.FunctionComponent<ImagesPickerProps> = ({
    isOpen,
    height,
    onClose,
    onSubmit
}) => {
    const [hasPermissions, setHasPermissions] = useState(false)

    const checkPermissions = async () => {
        if (isOpen) {
            const hasPermissions = await requestPermissions()

            if (!hasPermissions) {
                return onClose(false)
            }
    
            setHasPermissions(true)
        }
    }

    useEffect(() => {
        checkPermissions()
    }, [isOpen])

    if (isOpen && hasPermissions) {
        return (
            <GestureHandlerRootView style={styles.root}>
                <Gestures
                    height={height}
                    onClose={onClose}
                    onSubmit={onSubmit}
                />
            </GestureHandlerRootView>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    }
})
