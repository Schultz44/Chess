import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobbyComponent } from './lobby.component';
import { LobbyRoutes } from './lobby.routing';
import { FormsModule } from '@angular/forms';
import { BoardModule } from '../board/board.module';
import { BasicInputModule } from 'src/shared/components/basic-input/basic-input.module';
import { IconButtonModule } from 'src/shared/components/icon-button/icon-button.module';

@NgModule({
  imports: [
    CommonModule,
    LobbyRoutes,
    FormsModule,
    BoardModule,
    BasicInputModule,
    IconButtonModule,
  ],
  declarations: [LobbyComponent],
})
export class LobbyModule {}
