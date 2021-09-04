import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  carAddForm: FormGroup;
  colors: Color[];
  brands: Brand[];
  constructor(
    private carService: CarService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private brandService: BrandService,
    private colorService: ColorService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.createCarAddForm();
  }

  createCarAddForm() {
    this.carAddForm=this.formBuilder.group({
      carName:["",Validators.required],
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required]
    })
  }

  add() {
    if (this.carAddForm.valid) {
      let carModel=Object.assign({},this.carAddForm.value)
      this.carService.add(carModel).subscribe(response=>{
        this.toastrService.success("Araç Eklendi","Başarılı")
        this.backToList();
      },responseError=>{
        console.log(responseError.error);
      })
    }
    else{
      this.toastrService.error('Form Eksik veya Hatalı',"Başarısız");
    }
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  backToList(){
    this.router.navigate(["/cars/list"])
  }
}
