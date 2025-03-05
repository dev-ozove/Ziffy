import Vech1_large from '../../assets/Vechicles/VITO_large_1.png';
import Vech2_large from '../../assets/Vechicles/VITO_2_large.png';
import Vech3_large from '../../assets/Vechicles/VITO_3_large.png';

export const Additional_services = [
  {
    id: 1, // Must be unique
    title: 'Split Payment',
    subtitle: 'Split among friends',
    price: 0,
    type: 'split',
  },
  {
    id: 2, // Must be unique
    title: 'Hourly Bookings',
    subtitle: 'Minimum 3 Hours',
    price: 60,
    type: 'hourly',
  },
  {
    id: 3, // Must be unique
    title: 'Add More Vehicles',
    subtitle: 'Book up to 3 Vehicles',
    price: 0,
    type: 'vehicle',
  },
];

export const Vechicle_data = [
  {
    id: 1,
    title: 'Van',
    capacity: 7,
    price: 4.5,
    image: Vech1_large,
    details: {
      Full_name: 'Mercedes-Benz V-Class or Toyota Hi-Ac',
      per_person_price: 4.45,
      minimum_capacity: 2,
      maximum_capacity: 7,
      image: Vech1_large,
    },
  },
  {
    id: 2,
    title: 'Mini Bus',
    capacity: 10,
    price: 0,
    image: Vech2_large,
    details: {
      Full_name: 'Mercedes-Van V-Class or Toyota Hi-Ac',
      per_person_price: 7.45,
      minimum_capacity: 4,
      maximum_capacity: 10,
      image: Vech2_large,
    },
  },
  {
    id: 3,
    title: 'Bus',
    capacity: 30,
    price: 0,
    image: Vech3_large,
    details: {
      Full_name: 'Mercedes-Bus V-Class or Toyota Hi-Ac',
      per_person_price: 17.45,
      minimum_capacity: 10,
      maximum_capacity: 30,
      image: Vech3_large,
    },
  },
];
