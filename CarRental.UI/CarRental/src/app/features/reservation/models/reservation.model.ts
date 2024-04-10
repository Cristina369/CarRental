export interface Reservation {
  id: string;
  selectedCarModel: string;
  selectedUserName: string;
  selectedUserEmail: string;
  dateReservation: string;
  pickUpDate: string;
  returnDate: string;
  pickUpLocationName: string;
  returnLocationName: string;
  details: string;
}
