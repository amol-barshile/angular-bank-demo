import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { AuthService } from '../core/auth.service'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!: FormGroup
  errorMessage: any
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.errorMessage = ''
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  get name() {
    return this.registerForm.get('name')!
  }

  get email() {
    return this.registerForm.get('email')!
  }

  get password() {
    return this.registerForm.get('password')!
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          alert('Registration successful!')
          localStorage.setItem('token', response.access_token)
          this.router.navigate(['/home'])
        },
        error: (error) => {
          console.error('Registration failed', error.error.message)
          this.errorMessage = error.error.message
        },
      })
      this.registerForm.reset()
    } else {
      this.registerForm.markAllAsTouched()
    }
  }
}
