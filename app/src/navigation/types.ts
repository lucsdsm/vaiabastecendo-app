import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Permission: undefined;
  StationList: undefined;
  Map: undefined;
  UserProfile: undefined;
  UpdatePrice: undefined;
  FuelLog: undefined;
  Configurations: undefined;
  AddVehicle: undefined;
  AddFuelLog: undefined;
  PrivacyTerms: {
    section?: 'terms' | 'privacy';
  } | undefined;
};

export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;