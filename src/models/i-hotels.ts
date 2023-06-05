export interface IHotelsItemRating {
  cleanliness: number;
  staff: number;
  comfort: number;
  service: number;
}

export interface IHotelsItemLocationCoordinates {
  lat: string;
  long: string;
}

export interface IHotelsItem {
  id: number;
  name: string;
  location: {
    country: string;
    city: string;
    addr: string;
    subway_access: boolean;
    distance_from_center: number;
    coordinates: IHotelsItemLocationCoordinates;
  };
  phone: string;
  bed_sizes: string[];
  included: string[];
  pricing: {
    bed: {
      king: number;
      queen: number;
      normal: number;
    };
    included: {
      breakfast: number;
      dinner: number;
      'all-in': number;
    };
  };
  rating: IHotelsItemRating;
  facilities: string[];
  desc: string;
  img: string;
}
