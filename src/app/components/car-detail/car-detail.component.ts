import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
import { CarimageService } from 'src/app/services/carimage.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  carDetail: CarDetailDto[];
  carImages: CarImage[];
  currentCar:CarDetailDto;
  currentCarImage: CarImage;
  isCarRentable:boolean;
  imageUrl = 'https://localhost:44325/Images/';
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarimageService,
    private rentalService:RentalService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetails(params['carId']);
        this.getCarImage(params['carId']);
      }
    });
  }

  getCarImage(carId: number) {
    this.carImageService.getCarImagesById(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }

  getCarDetails(carId: number) {
    this.carService.getCarDto(carId).subscribe((response) => {
      this.carDetail = response.data;
    });
  }

  checkCarRentable(carId:number){
    this.rentalService.getRentalCarControl(carId).subscribe((response) => {
      this.isCarRentable = response.success;
    })
  }

  getActivePhoto(index: number) {
    if (index == 0) {
      return 'carousel-item active';
    }
    return 'carousel-item';
  }

  getButtonClass(image: CarImage) {
    if ((image = this.carImages[0])) {
      return 'active';
    } else {
      return '';
    }
  }

  getCurrentImageClass(image: CarImage) {
    if (image==this.carImages[0]) {
      return 'carousel-item active';
    } else {
      return 'carousel-item ';
    }
  }

  setCurrentImageClass(image: CarImage) {
    this.currentCarImage = image;
  }

  // checkRentalStatus(carId:number){
  //   let selectCar=this.carDetail.filter(c=>c.carId==carId);
  //   if (selectCar[0].isRented==true) {
  //     return "btn btn-success disabled";
  //   }
  //   return "btn btn-success";
  // }

  setCurrentCar(carId:number) {
    this.carService.getCarDto(carId).subscribe(response=>{
      this.currentCar=response.data[0];
      console.log(this.currentCar);
    })

  }
}
