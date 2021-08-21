import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
import { CarimageService } from 'src/app/services/carimage.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  carDetail: CarDetailDto[];
  carImages: CarImage[];
  currentCarImage: CarImage;
  imageUrl = 'https://localhost:44325/Images/';
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarimageService
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
}
