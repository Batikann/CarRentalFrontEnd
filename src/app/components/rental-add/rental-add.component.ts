import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CustomerDetail } from 'src/app/models/customerDetail';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { ResponseModel } from 'src/app/models/responseModel';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css'],
  providers:[DatePipe]
})
export class RentalAddComponent implements OnInit {


  @Input() car:CarDetailDto;

  constructor(
    private customerService: CustomerService,
    private datePipe: DatePipe,
    private router: Router,
    private rentalService: RentalService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {

  }

  onChangeEvent(event: any) {

  }
}
