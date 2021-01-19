import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobbyComponent } from './lobby.component';
import { LobbyRoutes } from './lobby.routing';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    LobbyRoutes,
    FormsModule
  ],
  declarations: [LobbyComponent]
})
export class LobbyModule { }
