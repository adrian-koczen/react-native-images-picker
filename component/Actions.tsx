import { View, StyleSheet, Text, Pressable } from 'react-native'
import { Asset } from "react-native-images-picker"

type ActionsProps = {
    selectedImages: Array<Asset>,
    onSubmit(images: Array<Asset>): void
}

export const Actions: React.FunctionComponent<ActionsProps> = ({
    selectedImages,
    onSubmit
}) => {
    if (selectedImages.length > 0) {
        return (
            <View style={styles.container}>
                <Pressable
                    onPress={() => onSubmit(selectedImages)}
                    style={styles.selectedImages}
                >
                    <Text>
                        Selected images: {selectedImages.length}
                    </Text>
                </Pressable>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 16,
        width: '100%',
        height: 32,
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
        justifyContent: 'center',
        alignItems: 'center'
    }
})
