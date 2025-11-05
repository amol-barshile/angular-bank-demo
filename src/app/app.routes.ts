import { Routes } from '@angular/router'
import { AuthGuard } from './core/auth.guard'
import { LoginComponent } from './login/login.component'
import { HomeComponent } from './mainlayout/home/home.component'
import { MainlayoutComponent } from './mainlayout/mainlayout.component'
import { ProductsComponent } from './mainlayout/products/products.component'
import { RegisterComponent } from './register/register.component'

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: MainlayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductsComponent },
    ],
  },
  { path: '**', redirectTo: 'login' }
]
