import { Injectable } from '@angular/core';
import { NgElement, WithProperties } from '@angular/elements';
import { IEnumToaster, IToaster } from 'src/shared/models/toaster';
import { ToasterComponent } from './toaster.component';

@Injectable()
export class ToasterService {
  showError(message: string, title = 'Error'): void {
    const popup = this.show();
    popup.toaster = {
      title: title,
      message: message,
      type: IEnumToaster.error,
    } as IToaster;
    document.body.appendChild(popup);
  }
  showInfo(message: string, title = 'Info'): void {
    const popup = this.show();
    popup.toaster = {
      title: title,
      message: message,
      type: IEnumToaster.info,
    } as IToaster;
    document.body.appendChild(popup);
  }
  showWarning(message: string, title = 'Warning'): void {
    const popup = this.show();
    popup.toaster = {
      title: title,
      message: message,
      type: IEnumToaster.warning,
    } as IToaster;
    document.body.appendChild(popup);
  }
  showSuccess(message: string, title = 'Success'): void {
    const popup = this.show();
    popup.toaster = {
      title: title,
      message: message,
      type: IEnumToaster.success,
    } as IToaster;
    document.body.appendChild(popup);
  }
  show(): NgElement & WithProperties<ToasterComponent> {
    let popup;
    if (document.getElementsByTagName('app-toaster')[0]) {
      popup = document.getElementsByTagName('app-toaster')[0];
    } else
      popup = document.createElement('app-toaster') as NgElement &
        WithProperties<ToasterComponent>;
    // const p = document.getElementsByTagName('app-toaster')[0]
    // const popup = document.createElement('app-toaster') as NgElement &
    //   WithProperties<ToasterComponent>;

    // popup.addEventListener('close', (event) => {
    //   console.log(event.detail);

    //   const toaster = document.body.getElementsByTagName('app-toaster')[0];
    //   // console.log(toaster.children);
    //   // event.stopPropagation();
    //   // toaster.removeChild(toaster.children[event.detail]);
    //   // document.body.removeChild(popup);
    // });
    return popup;
  }
}
