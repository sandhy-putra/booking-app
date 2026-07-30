import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  totalBookings = signal(0);
  todayBookings = signal(0);
  pendingBookings = signal(0);

  constructor(
    private authService: AuthService,
    private bookingService: BookingService,
    private router: Router
  ) {}

  get currentUser() {
    return this.authService.currentUser();
  }

  ngOnInit() {
    this.bookingService.getBookings().subscribe({
      next: (data) => {
        this.totalBookings.set(data.length);
        const today = new Date().toISOString().split('T')[0];
        this.todayBookings.set(data.filter(b => b.tanggal.startsWith(today)).length);
        this.pendingBookings.set(data.filter(b => b.status === 'pending').length);
      }
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.router.navigate(['/login'])
    });
  }
}