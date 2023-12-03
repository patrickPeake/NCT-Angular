import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { map } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})

export class MapComponent implements OnInit {
  private map!: L.Map
  constructor(private http: HttpClient){}

  data: any[] = [];
  firstValues: any[] = [];
  resultArray: any[] = [];
  coords: any[] = [];
  incidents: any[] = [];
  names: any[] = [];

  ngOnInit(): void {
    this.showMap()

    this.http.get<any[]>('https://272.selfip.net/apps/t4foZFvfjT/collections/location/documents/') //extract the keys from each entry
      .pipe(
        map((jsonData: any[]) => {
          return jsonData.map(item => {
            const firstKey = Object.keys(item)[0];
            const firstValue = item[firstKey];
            return firstValue;
          });
        })
      )
      .subscribe((valuesArray: any[]) => {
        this.firstValues = valuesArray;
      });

    this.http.get<any[]>('https://272.selfip.net/apps/t4foZFvfjT/collections/location/documents/') //extract all the data from each entry
      .pipe(
        map((jsonData: any[]) => (jsonData as any[]).map(item => item.data))
      )
      .subscribe((dataArray: any[]) => {
        this.data = dataArray;
        for (let j = 0; j < this.data.length; j++) { //combine into one array with the key as the first value and the data as the 1..n values
          let newArray = [ this.firstValues[j]];
          for(let k=0; k<this.data[j].length; k++){
            newArray.push(this.data[j][k]);
          }
          this.resultArray.push(newArray);
        }
        this.data = this.resultArray;
        for (let j = 0; j < this.data.length; j++) {  //populate the arrays for the marker values from the data extracted from the api
          let temp = [];
          this.names[j] = this.data[j][1];
          temp[0] = parseFloat(this.data[j][3]);
          temp[1] = 0 - parseFloat(this.data[j][2]);
          this.coords[j] = temp;
          this.incidents[j] = parseInt(this.data[j][4]);
        }
        this.putLabels(this.coords, this.incidents);
      });
  }

  showMap() { //pretty sure I took this unedited from the leaflet example code
    this.map = L.map('mapid').setView([49.27, -123], 11);

    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ',

    }).addTo(this.map);
  }

  putLabels(coordinatesArray: any[], reps: any[]) {
    let itter: number = 0;
    coordinatesArray.forEach((coordinates: L.LatLngExpression) => {
      // Create a marker for each set of coordinates and add it to the map
      L.marker(coordinates)
        .addTo(this.map)
        .bindPopup("<b>" + this.names[itter] + "</b><br />" + reps[itter] + " Nuisance reports");
        itter++;
    });
  }

}

