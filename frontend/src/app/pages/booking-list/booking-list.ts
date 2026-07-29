import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookingService, Booking } from '../../services/booking';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './booking-list.html',
  styleUrl: './booking-list.scss'
})
export class BookingListComponent implements OnInit {
  bookings = signal<Booking[]>([]);
  loading = signal(true);

  constructor(
    private bookingService: BookingService,
    private authService: AuthService
  ) {}

  get isAdmin(): boolean {
    return this.authService.currentUser()?.role?.nama === 'admin';
  }

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.loading.set(true);
    this.bookingService.getBookings().subscribe({
      next: (data) => {
        this.bookings.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  approve(id: number) {
    if (!confirm('Approve booking ini?')) return;
    this.bookingService.approveBooking(id).subscribe({
      next: () => this.loadBookings()
    });
  }

  reject(id: number) {
    if (!confirm('Reject booking ini?')) return;
    this.bookingService.rejectBooking(id).subscribe({
      next: () => this.loadBookings()
    });
  }
}