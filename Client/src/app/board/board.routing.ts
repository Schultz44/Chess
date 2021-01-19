import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './board.component';

const routes: Routes = [
  { 
    path: 'game',
    component: BoardComponent
   },
];

export const BoardRoutes = RouterModule.forChild(routes);
