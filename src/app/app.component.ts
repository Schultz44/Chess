import { Component } from '@angular/core';
import { WebsocketService } from 'src/shared/services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Chess';
  constructor(private _webSocketService: WebsocketService){}
  ngOnInit(){
    console.log('App');
    
    // this._webSocketService.listen('board object').subscribe(data => {
    //   console.log(data);
    //   console.log('hi');
      
    //   // this._webSocketService.emit('board object', {})
    // })
  }
}
