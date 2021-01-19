import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageSvgComponent } from './image-svg.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ImageSvgComponent],
  exports: [ImageSvgComponent]
})
export class ImageSvgModule { }
