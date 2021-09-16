import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private localStorageService: LocalstorageService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  getUser(mail: string) {
    this.userService.getUserByMail(mail).subscribe((response) => {
      this.user = response.data;
      this.localStorageService.addCurrentCustomer(this.user);
      this.localStorageService.addCurrentUserId(this.user);
    });
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      let loginModel: LoginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(
        (response) => {
          this.toastrService.success('Giriş Başarılı', 'Hoşgeldiniz');
          this.getUser(loginModel.email);
          this.localStorageService.addToken(response.data);
          setTimeout(()=>{
            this.reflesh();
          })

        },
        (responseError) => {
          this.toastrService.error(responseError.error);
        }
      );
    }
    else{
      this.toastrService.error("Bilgileriniz eksik veya Hatalı Lütfen Tekrar Deneyiniz")
    }
  }

  reflesh(){
    window.location.reload();
  }
}
