import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/domain/auth/service/auth.service";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public submitted: boolean = false;
  public error?: string = null;

  constructor(
    protected fb: FormBuilder,
    protected authService: AuthService,
    protected router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [, [Validators.required, Validators.minLength(4), Validators.maxLength(255)]],
      password: [, [Validators.required, Validators.minLength(4), Validators.maxLength(255)]],
    });
    this.error = null;
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  loginin(): void
  {
    this.submitted = true;
    this.error = null;
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe(
        () => this.router.navigate(['/']),
        (response: HttpErrorResponse) => {
          let err:string = response.error;
          this.error = err ? err : "Une erreur est survenue, veuillez réésayer...";
        }
      );
    } else {
      console.log('Some fields are missing !');
    }
  }
}
