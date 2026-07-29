import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking';
import { ResourceService, Resource } from '../../services/resource';

@Component({
  selector: 'app-booking-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking-create.html',
  styleUrl: './booking-create.scss'
})
export class BookingCreateComponent implements OnInit {
  resources = signal<Resource[]>([]);
  errorMessage = signal('');
  submitting = signal(false);

  form = {
    resource_id: null as number | null,
    tanggal: '',
    jam_mulai: '',
    jam_selesai: '',
    keterangan: ''
  };

  constructor(
    private resourceService: ResourceService,
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.resourceService.getResources().subscribe({
      next: (data) => this.resources.set(data)
    });
  }

  onSubmit() {
    this.errorMessage.set('');
    this.submitting.set(true);

    this.bookingService.createBooking(this.form).subscribe({
      next: () => {
        this.router.navigate(['/booking/list']);
      },
      error: (err) => {
        this.submitting.set(false);
        const errors = err.error?.errors;
        if (errors) {
          this.errorMessage.set(Object.values(errors).flat().join(' '));
        } else {
          this.errorMessage.set(err.error?.message || 'Gagal membuat booking.');
        }
      }
    });
  }
}