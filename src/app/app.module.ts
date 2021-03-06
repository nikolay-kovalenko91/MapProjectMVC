import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from "@angular/http";

import { AppComponent }  from './app.component';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {GmapComponent} from "./components/g-map/g-map.component";
import {SearchRepresentComponent} from "./components/search-represent/search-represent.component";
import {HelpSpoilerComponent} from "./components/help-spoiler/help-spoiler.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {PlaceInfoSpoilerComponent} from "./components/place-info-spoiler/place-info-spoiler.component";
import {FoundedRoutesSpoilerComponent} from "./components/founded-routes-spoiler/founded-routes-spoiler.component";
import {routing} from "./app.routing";
import {CategoryViewerComponent} from "./components/category-viewer/category-viewer.component";

@NgModule({
    imports:      [
        BrowserModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        NavbarComponent,
        GmapComponent,
        SearchRepresentComponent,
        HelpSpoilerComponent,
        SidebarComponent,
        PlaceInfoSpoilerComponent,
        FoundedRoutesSpoilerComponent,
        CategoryViewerComponent
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
