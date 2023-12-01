import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-big-btn',
  templateUrl: './big-btn.component.html',
  styleUrl: './big-btn.component.css'
})
export class BigBtnComponent {
  @Output() btnClick = new EventEmitter()
  onClick(){
    this.btnClick.emit()
  }
}
