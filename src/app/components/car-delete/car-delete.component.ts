import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-delete',
  templateUrl: './car-delete.component.html',
  styleUrls: ['./car-delete.component.css'],
})
export class CarDeleteComponent implements OnInit {
  carDeleteForm: FormGroup;
  car: CarDetailDto;
  carId: number;
  carName: string;
  description: string;
  dailyPrice: number;
  modelYear: string;
  brandName: string;
  colorName: string;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarById(params['carId']);
        this.createCarForm();
      }
    });
  }

  getCarById(carId: number) {
    this.carService
      .getCarByIdSingle(this.activatedRoute.snapshot.params['carId'])
      .subscribe((response) => {
        this.car = response.data;
        this.carId = this.car.carId;
        this.brandName = this.car.brandName;
        this.colorName = this.car.colorName;
        this.dailyPrice = this.car.dailyPrice;
        this.description = this.car.description;
        this.carName = this.car.carName;
        this.modelYear=this.car.modelYear;
      });
  }

  createCarForm() {
    this.carDeleteForm = this.formBuilder.group({
      carId: ['', Validators.required],
    });
  }

  delete() {
    if (this.carDeleteForm.valid) {
      let carModel = Object.assign({}, this.carDeleteForm.value);
      this.carService.delete(carModel).subscribe(
        (response) => {
          this.toastrService.success('Car Deleted', 'Successfull');
          this.backToList();
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
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
