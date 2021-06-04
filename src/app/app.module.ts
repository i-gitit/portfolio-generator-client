import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AlertComponent } from './components/alert/alert.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { EditPortfolioComponent } from './components/edit-portfolio/edit-portfolio.component';
import { AboutComponent } from './components/edit-portfolio/about/about.component';
import { SkillsComponent } from './components/edit-portfolio/skills/skills.component';
import { ResumeComponent } from './components/edit-portfolio/resume/resume.component';
import { ProjectsComponent } from './components/edit-portfolio/projects/projects.component';
import { BuildPortfolioService } from './services/build-portfolio.service';
import { ServicesComponent } from './components/edit-portfolio/services/services.component';
import { ContactComponent } from './components/edit-portfolio/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserDashboardComponent,
    AlertComponent,
    PortfolioComponent,
    EditPortfolioComponent,
    AboutComponent,
    SkillsComponent,
    ResumeComponent,
    ProjectsComponent,
    ServicesComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [BuildPortfolioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
