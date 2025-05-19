import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { IHashNumber } from 'src/shared/models/hash';
import { IToaster } from 'src/shared/models/toaster';

@Component({
    selector: 'app-custom-toaster',
    animations: [
        trigger('state', [
            state('open', style({ transform: 'translateY(0%)' })),
            state('void, close', style({ transform: 'translateY(100%)', opacity: 0 })),
            transition('* => *', animate('300ms ease-in')),
        ]),
    ],
    template: `
    <div
      *ngFor="let toaster of toasters; let i = index"
      class="toaster {{ toaster.toaster.type }}"
      (click)="close(i)"
    >
      <span class="title">{{ toaster.toaster.title }}</span>
      <span class="message">{{ toaster.toaster.message }}</span>
    </div>
  `,
    styleUrls: ['./toaster.component.scss'],
    standalone: false
})
export class ToasterComponent {
  @HostBinding('state')
  state: 'open' | 'close';
  index = -1;
  private _toaster: IToaster;
  timers = new Map<number, any>();
  toasters: Array<{ id: number; toaster: IToaster }> = [];
  @Input()
  public get toaster(): IToaster {
    return this._toaster;
  }
  public set toaster(value: IToaster) {
    this.index++;
    this._toaster = value;
    this.toasters.push({ id: this.index, toaster: this._toaster });
    this.autoClose(this.index);
  }

  autoClose(index: number): void {
    const timer = setTimeout(() => {
      const remove = this.toasters.findIndex((i) => i.id == index);
      if (remove > -1) {
        const toaster = document.body.getElementsByTagName('app-toaster')[0];
        toaster.removeChild(toaster.children[remove]);
        this.toasters.splice(remove, 1);
      }
    }, 5000);
    this.timers.set(index, timer);
  }

  close(index: number): void {
    const toaster = document.body.getElementsByTagName('app-toaster')[0];
    toaster.removeChild(toaster.children[index]);
    this.toasters.splice(index, 1);
    clearTimeout(this.timers.get(index));
  }
}
