import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './pages/events/events.component';
import { FindUsComponent } from './pages/find-us/find-us.component';
import { HomeComponent } from './pages/home/home.component';
import { InsideComponent } from './pages/inside/inside.component';
import { MenuComponent } from './pages/menu/menu.component';

const routes: Routes = [
  { 
    path: 'home', 
    component: HomeComponent, 
    //data: { animation: 'fadeIn1' } 
  },
  { 
    path: 'events',
    component: EventsComponent,
    //data: { animation: 'fadeIn2' }
    //loadChildren: () => import('./pages/inside/inside.module').then((module) => module.InsideModule)
  },
  { 
    path: 'menu',
    component: MenuComponent,
    //data: { animation: 'fadeIn3' }
    //loadChildren: () => import('./pages/menu/menu.module').then((module) => module.MenuModule)
  },
  {
    path: 'find-us',
    component: FindUsComponent,
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
