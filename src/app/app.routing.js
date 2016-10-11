"use strict";
var router_1 = require("@angular/router");
var category_viewer_component_1 = require("./components/category-viewer/category-viewer.component");
var search_represent_component_1 = require("./components/search-represent/search-represent.component");
var appRoutes = [
    {
        path: 'category/:id',
        component: category_viewer_component_1.CategoryViewerComponent
    },
    {
        path: '',
        component: search_represent_component_1.SearchRepresentComponent
    },
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map