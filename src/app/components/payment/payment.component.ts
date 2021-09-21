import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CreditCard } from 'src/app/models/creditCard';
import { Customer } from 'src/app/models/customer';
import { CustomerDetail } from 'src/app/models/customerDetail';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { CarService } from 'src/app/services/car.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  carImageBasePath = 'https://localhost:44325/Images/';
  creditCardAddForm: FormGroup;
  rental: RentalDetail;
  creditCard: CreditCard;
  creditCards: CreditCard[] = [];
  car: CarDetailDto;
  totalPrice: number;
  totalDay: number;
  dailyPrice: number;
  customer: CustomerDetail;
  cardLimit: number;
  creditCardNumber: string;
  creditCardExpMonth: string;
  rentalModel: RentalDetail;
  selectedCardType: String = '';
  cardTypes: any = ['PayPal', 'Debit Card', 'Credit Card'];
  constructor(
    private toastrService: ToastrService,
    private carService: CarService,
    private localStorageService: LocalstorageService,
    private formBuilder: FormBuilder,
    private creditCardService: CreditCardService,
    private router: Router,
    private rentalService: RentalService
  ) {}

  ngOnInit(): void {
    console.log(this.creditCards);
    this.rental = this.localStorageService.getRental();
    this.getCarDetailsById(this.rental.carId);
    this.createCreditCardAddForm();
    this.getAllByCustomerId(this.rental.customerId);
  }

  radioChangeHandler(event: any) {
    this.selectedCardType = event.target.value;
  }

  createCreditCardAddForm() {
    this.creditCardAddForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expMonth: ['', Validators.required],
      expYear: ['', Validators.required],
      cvv: ['', Validators.required],
      cardType: ['', Validators.required],
    });
  }

  checkOut() {
    if (this.creditCardAddForm.valid) {
      if (this.creditCardAddForm.valid) {
        this.checkBalanceAndFinish();
      }
    }
  }

  sendRentalToDb() {
    this.localStorageService.getRental();
    this.rentalService.addRental(this.rental).subscribe(
      (response) => {
        console.log(response);
        this.toastrService.success(response.message, 'başarılı');
        this.router.navigate(['cars']);
      },
      (HttpErrorResponse) => {
        this.toastrService.error(HttpErrorResponse.error.message, 'Hata');
      }
    );
  }

  checkBalanceAndFinish() {
    let creditCardModel = Object.assign(
      {
        customerId: this.rental.customerId,
        cardType: this.selectedCardType,
        cardLimit: 1000,
      },
      this.creditCardAddForm.value
    );
    if (creditCardModel.cardLimit > this.totalPrice) {
      this.sendRentalToDb();
    } else {
      this.toastrService.error(
        'Hata Kart Limitiniz Yetersiz',
        'İşlem Tamamlanamadı'
      );
    }
  }

  checkOutAndSaveCard() {
    if (this.creditCardAddForm.valid) {
      let creditCardModel = Object.assign(
        {
          customerId: this.rental.customerId,
          cardType: this.selectedCardType,
          cardLimit: 1000,
        },
        this.creditCardAddForm.value
      );
      console.log(creditCardModel);
      if (creditCardModel.cardLimit > this.totalPrice) {
        this.creditCardService.add(creditCardModel).subscribe(
          (response) => {
            console.log(response);

            this.sendRentalToDb();
          },
          (responseError) => {
            if (responseError.error.ValidationErrors.length > 0) {
              for (
                let i = 0;
                i < responseError.error.ValidationErrors.length;
                i++
              ) {
                this.toastrService.error(
                  responseError.error.ValidationErrors[i].ErrorMessage,
                  'Doğrulama Hatası'
                );
              }
            }
          }
        );
      } else {
        this.toastrService.error(
          'Hata,Kart limitiniz yetersiz, İşlem tamamlanamadı'
        );
      }
    } else {
      this.toastrService.error('Formunuz Eksik', 'Dikkat');
    }
  }

  useRegisteredCard(creditCard: CreditCard) {
    if (creditCard.cardLimit > this.totalPrice) {
      this.sendRentalToDb();
    } else {
      this.toastrService.error('Kart Limiti Yetersiz');
    }
  }

  getCarDetailsById(carId: number) {
    this.carService.getCarDto(carId).subscribe((response) => {
      this.car = response.data[0];
      this.calculateTotalPrice();
    });
  }

  calculateTotalPrice(): number {
    this.totalDay =
      (new Date(this.rental.returnDate).getTime() -
        new Date(this.rental.rentDate).getTime()) /
      (1000 * 3600 * 24);
    this.totalPrice = this.totalDay * this.car.dailyPrice;
    return this.totalPrice;
  }

  getCarImage(car: CarDetailDto) {
    if (car.imagePath) {
      return car.imagePath;
    }

    return 'default.jpg';
  }

  getAllByCustomerId(customerId: number) {
    this.creditCardService
      .getAllByCustomerId(customerId)
      .subscribe((response) => {
        this.creditCards = response.data;
        console.log(response.data);
      });
  }
}
