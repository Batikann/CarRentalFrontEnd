import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css'],
})
export class ColorAddComponent implements OnInit {
  colorAddForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm() {
    this.colorAddForm = this.formBuilder.group({
      colorName: ['', Validators.required],
    });
  }

  add() {
    if (this.colorAddForm.valid) {
      let productModel = Object.assign({}, this.colorAddForm.value);
      this.colorService.add(productModel).subscribe(
        (data) => {
          console.log(data);
          this.toastrService.success(data.message, 'Başarılı');
          this.backToList();
        },
        (responseError) => {
          console.log(responseError.error);
        }
      );
    } else {
      this.toastrService.error('Formunuz Eksik Veya Hatalı', 'Dikkat');
    }
  }

  backToList() {
    this.router.navigate(['/colors/list']);
  }
}
