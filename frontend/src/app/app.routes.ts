import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';
import { BookingListComponent } from './pages/booking-list/booking-list';
import { BookingCreateComponent } from './pages/booking-create/booking-create';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'booking/list', component: BookingListComponent },
      { path: 'booking/create', component: BookingCreateComponent },
    ]
  },
];