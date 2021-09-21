import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { Customer } from 'src/app/models/customer';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { User } from 'src/app/models/user';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css'],
})
export class RentalAddComponent implements OnInit {
  car: Car;
  user: User;
  customer: Customer;
  customers: Customer[] = [];
  carId: number;
  rentalAddForm: FormGroup;
  status: boolean;
  constructor(
    private toastrService: ToastrService,
    private carService: CarService,
    private rentalService: RentalService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private localStorageService: LocalstorageService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetailsById(params['carId']);
        let currentUserId = parseInt(
          this.localStorageService.getCurrentUserId(),
          10
        );
        this.getCustomerByUserId(currentUserId);
        this.createRentalAddForm();
      }
    });
  }

  createRentalAddForm() {
    this.rentalAddForm = this.formBuilder.group({
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required],
    });
  }

  getCarDetailsById(carId: number) {
    this.carService.getCarById(carId).subscribe((response) => {
      this.car = response.data;
      console.log(response);
    });
  }

  getCustomerByUserId(userId: number) {
    this.customerService.getCustomerByUserId(userId).subscribe((response) => {
      this.customer = response.data;
      console.log(response);
    });
  }

  addRental() {
    if (this.rentalAddForm.valid) {
      let rentalModel = Object.assign(
        { carId: this.car.carId, customerId: this.customer.customerId },
        this.rentalAddForm.value
      );
      console.log(rentalModel);
      if (this.status) {
        this.localStorageService.addRental(rentalModel);
        this.router.navigate(['/payment/car/' + this.car.carId]);
        this.toastrService.info('Ödeme Sayfasına Yönlendiriliyorsunuz....');
      }
      this.router.navigate(["/cars"]);
    } else {
      this.toastrService.error(
        'Formunuz Eksik Veya Hatalı Lütfen Tekrar Deneyiniz!'
      );
    }
  }

  checkCarRentalStatus(rental: RentalDetail) {
    this.rentalService.checkCarRentalStatus(rental).subscribe((response) => {
      this.status = response.success;
    });
  }
}
