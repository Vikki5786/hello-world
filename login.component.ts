import { ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import Router for navigation
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]], // Required username
      password: ['', [Validators.required]]  // Required password
    });
  }

  // Submit method
  onSubmit(): void {
    const { username, password } = this.loginForm.value;

    // Use AuthService to login
    if (this.authService.login(username, password)) {
      // Redirect to home page on successful login
      this.router.navigate(['/home']);
    } else {
      // Show error message if credentials are incorrect
      alert('Invalid username or password');
    }
  }
}