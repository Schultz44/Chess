import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardModule } from './pages/board/board.module';
import { AppRoutes } from './app.routing';
import { ToasterComponent } from 'src/shared/components/toasters/toaster.component';
import { ToasterService } from 'src/shared/components/toasters/toaster.service';

@NgModule({
  declarations: [AppComponent, ToasterComponent],
  imports: [BrowserModule, BoardModule, AppRoutes, BrowserAnimationsModule],
  providers: [ToasterService],
  bootstrap: [AppComponent],
})
export class AppModule {}
