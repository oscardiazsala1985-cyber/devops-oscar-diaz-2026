import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'mf1',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: '/mf1/remoteEntry.js',
        exposedModule: './Component'
      }).then(m => m.App)
  }
];
