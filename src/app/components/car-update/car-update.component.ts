import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  car: Car;
  brands: Brand[] = [];
  colors: Color[] = [];
  carUpdateForm: FormGroup;
  carId: number;
  brandId: number;
  colorId: number;
  modelYear: string;
  dailyPrice: number;
  description: string;
  carName:string;

  constructor(
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getByCarId(params['carId']);
    });
    this.createCarUpdateForm();
    this.getBrands();
    this.getColors();
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

  getByCarId(carId: number) {
    this.carService
      .getCarById(this.activatedRoute.snapshot.params['carId'])
      .subscribe((response) => {
        this.car = response.data;
        this.carId = this.car.carId;
        this.brandId = this.car.brandId;
        this.colorId = this.car.colorId;
        this.modelYear = this.car.modelYear;
        this.description = this.car.description;
        this.dailyPrice = this.car.dailyPrice;
        this.carName=this.car.carName
        console.log(response.data);
      });
  }

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      carId: ['', Validators.required],
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      description: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      modelYear: ['', Validators.required],
      carName:['',Validators.required]
    });
  }

  update() {
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value);
      this.carService.update(carModel).subscribe(
        (response) => {
          this.toastrService.success('Renk güncellendi', 'Başarılı');
          this.backToList();
        },
        (responseError) => {
          this.toastrService.error(
            responseError.error.Message,
            'Doğrulama hatası'
          );
          console.log(responseError);
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }

  backToList() {
    this.router.navigate(['cars/list']);
  }
}
