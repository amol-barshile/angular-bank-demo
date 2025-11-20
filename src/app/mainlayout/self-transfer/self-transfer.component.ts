import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Account } from '../../models/account.model'
import { AccountsService } from '../accounts/accounts.service'

@Component({
  selector: 'app-self-transfer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './self-transfer.component.html',
  styleUrl: './self-transfer.component.css'
})
export class SelfTransferComponent {
  selfTransferForm!: FormGroup
  error!: string
  accounts: Account[] = [];
  constructor(private accountsService: AccountsService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.selfTransferForm = this.fb.group({
      fromAccount: [null, [Validators.required]],
      toAccount: [{ value: null, disable: true }, Validators.required],
      amount: ['', [Validators.required]]
    })
    this.selfTransferForm.get('fromAccount')?.valueChanges.subscribe(selectedFrom => {
      const toAccountControl = this.selfTransferForm.get('toAccount')
      console.log(toAccountControl)
      if (selectedFrom) {
        console.log('if')
        toAccountControl?.enable()
        toAccountControl?.reset()
      } else {
        console.log('else')
        toAccountControl?.reset()
        toAccountControl?.disable()
      }
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
    const { fromAccount, toAccount, amount } = this.selfTransferForm.value
    if (this.selfTransferForm.valid) {
      this.accountsService.selfTransfer(fromAccount, toAccount, amount).subscribe({
        next: (response) => {
          this.selfTransferForm.reset()
          this.router.navigate(['/home'])
        },
        error: (error) => {
          this.error = error.error.message
          console.error('self transfer amount failed', error)
        },
      })
    } else {
      this.selfTransferForm.markAllAsTouched()
    }
  }
}
