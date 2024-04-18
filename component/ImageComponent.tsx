import { Pressable, StyleSheet, Image } from 'react-native'
import { Asset } from 'react-native-images-picker'
import { SelectedSign } from './SelectedSign'

type ImageProps = {
    onSelect(asset: Asset): void,
    asset: Asset,
    isSelected: boolean,
    imageWidth: number
}

export const ImageComponent: React.FunctionComponent<ImageProps> = ({
    onSelect,
    asset,
    isSelected,
    imageWidth
}) => (
    <Pressable
        onPress={() => onSelect(asset)}
        style={styles.container}
    >
        {isSelected && (
            <SelectedSign />
        )}
        <Image
            key={asset.path}
            source={{ uri: `file://${asset.path}` }}
            style={{
                ...styles.image,
                ...{ width: imageWidth }
            }}
        />
    </Pressable>
)

const styles = StyleSheet.create({
    container: {
        padding: 1,
        position: 'relative'
    },
    image: {
        width: '100%',
        aspectRatio: 1
    }
})
