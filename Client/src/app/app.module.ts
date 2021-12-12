import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardModule } from './pages/board/board.module';
import { AppRoutes } from './app.routing';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BoardModule, AppRoutes],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
