import { Component } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  name = "fake";
  place = "faker";
  time = "fakest";
  status = "not done";
}
