import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { JwtHelperService } from "@auth0/angular-jwt"
import { Observable } from "rxjs"
import { APIURL } from "../constants/app.constant"
import { User } from "../models/user.model"

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private jwtHelper = new JwtHelperService();

    constructor(private http: HttpClient, private router: Router) { }

    register(user: User): Observable<any> {
        return this.http.post<any>(`${APIURL}/auth/register`, user)
    }

    login(user: any): Observable<any> {
        return this.http.post<any>(`${APIURL}/auth/login`, user)
    }

    logout() {
        localStorage.removeItem('token')
        this.router.navigate(['/login'])
    }

    getToken() {
        return localStorage.getItem('token')
    }

    isAuthenticated(): boolean {
        const token = this.getToken()
        return token != null && !this.jwtHelper.isTokenExpired(token)
    }

    getEmpData() {
        return this.http.get<any[]>('assets/emp.json')
    }

}