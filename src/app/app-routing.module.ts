import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { AuthGuard} from './helpers/auth.guard';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { EditPortfolioComponent } from './components/edit-portfolio/edit-portfolio.component';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { ContactCardComponent } from './components/contact-card/contact-card.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';

const routes: Routes = [
  { path: 'home',component: HomeComponent},
  { path: 'dashboard',component: UserDashboardComponent, canActivate: [AuthGuard],
  children: [
    {
      path: 'editportfolio', // child route path
      component: EditPortfolioComponent, // child route component that the router renders
    },
    {
      path: '', // child route path
      component: DashboardHomeComponent, // child route component that the router renders
    },
    {
      path: 'accountsettings', // child route path
      component: UserSettingsComponent, // child route component that the router renders
    },
    {
      path: 'editcontactcard', // child route path
      component: EditContactComponent, // child route component that the router renders
    }
  ]},
  { path: 'portfolio/:id', component: PortfolioComponent},
  { path: 'contact/:id', component: ContactCardComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
