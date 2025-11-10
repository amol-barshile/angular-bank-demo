import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AuthService } from '../../core/auth.service'

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private auth: AuthService) { }
  logout() {
    this.auth.logout()
  }
}
