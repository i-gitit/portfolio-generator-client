import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { AuthGuard} from './helpers/auth.guard';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { EditPortfolioComponent } from './components/edit-portfolio/edit-portfolio.component';

const routes: Routes = [
  { path: 'home',component: HomeComponent},
  { path: 'dashboard',component: UserDashboardComponent,
  children: [
    {
      path: 'editportfolio', // child route path
      component: EditPortfolioComponent, // child route component that the router renders
    }
  ]},
  { path: 'portfolio', component: PortfolioComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
