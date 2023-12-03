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

  //constructor(){}
  constructor(private http: HttpClient){}

  data: any[] = [];
  firstValues: any[] = [];
  resultArray: any[] = [];
  coords: any[] = [];
  incidents: any[] = [];

  ngOnInit(): void {
    this.showMap()

    this.http.get<any[]>('https://272.selfip.net/apps/t4foZFvfjT/collections/location/documents/')
      .pipe(
        map((jsonData: any[]) => {
          return jsonData.map(item => {
            const firstKey = Object.keys(item)[0]; // Extract the first key
            const firstValue = item[firstKey]; // Extract the value corresponding to the first key
            return firstValue;
          });
        })
      )
      .subscribe((valuesArray: any[]) => {
        this.firstValues = valuesArray;
        //console.log(this.firstValues);
      });

    this.http.get<any[]>('https://272.selfip.net/apps/t4foZFvfjT/collections/location/documents/')
      .pipe(
        map((jsonData: any[]) => (jsonData as any[]).map(item => item.data))
      )
      .subscribe((dataArray: any[]) => {
        this.data = dataArray;
        //console.log(this.data);
        for (let j = 0; j < this.data.length; j++) {
          let newArray = [ this.firstValues[j]];
          for(let k=0; k<this.data[j].length; k++){
            newArray.push(this.data[j][k]);
            //console.log("this.data[j][k]");
          }
          this.resultArray.push(newArray);
          //console.log(this.resultArray);
        }
        this.data = this.resultArray;
        //console.log(this.resultArray);
        for (let j = 0; j < this.data.length; j++) {
          let temp = [];
          temp[0] = parseFloat(this.data[j][3]);
          temp[1] = 0 - parseFloat(this.data[j][2]);
          this.coords[j] = temp;
          this.incidents[j] = parseInt(this.data[j][4]);
        }
        //console.log(this.coords);
        //console.log(this.incidents)
        this.putLabels(this.coords, this.incidents);
        //console.log("got points");
      });



    
  }

  exampleCoordinatesArray = [
    [49.2276, -123.0076],
    [49.300054, -123.148155],
    [49.2781, -122.9199]
  ];

  numReps = [1, 2, 3];

  showMap() {
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
        .bindPopup("<b>Location</b><br />" + reps[itter] + " Nuisance reports"); // You can customize the popup content here
        itter++;
    });
    //console.log("done")
  }

}

