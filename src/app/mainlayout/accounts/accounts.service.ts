import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { Observable } from 'rxjs'
import { APIURL } from '../../constants/app.constant'
import { Account } from '../../models/account.model'


@Injectable({
    providedIn: 'root'
})
export class AccountsService {

    constructor(private http: HttpClient) { }

    addNewAccount(account: Account): Observable<any> {
        return this.http.post<any>(`${APIURL}/accounts`, account)
    }

    getAllAccounts(): Observable<any> {
        return this.http.get<any>(`${APIURL}/accounts`)
    }

    deleteAccountById(accountId: any): Observable<any> {
        return this.http.delete<any>(`${APIURL}/accounts/${accountId}`)
    }

    getAllTransactionByAccount(accountId: number): Observable<any> {
        return this.http.get<any>(`${APIURL}/transactions?accountId=${accountId}`)
    }

    depositAmount(accountId: string, amount: number): Observable<any> {
        return this.http.post<any>(`${APIURL}/transactions/deposit`, { accountId, amount })
    }

    withdrawAmount(accountId: string, amount: number): Observable<any> {
        return this.http.post<any>(`${APIURL}/transactions/withdraw`, { accountId, amount })
    }

    selfTransfer(fromAccountId: string, toAccountId: string, amount: string): Observable<any> {
        return this.http.post<any>(`${APIURL}/transactions/transfer`, { fromAccountId, toAccountId, amount })
    }

    getAllTransactionByLimit(limit: number): Observable<any> {
        return this.http.get<any>(`${APIURL}/transactions/latest?limit=${limit}`)
    }

}