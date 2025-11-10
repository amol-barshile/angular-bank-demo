import { CommonModule } from '@angular/common'
import { Component, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ACCOUNT_TYPES } from '../../constants/account-types.constant'
import { Account } from '../../models/account.model'
import { ModalComponent } from '../../shared/components/modal-component'
import { AccountsService } from './accounts.service'

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, ModalComponent, ReactiveFormsModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountComponent implements OnInit {
  @ViewChild('addModal') addModal!: ModalComponent
  @ViewChild('deleteModal') deleteModal!: ModalComponent
  @ViewChild('viewModal') viewModal!: ModalComponent
  accounts: Account[] = [];
  transactions: any
  newAccountForm!: FormGroup
  selectedAccount: any | undefined
  accountTypes = ACCOUNT_TYPES;
  error: string | undefined

  constructor(private accountsService: AccountsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.newAccountForm = this.fb.group({
      accountType: ['', [Validators.required]],
    })
    this.getAccountList()
  }

  get description() {
    return this.newAccountForm.get('accountType')!
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

  openNewAccountModal() {
    this.newAccountForm.reset()
    this.error = ''
    this.addModal.open()
  }

  closeNewAccountModal() {
    this.addModal.close()
  }

  viewAccountTransactions(account: any) {
    this.transactions = []
    this.accountsService.getAllTransactionByAccount(account.id).subscribe({
      next: (response) => {
        this.transactions = response
      },
      error: (error) => {
        console.error('fetching data failed', error)
      },
    })
    this.viewModal.open()
  }

  onSubmit() {
    if (this.newAccountForm.valid) {
      this.accountsService.addNewAccount(this.newAccountForm.value).subscribe({
        next: (response) => {
          this.getAccountList()
          this.newAccountForm.reset()
          this.addModal.close()
        },
        error: (error) => {
          this.error = error.error.message
          console.error('New Account addition failed', error)
        },
      })
    } else {
      this.newAccountForm.markAllAsTouched()
    }
  }
}
