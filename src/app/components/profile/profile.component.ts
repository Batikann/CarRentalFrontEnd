import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { User } from 'src/app/models/user';
import { UserDto } from 'src/app/models/userDto';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  editCustomerForm: FormGroup;
  password: FormControl;
  email: string;
  userId: number
  customer: Customer;
  constructor(
    private userService: UserService,
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private localStorageservice: LocalstorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createProfileAddForm();
    this.createCustomerAddForm();
    this.userId = parseInt(this.localStorageservice.getCurrentUserId());
    this.email = this.localStorageservice.getItem('currentUserEmail');
    // this.getUser();
    this.getCustomer();
  }

  createProfileAddForm() {
    this.editProfileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  createCustomerAddForm() {
    this.editCustomerForm = this.formBuilder.group({
      companyName: [''],
      findeks: ['', Validators.required],
    });
  }

  // getUser() {
  //   if (this.user) {
  //     this.userService.getUserById(this.userId).subscribe(
  //       (response) => {
  //         // this.user = response.data;
  //     //     this.editProfileForm.setValue({
  //     //       firstName: this.user.firstName,
  //     //       lastName: this.user.lastName,
  //     //       email: this.user.email,
  //     //       password: '',
  //     //     });
  //     //   },
  //     //   (responseError) => {
  //     //     this.toastrService.error(responseError.error);
  //     //   }
  //     // );
  //   }
  // }

  // updateProfile() {
  //   if (this.editProfileForm.valid) {
  //     let profileModel = Object.assign({}, this.editProfileForm.value);
  //     profileModel.userId = this.user.userId;
  //     this.userService.update(profileModel).subscribe(
  //       (response) => {
  //         this.toastrService.success(response.message);
  //         this.router.navigate(['/cars']);
  //       },
  //       (responseError) => {
  //         this.toastrService.error(responseError.error);
  //       }
  //     );
  //   } else {
  //     this.toastrService.error('Hata');
  //   }
  // }

  logout() {
    this.localStorageservice.removeCurrentCustomerEmail();
    this.localStorageservice.removeCurrentCustomer();
    this.localStorageservice.removeCurrentUserId();
  }

  getCustomer() {
    this.customerService.getCustomerByUserId(this.userId).subscribe(
      (response) => {
        console.log(response);
        this.customer = response.data;
        this.editCustomerForm
          .get('companyName')
          ?.setValue(response.data.companyName);
        this.editCustomerForm.get('findeks')?.setValue(response.data.findeks);
      },
      (responseError) => {}
    );
  }

  userCustomerCheck() {
    if (this.customer == null) {
      return false;
    }
    return true;
  }

  refresh() {
    window.location.reload();
  }
}
