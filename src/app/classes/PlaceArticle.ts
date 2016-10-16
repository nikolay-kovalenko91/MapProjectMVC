export class PlaceArticle {
    id: number;
    title: string;
    category: number;
    tripadviserUrl: string;
    imageUrl: string;
    description: string;
    place: {
        wifi: {
            count: number;
        },
        cells: {
            count: number;
        }, 
        rates: {
            1: number;
            2: number;
            3: number;
            4: number;
            5: number;
            6: number;
        },
        workPlaces: {
            count: number;
        }, 
        apartments: {
            count: number;
        },
        aeroports: {
            count: number;
        }, 
        busStops: {
            count: number;
        },
        railwayStops: {
            count: number;
        },
        sights: {
            count: number;
        },
        tours: {
            count: number;
        },
        guides: {
            count: number;
        },
        shops: {
            count: number;
        };
        users: {
            count: number;
        };
    }
}