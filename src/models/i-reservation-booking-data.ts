export interface ReservationBookingData {
  adultCount: number;
  infantCount: number;
  checkInDate: Date;
  checkOutDate: Date;
  bedSize: string;
  included: string;
  totalVisitorCount: number;
  totalPrice: number;
  hotel: {
    img: string;
    name: string;
  };
}
