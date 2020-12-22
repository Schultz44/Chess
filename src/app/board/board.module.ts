import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImageSvgModule } from 'src/shared/components/image-svg/image-svg.module';
import { BoardComponent } from './board.component';

@NgModule({
    imports: [CommonModule, ImageSvgModule],
    declarations: [
        BoardComponent
    ],
    exports: [BoardComponent],
    providers: []
})
export class BoardModule { }
