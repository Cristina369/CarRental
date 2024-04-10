export interface AddReservationRequest {
  selectedCarId: string;
  selectedUser: string;
  dateReservation: string;
  pickUpDate: string;
  returnDate: string;
  selectedPickUpLocation: string;
  selectedReturnLocation: string;
  details: string;
}
