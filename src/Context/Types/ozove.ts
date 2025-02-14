export interface Booking {
  OrderId?: string;
  Vechicle?: string;
  date?: string;
  time?: string;
  from?: string;
  to?: string;
  price?: number;
  passongers?: number;
  createdAt?: string;
  createdBy?: string;
}
export interface bookingData {
  OrderId: string;
  From: string;
  PickupCoordinates: {
    lat: number;
    long: number;
  };
  DropoffCoordinates: {
    lat: number;
    long: number;
  };
  To: string;
  Date: string;
  Time: string;
  selectedVehicle: number | null;
  selectedAdditonalServices: number | null;
  createdAtDate: string;
  contactDetails:
    | string
    | {
        name: string;
        phoneNumber: string;
      };
  driverNote: string;
  TimeStamp: string;
  Status: string;
  AdditionalServices: any[];
  PassengerCount: any;
  TotalPrice: any;
}

export interface CardDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export interface VehicleData {
  image: string | undefined;
  title: string;
  capacity: number;
  price: number;
  details: {
    Full_name: string;
    per_person_price: number;
    minimum_capacity: number;
    image: string;
  };
}

export interface AdditionalServices {
  id: number;
  title: string;
  subtitle: string;
  toggle: boolean;
  price: number;
}

export interface BookingInputScreenProps {
  selectedVehicle: number | null;
  Vechicle_data: VehicleData[];
  setShowDatePicker: (value: boolean) => void;
  date: Date;
  showDatePicker: boolean;
  setDate: (value: Date) => void;
  selectedTime: string;
  setSelectedTime: (value: string) => void;
  setSelectedVehicle: (value: number | null) => void;
  Additional_services: any[];
  selecetedAdditonalServices: number | null;
  setSelectedAdditonalServices: (value: number | null) => void;
  setShowNextScreen: (value: number) => void;
  showNextScreen: number;
  pickupLocation: string;
  dropoffLocation: string;
  servicesState: any;
  setServicesState: (value: any) => void;
  vehiclePricing: any;
  setVehiclePricing: (value: any) => void;
  distance: any;
  duration: any;
}

export interface ServiceState {
  hours?: number;
  split?: boolean;
  vehicleCount?: number;
}
