import {Routes, RouterModule} from "@angular/router";
import {CategoryViewerComponent} from "./components/category-viewer/category-viewer.component";
import {ModuleWithProviders} from "@angular/core";
import {SearchRepresentComponent} from "./components/search-represent/search-represent.component";

const appRoutes: Routes = [
    {
        path: 'category/:id',
        component: CategoryViewerComponent
    },
    {
        path: '',
        component: SearchRepresentComponent
    },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);