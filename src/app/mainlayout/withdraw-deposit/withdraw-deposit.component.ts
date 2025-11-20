import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Account } from '../../models/account.model'
import { AccountsService } from '../accounts/accounts.service'

@Component({
  selector: 'app-withdraw-deposit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './withdraw-deposit.component.html',
  styleUrl: './withdraw-deposit.component.css'
})
export class WithdrawDepositComponent implements OnInit {
  withdrawDepositForm!: FormGroup
  error!: string
  accounts: Account[] = [];
  constructor(private accountsService: AccountsService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.withdrawDepositForm = this.fb.group({
      accountId: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      action: [null, [Validators.required]]
    })
    this.getAccountList()
  }

  getAccountList() {
    this.accountsService.getAllAccounts().subscribe({
      next: (response) => {
        this.accounts = response
      },
      error: (error) => {
        console.error('fetching data failed', error)
      },
    })
  }

  onSubmit() {
    const { accountId, amount, action } = this.withdrawDepositForm.value
    if (this.withdrawDepositForm.valid) {
      if (action === 'deposit') {
        this.accountsService.depositAmount(accountId, amount).subscribe({
          next: (response) => {
            this.withdrawDepositForm.reset()
            this.router.navigate(['/home'])
          },
          error: (error) => {
            this.error = error.error.message
            console.error('amount deposite failed', error)
          },
        })
      } else if (action === 'withdraw') {
        this.accountsService.withdrawAmount(accountId, amount).subscribe({
          next: (response) => {
            this.withdrawDepositForm.reset()
            this.router.navigate(['/home'])
          },
          error: (error) => {
            this.error = error.error.message
            console.error('amount withdraw failed', error)
          },
        })
      }
    } else {
      this.withdrawDepositForm.markAllAsTouched()
    }
  }
}
