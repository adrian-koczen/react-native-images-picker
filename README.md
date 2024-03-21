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

    ...
}

```

## Asset

| Key | Type     | Value                |
| :-------- | :------- | :------------------------- |
| `path` | `string` | image path on device |
| `height` | `string` | image height |
| `width` | `string` | image width |
