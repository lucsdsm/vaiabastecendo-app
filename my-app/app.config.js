import 'dotenv/config';

export default {
  "expo": {
    "name": "Vai Abastecendo",
    "slug": "vaiabastecendo",
    "scheme": "com.lucsdsm.vaiabastecendo",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/splash-icon.png",
      "backgroundColor": "#ffffff",
      "resizeMode": "contain"
    },
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "edgeToEdgeEnabled": true,
      "predictiveBackGestureEnabled": false,
      "package": "com.lucsdsm.vaiabastecendo",
      "config": {
        "googleMaps": {
          "apiKey": "AIzaSyDvt2-inWK2ShtBWL2iK-7roPHVzL5psLw"
        }
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-font",
      "expo-secure-store",
      "expo-web-browser",
      [
        "@rnmapbox/maps",
        {
          "RNMapboxMapsImpl": "mapbox",
        }
      ],
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Permita que o Vai Abastecendo use sua localização para encontrar os postos de combustível mais próximos de você."
        }
      ]
    ],
    "extra": {
      "eas": {
        "projectId": "8219b825-e7e8-4846-ae6c-7b8c601d02fb"
      }
    }
  }
}
