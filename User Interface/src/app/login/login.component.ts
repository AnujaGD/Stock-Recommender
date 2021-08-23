import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  error: boolean =false;
  elegantForm: FormGroup;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,private  router: Router,public fb: FormBuilder) 
{
  this.elegantForm = this.fb.group({
    "username": ['', /**[*/Validators.required/** , Validators.email]*/],
    "password": ['', Validators.required]
  });
}
  ngOnInit(): void {
  
      if (this.tokenStorage.getToken()) {
      console.log("sdj");
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    
     
  }

  onSubmit(): void {
    const { username, password } = this.form;
    console.log(username)
    this.authService.login(username,password).subscribe(
      data => {
        if(data!=null)
        {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
  
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
          this.router.navigate(['dashboard'])
        }
        else
        {
          this.error = true;

        }
        
      },
      err => {
        this.error = true;
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );

  }
  onLoginSubmit() {
    alert(this.form.username + ' ' + this.form.password);
  }

  reloadPage(): void {
    window.location.reload();
  }
}