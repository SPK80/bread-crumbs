import {Accelerometer, Magnetometer} from "expo-sensors";
import {Subscription} from "expo-modules-core";

let magSubscription: Subscription | null = null;
let accelSubscription: Subscription | null = null;

export type Vector3D = { x: number, y: number, z: number }
export type SensorListener = (data: Vector3D) => void

export const sensorsApi = {
  subscribe(setMagData: SensorListener, setAccelData: SensorListener) {
    this.unsubscribe();
    magSubscription = Magnetometer.addListener(setMagData);
    accelSubscription = Accelerometer.addListener(setAccelData);
  },
  
  setMeasurementInterval(ms: number) {
    Magnetometer.setUpdateInterval(ms);
    Accelerometer.setUpdateInterval(ms);
  },
  
  unsubscribe() {
    magSubscription && magSubscription.remove();
    magSubscription = null;
    accelSubscription && accelSubscription.remove();
    accelSubscription = null;
  },
}
