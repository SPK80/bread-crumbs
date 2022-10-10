import * as Location from 'expo-location';

export type CoordsType = {
  lat: number
  long: number
}

export const locationApi = {
  async init() {
    const {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return 'Permission to access location was denied'
  },
  async getCoords() {
    const location = await Location.getCurrentPositionAsync({})
    return {lat: location.coords.latitude, long: location.coords.longitude} as CoordsType
  }
}
