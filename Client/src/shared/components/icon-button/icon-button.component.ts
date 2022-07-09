import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameService } from 'src/shared/services/game.service';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
})
export class IconButtonComponent implements OnInit {
  get isClicked(): boolean {
    return this.gameService.buttonHash['lobbyNewGame'];
  }
  @Input() set isClicked(value: boolean) {
    this.gameService.buttonHash['lobbyNewGame'] = value;
  }
  @Output() emitClicked = new EventEmitter<boolean>();
  gameService: GameService;
  constructor(private _gameService: GameService) {
    this.gameService = _gameService;
    this.isClicked = _gameService.buttonHash['lobbyNewGame'];
  }

  ngOnInit(): void {
    null;
  }
}
