import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

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
  @Input() background = 'white';
  @Output() emitValue = new EventEmitter<unknown>();
  constructor() {
    console.log(this.value);
  }

  ngOnInit() {}
}
