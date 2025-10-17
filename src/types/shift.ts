export interface Shift {
  id: string;
  logo: string;
  coordinates: Coordinates;
  address: string;
  companyName: string;
  dateStartByCity: string;
  timeStartByCity: string;
  timeEndByCity: string;
  currentWorkers: number;
  planWorkers: number;
  workTypes: WorkType[];
  priceWorker: number;
  bonusPriceWorker: number;
  customerFeedbacksCount: number;
  customerRating: number;
  isPromotionEnabled: boolean;
}

type WorkType = {
  id: string;
  name: string;
  nameGt5: string;
  nameLt5: string;
  nameOne: string;
};

type Coordinates = {
  latitude: number;
  longitude: number;
};
export interface Location {
  latitude: number;
  longitude: number;
}
