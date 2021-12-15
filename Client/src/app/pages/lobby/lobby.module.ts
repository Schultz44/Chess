import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobbyComponent } from './lobby.component';
import { LobbyRoutes } from './lobby.routing';
import { FormsModule } from '@angular/forms';
import { BoardModule } from '../board/board.module';

@NgModule({
  imports: [CommonModule, LobbyRoutes, FormsModule, BoardModule],
  declarations: [LobbyComponent],
})
export class LobbyModule {}
