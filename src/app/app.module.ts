import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from "@angular/http";

import { AppComponent }  from './app.component';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {GmapComponent} from "./components/g-map/g-map.component";
import {SearchRepresentComponent} from "./components/search-represent/search-represent.component";
import {HelpSpoilerComponent} from "./components/help-spoiler/help-spoiler.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";

@NgModule({
    imports:      [
        BrowserModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        NavbarComponent,
        GmapComponent,
        SearchRepresentComponent,
        HelpSpoilerComponent,
        SidebarComponent
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
