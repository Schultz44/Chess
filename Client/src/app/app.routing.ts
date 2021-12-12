import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'lobby',
    pathMatch: 'prefix',
    loadChildren: () =>
      import('./pages/lobby/lobby.module').then((m) => m.LobbyModule),
  },
  {
    path: 'login',
    pathMatch: 'prefix',
    loadChildren: () =>
      import('./pages/login-page/login-page.module').then(
        (m) => m.LoginPageModule
      ),
  },
  {
    path: 'game',
    pathMatch: 'prefix',
    loadChildren: () =>
      import('./pages/board/board.module').then((m) => m.BoardModule),
  },
  {
    path: '**',
    pathMatch: 'prefix',
    redirectTo: 'login',
  },
];

export const AppRoutes = RouterModule.forRoot(routes);
