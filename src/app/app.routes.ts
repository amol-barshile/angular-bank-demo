import { Routes } from '@angular/router'
import { AuthGuard } from './core/auth.guard'
import { LoginComponent } from './login/login.component'
import { AccountComponent } from './mainlayout/accounts/accounts.component'
import { HomeComponent } from './mainlayout/home/home.component'
import { MainlayoutComponent } from './mainlayout/mainlayout.component'
import { SelfTransferComponent } from './mainlayout/self-transfer/self-transfer.component'
import { WithdrawDepositComponent } from './mainlayout/withdraw-deposit/withdraw-deposit.component'
import { RegisterComponent } from './register/register.component'

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, title: 'Login | MyApp' },
  { path: 'register', component: RegisterComponent, title: 'Register | MyApp' },
  {
    path: '',
    component: MainlayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent, title: 'Home | MyApp' },
      { path: 'account', component: AccountComponent, title: 'Account | MyApp' },
      { path: 'withdraw-deposit', component: WithdrawDepositComponent, title: 'Deposit-Withdraw | MyApp' },
      { path: 'self-transfer', component: SelfTransferComponent, title: 'Self-Transfer | MyApp' }
    ],
  },
  { path: '**', redirectTo: 'login' }
]
