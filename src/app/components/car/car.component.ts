import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: CarDetailDto[] = [];
  currentCar: CarDetailDto;
  brands: Brand[];
  colors: Color[];
  filterCar = '';
  imgUrl = 'https://localhost:44325/Images/';
  dataLoaded = false;
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private brandService: BrandService,
    private colorService: ColorService,
    private toastrService: ToastrService,
    private rentalService:RentalService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
       if (params['brandId']) {
        this.getCarsByBrandId(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColorId(params['colorId']);
      } else {
        this.getAllCarDto();
      }
    });
  }

  getAllCarDto() {
    this.carService.getAllCarDto().subscribe((response) => {
      this.cars = response.data;
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
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

  setCurrentCar(carId:number) {
    this.carService.getCarDto(carId).subscribe(response=>{
      this.currentCar=response.data[0];
      console.log(this.currentCar);
    })

  }

  getCarImage(car: CarDetailDto) {
    if (car.imagePath) {
      return car.imagePath;
    } else {
      return 'default.jpg';
    }
  }

  getCarDto(carId: number) {
    this.carService.getCarDto(carId).subscribe((response) => {
      this.cars = response.data;
    });
  }
}
