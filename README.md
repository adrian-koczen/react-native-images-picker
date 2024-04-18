## Preview

https://github.com/adrian-koczen/react-native-images-picker/assets/3694808/57cdec03-2cfa-4ff6-bd5a-296cf2df8bf8

## Installation
### Expo

Update app.json

```
"plugins": ["react-native-images-picker/plugin"]
```
### Bare react native

Update AndroidManifest.xml
```
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES"/>
```
Update InfoPlist
```
NSPhotoLibraryUsageDescription: 'Access required ...'
```

## Component

```javascript
import { useState } from "react"
import { Pressable, View, Text } from 'react-native'
import { ImagesPicker } from 'react-native-images-picker/component'

const App = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <View style={{ flex: 1 }}>
            <Pressable onPress={() => setIsOpen(true)}>
                <Text>
                    Open Images Picker
                </Text>
            </Pressable>
            <ImagesPicker
                isOpen={isOpen}
                onClose={setIsOpen}
            />
        </View>
    )
}
```

## Functions

### Request permissions

```javascript
import { requestPermissions } from 'react-native-images-picker'

const requestPermissionsFunction = async () => {
    await requestPermissions()
}
```

### Fetch assets with pagination

```javascript
import { fetchAssets, Asset } from 'react-native-images-picker'

const App = () => {
    const [assets, setAssets] = useState<Array<Asset>>([])

    const fetchImages = async (page: number, offset: number) => {
        const fetchedAssets = await fetchAssets({
            offset,
            page
        })

        setAssets(prevValue => [...prevValue, ...fetchedAssets])
    }

    ...
}

```

## Asset

| Key | Type     | Value                |
| :-------- | :------- | :------------------------- |
| `path` | `string` | image path on device |
| `height` | `string` | image height |
| `width` | `string` | image width |
