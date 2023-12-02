import { Component } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  
  isValidUrl(url: string): boolean {
    // You can implement a more sophisticated URL validation logic if needed
    return url !== undefined && url !== null && url.trim() !== '';
  }
  
  
  name = "fake";
  place = "faker";
  time = "fakest";
  status = "not done";
  repName = "me";
  repNum = "111-111-1111"
  imageUrl = 'https://cdn.discordapp.com/attachments/915109044715409448/1178145954487078912/image.png?ex=657514ec&is=65629fec&hm=911824989b70b2154cba62c958bc661657f217d0adfaff40467ca96a5064a4e9&'
}
