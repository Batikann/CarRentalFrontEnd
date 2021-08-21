import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: CarDetailDto[] = [];
  currentCar: CarDetailDto;
  imgUrl = 'https://localhost:44325/Images/';
  dataLoaded = false;
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["brandId"]) {
        this.getCarsByBrandId(params["brandId"])
      }
      else if (params["colorId"]) {
        this.getCarsByColorId(params["colorId"])
      }
      else{
        this.getAllCarDto();
      }
    })
  }

  getAllCarDto() {
    this.carService.getAllCarDto().subscribe((response) => {
      this.cars = response.data;
    });
  }

  getCarsByBrandId(brandId: number) {
    this.carService.getCarsByBrandId(brandId).subscribe((response) => {
      this.cars = response.data;
    });
  }

  getCarsByColorId(colorId: number) {
    this.carService.getCarsByColorId(colorId).subscribe((response) => {
      this.cars = response.data;
    });
  }

  setCurrentCar(carDetailDto:CarDetailDto){
    this.currentCar=carDetailDto;
  }

  getCarImage(car:CarDetailDto){
    if (car.imagePath) {
      return car.imagePath;
    } else {
      return 'default.jpg';
    }
  }

  getCarDto(carId:number){
    this.carService.getCarDto(carId).subscribe(response=>{
      this.cars=response.data;
    })
  }
}
