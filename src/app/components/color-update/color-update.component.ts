import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css'],
})
export class ColorUpdateComponent implements OnInit {
  color: Color;
  colorUpdateForm: FormGroup;
  colorId:number;
  colorName:string;

  constructor(
    private colorService: ColorService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["colorId"]) {
        this.getbyColorId(params["colorId"]);
        this.createColorUpdateForm();
      }
    })
  }

  getbyColorId(colorId:number) {
    this.colorService.getColorById(this.activatedRoute.snapshot.params["colorId"]).subscribe((response) => {
      this.color = response.data;
      this.colorId=this.color.colorId
      this.colorName=this.color.colorName
      console.log(response.data);
    });
  }

  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      colorId:[this.colorId,Validators.required],
      colorName: [this.colorName,Validators.required],
    });
  }

  update(){
    if (this.colorUpdateForm.valid) {
      let colorModel = Object.assign({}, this.colorUpdateForm.value);
      this.colorService.update(colorModel).subscribe(response=>{
        this.toastrService.success("Renk güncellendi","Başarılı")
        this.backToList();
      }
      ,
      (responseError)=>
      {
            this.toastrService.error(responseError.error.Message,"Doğrulama hatası")
            console.log(responseError);



      }
      );
    } else {
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }

  backToList(){
    this.router.navigate(["colors/list"])
  }

}

