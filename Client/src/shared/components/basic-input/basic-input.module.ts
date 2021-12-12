import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicInputComponent } from './basic-input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [BasicInputComponent],
  exports: [BasicInputComponent],
})
export class BasicInputModule {}
