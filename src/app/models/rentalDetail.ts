export interface RentalDetail {
  rentalID?: number;
  carId:number;
  colorName:string;
  brandName:string;
  customerId:number;
  rentDate:Date;
  returnDate?:Date;
}
