import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { 
    path: '',
    pathMatch: 'prefix',
    loadChildren: () => import('./lobby/lobby.module').then(m => m.LobbyModule)
   },
  { 
    path: 'game',
    pathMatch: 'prefix',
    loadChildren: () => import('./board/board.module').then(m => m.BoardModule)
   },
];

export const AppRoutes = RouterModule.forRoot(routes);
