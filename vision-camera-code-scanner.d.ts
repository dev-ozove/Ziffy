declare module 'vision-camera-code-scanner' {
  import type {WorkletFunction} from 'react-native-reanimated';
  import type {Frame} from 'react-native-vision-camera';

  export type BarcodeValue = {
    value: string;
    // ... other barcode properties
  };

  export function useScanBarcodes(
    types: number[],
    options?: {checkInverted?: boolean},
  ): [WorkletFunction<[frame: Frame], BarcodeValue[]>, BarcodeValue[]];
}
