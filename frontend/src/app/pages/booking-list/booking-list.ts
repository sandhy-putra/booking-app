import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { BookingService, Booking } from '../../services/booking';
import { AuthService } from '../../services/auth';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, AgGridAngular],
  templateUrl: './booking-list.html',
  styleUrl: './booking-list.scss'
})
export class BookingListComponent implements OnInit {
  bookings = signal<Booking[]>([]);
  loading = signal(true);
  quickFilterText = '';

  colDefs: ColDef[] = [
    { field: 'resource.nama', headerName: 'Resource', filter: true, sortable: true },
    { field: 'tanggal', headerName: 'Tanggal', filter: true, sortable: true },
    {
      headerName: 'Jam',
      valueGetter: (params) => `${params.data.jam_mulai} - ${params.data.jam_selesai}`,
      sortable: true
    },
    {
      field: 'status',
      headerName: 'Status',
      filter: true,
      sortable: true,
      cellRenderer: (params: any) => {
        return '<span class="badge badge--' + params.value + '">' + params.value + '</span>';
      }
    },
    { field: 'user.name', headerName: 'User', filter: true, sortable: true },
    {
      headerName: 'Aksi',
      cellRenderer: (params: any) => {
        if (!this.isAdmin || params.data.status !== 'pending') {
          return '';
        }
        return '<button class="btn-approve" data-id="' + params.data.id + '" data-action="approve">✓ Approve</button>' +
               '<button class="btn-reject" data-id="' + params.data.id + '" data-action="reject">✕ Reject</button>';
      },
      onCellClicked: (params: any) => {
        const target = params.event ? params.event.target as HTMLElement : null;
        const action = target && target.dataset ? target.dataset['action'] : null;
        const id = target && target.dataset ? target.dataset['id'] : null;
        if (action === 'approve' && id) {
          this.approve(+id);
        }
        if (action === 'reject' && id) {
          this.reject(+id);
        }
      },
      sortable: false,
      filter: false
    }
  ];

  defaultColDef: ColDef = {
    resizable: true,
    flex: 1
  };

  constructor(
    private bookingService: BookingService,
    private authService: AuthService
  ) {}

  get isAdmin(): boolean {
    const user = this.authService.currentUser();
    return user !== null && user.role !== undefined && user.role.nama === 'admin';
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
      error: () => {
        this.loading.set(false);
      }
    });
  }

  approve(id: number) {
    if (!confirm('Approve booking ini?')) {
      return;
    }
    this.bookingService.approveBooking(id).subscribe({
      next: () => {
        this.loadBookings();
      }
    });
  }

  reject(id: number) {
    if (!confirm('Reject booking ini?')) {
      return;
    }
    this.bookingService.rejectBooking(id).subscribe({
      next: () => {
        this.loadBookings();
      }
    });
  }
}