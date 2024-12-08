import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: CrudService,
    private router: Router,
    private toast: NgToastService
  ) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      mdp: new FormControl('', [Validators.required]),
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get mdp() {
    return this.loginForm.get('mdp');
  }

  login() {
    if (this.loginForm.invalid) {
      this.toast.info({
        detail: 'Error Message',
        summary: 'Please fill in all required fields.',
      });
      return;
    }

    const data = this.loginForm.value;
    this.service.loginAdmin({ email: data.email, mdp: data.mdp }).subscribe(
      (res) => {
        console.log('Login response:', res);

        // Save token and role
        localStorage.setItem('myToken', res.token);
        localStorage.setItem('role', res.admin.role);

        this.toast.success({
          detail: 'Success Message',
          summary: 'Login successful!',
        });
        this.router.navigate(['home']);
      },
      (err) => {
        if (err.status === 401) {
          this.toast.error({
            detail: 'Error Message',
            summary: 'Invalid email or password.',
          });
        } else {
          this.toast.error({
            detail: 'Error Message',
            summary: 'Server unavailable. Please try again later.',
          });
        }
      }
    );
  }

  ngOnInit(): void {
    if (this.service.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }
}
