import { CarImage } from "./carImage";

export interface CarDetailDto {
  carId: number;
  carName: string;
  brandId:number;
  brandName: string;
  colorId:number;
  colorName: string;
  description: string;
  modelYear: string;
  dailyPrice: number;
  imagePath:string;
}
