import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { JwtHelperService } from "@auth0/angular-jwt"
import { Observable } from "rxjs"

export interface User {
    username: string
    email: string
    password: string
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = 'http://localhost:3000/auth';
    private jwtHelper = new JwtHelperService();

    constructor(private http: HttpClient, private router: Router) { }

    register(user: User): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/register`, user)
    }

    login(user: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, user)
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

}