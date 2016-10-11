"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var CategoryViewerComponent = (function () {
    function CategoryViewerComponent() {
        this.placeArticles = [
            {
                id: 0,
                title: 'Berlin',
                category: 1,
                imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/03/9b/2d/b5/berlin.jpg',
                tripadviserUrl: 'https://www.tripadvisor.ru',
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                place: {
                    wifi: {
                        count: 123,
                    },
                    cells: {
                        count: 5,
                    },
                    workPlaces: {
                        count: 5,
                    },
                    apartments: {
                        count: 21,
                    },
                    aeroports: {
                        count: 2,
                    },
                    busStops: {
                        count: 23,
                    },
                    railwayStops: {
                        count: 12,
                    },
                    shops: {
                        count: 90,
                    },
                    rates: {
                        1: 5.0,
                        2: 3.5,
                        3: 4.2,
                        4: 3.8,
                        5: 2.5,
                        6: 1.3
                    },
                    sights: {
                        count: 23,
                    },
                    tours: {
                        count: 43,
                    },
                    guides: {
                        count: 22,
                    },
                    shops: {
                        count: 22,
                    },
                    users: {
                        count: 22,
                    }
                }
            },
            {
                id: 1,
                title: 'Reichstag',
                category: 1,
                imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-w/01/e3/2d/15/bundestag.jpg',
                tripadviserUrl: 'https://www.tripadvisor.ru',
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                place: {
                    wifi: {
                        count: 123,
                    },
                    cells: {
                        count: 5,
                    },
                    workPlaces: {
                        count: 5,
                    },
                    apartments: {
                        count: 21,
                    },
                    aeroports: {
                        count: 2,
                    },
                    busStops: {
                        count: 23,
                    },
                    railwayStops: {
                        count: 12,
                    },
                    shops: {
                        count: 90,
                    },
                    rates: {
                        1: 4.8,
                        2: 3.2,
                        3: 2.2,
                        4: 2.3,
                        5: 3.8,
                        6: 3.2,
                    },
                    sights: {
                        count: 23,
                    },
                    tours: {
                        count: 43,
                    },
                    guides: {
                        count: 22,
                    },
                    shops: {
                        count: 22,
                    },
                    users: {
                        count: 22,
                    }
                }
            }
        ];
    }
    CategoryViewerComponent = __decorate([
        core_1.Component({
            selector: 'category-viewer',
            template: require('./category-viewer.component.pug'),
            styles: [require('./category-viewer.component.scss').toString()]
        }), 
        __metadata('design:paramtypes', [])
    ], CategoryViewerComponent);
    return CategoryViewerComponent;
}());
exports.CategoryViewerComponent = CategoryViewerComponent;
//# sourceMappingURL=category-viewer.component.js.map