import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AccountsService } from '../accounts/accounts.service'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  transactionSummary: any
  defaultLimit: number
  constructor(private accountsService: AccountsService, private router: Router) {
    this.defaultLimit = 10
  }

  ngOnInit() {
    this.getTransactionSummary()
  }

  getTransactionSummary() {
    this.accountsService.getAllTransactionByLimit(this.defaultLimit).subscribe({
      next: (response) => {
        this.transactionSummary = response
        this.router.navigate(['/home'])
      },
      error: (error) => {
        console.error('self transfer amount failed', error)
      },
    })
  }
}
