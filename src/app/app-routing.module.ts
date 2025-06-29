import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignupComponent } from './signup/signup.component';
import { PageComponent } from './page/page.component';
import { UserComponent } from './user-dashborad/user.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { VaccinehistoryComponent } from './vaccinehistory/vaccinehistory.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BookingComponent } from './booking/booking.component';
import { FamilyBookingComponent } from './family-booking/family-booking.component';
import { ViewBookingComponent } from './view-booking/view-booking.component';
import { CertificateComponent } from './certificate/certificate.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
// import { RescheduleviewComponent } from './rescheduleview/rescheduleview.component';
import { MakingSlotsComponent } from './making-slots/making-slots.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProductsComponent } from './products/products.component'; // Import the ProductsComponent
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: '', component: PageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'register', component: SignupComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'navbar', component: NavbarComponent, canActivate: [AuthGuard] },
  { path: 'sidebar', component: SidebarComponent, canActivate: [AuthGuard] },
  { path: 'vaccinehistory', component: VaccinehistoryComponent, canActivate: [AuthGuard] },
  { path: 'booking', component: BookingComponent, canActivate: [AuthGuard] },
  { path: 'family-booking', component: FamilyBookingComponent, canActivate: [AuthGuard] },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'view-booking', component: ViewBookingComponent, canActivate: [AuthGuard] },
  { path: 'user-dashboard', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'certificate', component: CertificateComponent, canActivate: [AuthGuard] },
  { path: 'admin-dashboard', component: AdmindashboardComponent, canActivate: [AuthGuard] },
  { path: 'making-slots', component: MakingSlotsComponent, canActivate: [AuthGuard] },
  // Wildcard route for unknown paths
  { path: '**', redirectTo: '', pathMatch: 'full' }
];


  
 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
