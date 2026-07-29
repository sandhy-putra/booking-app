import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Booking {
  id: number;
  resource_id: number;
  user_id: number;
  tanggal: string;
  jam_mulai: string;
  jam_selesai: string;
  status: string;
  keterangan: string | null;
  resource?: { id: number; nama: string };
  user?: { id: number; name: string };
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  private apiUrl = `${environment.apiUrl}/bookings`;

  constructor(private http: HttpClient) {}

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl);
  }

  createBooking(data: any): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl, data);
  }
}