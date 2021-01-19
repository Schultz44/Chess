import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImageSvgModule } from 'src/shared/components/image-svg/image-svg.module';
import { BoardComponent } from './board.component';
import { BoardRoutes } from './board.routing';

@NgModule({
    imports: [CommonModule, ImageSvgModule, BoardRoutes],
    declarations: [
        BoardComponent
    ],
    exports: [BoardComponent],
    providers: []
})
export class BoardModule { }
