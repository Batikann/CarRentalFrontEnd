export interface RentalDetail {
  rentalID: number;
  carId:number;
  customerId:number;
  carName:string;
  modelYear:string;
  colorName:string;
  brandName:string;
  firstName:string;
  lastName:string;
  dailyPrice:number;
  description:string;
  companyName:string;
  rentDate:Date;
  returnDate?:Date;
}
