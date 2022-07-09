import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-basic-input',
  templateUrl: './basic-input.component.html',
  styleUrls: ['./basic-input.component.scss'],
})
export class BasicInputComponent implements OnInit {
  @Input() label: '';
  @Input() type: 'text';
  @Input() value: unknown;
  @Input() optional = false;
  @Input() max = 20;
  @Input() width: string;
  @Input() background = 'white';
  @Input() borderColor = 'black';
  @Output() emitValue = new EventEmitter<unknown>();
  constructor() {
    null;
  }

  ngOnInit(): void {
    console.log(this.width);
    null;
  }
}
