import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { TableComponent } from './components/table/table.component';
import { BigBtnComponent } from './components/big-btn/big-btn.component';
import { SplitComponent } from './components/split/split.component';
import { InfoComponent } from './components/split/info/info.component';
import { CreateComponent } from './components/split/create/create.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateLocationComponent } from './components/split/create-location/create-location.component';
import { ButtonComponent } from './components/split/create-location/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    TableComponent,
    BigBtnComponent,
    SplitComponent,
    InfoComponent,
    CreateComponent,
    CreateLocationComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
