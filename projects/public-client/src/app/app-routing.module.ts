import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConstructionComponent } from './pages/construction/construction.component';
import { EventsComponent } from './pages/events/events.component';
import { FindUsComponent } from './pages/find-us/find-us.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { PrivatePartiesComponent } from './pages/private-parties/private-parties.component';
import { TourComponent } from './pages/tour/tour.component';

const routes: Routes = [
  { 
    path: 'home', 
    component: HomeComponent,    
    data: { 
      pageTitle: 'Home',
    }
  },
  { 
    path: 'events',
    component: EventsComponent,
    data: { 
      pageTitle: 'Events',
    }
    //loadChildren: () => import('./pages/inside/inside.module').then((module) => module.InsideModule)
  },
  { 
    path: 'menu',
    component: MenuComponent,
    data: { 
      pageTitle: 'Food',
    }
    //loadChildren: () => import('./pages/menu/menu.module').then((module) => module.MenuModule)
  },
  {
    path: 'specials',
    component: MenuComponent,
    data: { 
      pageTitle: 'Food',
    }
  },
  {
    path: 'find-us',
    component: FindUsComponent,
    data: { 
      pageTitle: 'Find Us',
    }
  },
  {
    path: 'tour',
    component: TourComponent,
    data: { 
      pageTitle: 'Tour',
    }
  },
  {
    path: 'boat-cam',
    component: ConstructionComponent,
    data: { 
      pageTitle: 'Boat Cam',
    }
  },
  {
    path: 'games',
    component: ConstructionComponent,
    data: { 
      pageTitle: 'Games',
    }
  },
  {
    path: 'dive-shop',
    component: ConstructionComponent,
    data: { 
      pageTitle: 'Dive Shop',
    }
  },
  {
    path: 'padi-club',
    component: ConstructionComponent,
    data: { 
      pageTitle: 'P.A.D.I. Club',
    }
  },
  {
    path: 'sightings',
    component: ConstructionComponent,
    data: { 
      pageTitle: 'Sightings',
    }
  },
  {
    path: 'party',
    component: PrivatePartiesComponent,
    data: { 
      pageTitle: 'Private Parties',
    }
  },
  {
    path: 'about-us',
    component: ConstructionComponent,
    data: { 
      pageTitle: 'About Us',
    }
  },
  {
    path: 'news',
    component: ConstructionComponent,
    data: { 
      pageTitle: 'News',
    }
  },
  {
    path: 'jobs',
    component: ConstructionComponent,
    data: { 
      pageTitle: 'Jobs',
    }
  },
  {
    path: 'partnerships',
    component: ConstructionComponent,
    data: { 
      pageTitle: 'Partnerships',
    }
  },
  {
    path: 'site-info',
    component: ConstructionComponent,
    data: { 
      pageTitle: 'Site Info',
    }
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];


@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      scrollPositionRestoration: 'enabled',
      //anchorScrolling: 'enabled', // WARNING: this can break smooth scrolling
      scrollOffset: [0, 64], // x, y px
      onSameUrlNavigation: 'reload', // scroll to url fragment on repeat clicks
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
