import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MapApiService {
    coorUpdated: Subject<any> = new Subject<any>();
    userlat = 57.7820791;
    userlng = 14.1742995;
    restaurantDetails: Subject<any> = new Subject<any>();
    constructor(private http: HttpClient) { }

    makeCall() {
        const foodType = ['food', 'restaurant',
            'burger', 'pizza', 'pizza',
            'indian food', 'asian food'
        ];
        const randomCategory = Math.floor(Math.random() * foodType.length);
        const category = foodType[randomCategory];
        const bbox = this.getBoundsFromLatLng(this.userlat, this.userlng);
        const query = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
            'food ' + category + '.json?' +
            'proximity=' + this.userlng + ',' + this.userlat +
            '&limit=10' +
            '&bbox=' + bbox +
            '&access_token=' + environment.mapbox.accessToken;
        return this.http.get(query).toPromise();
    }

    todaysRestaurant() {
        const response = this.makeCall();
        response.then((res: any) => {
            const random = Math.floor(Math.random() * res.features.length);
            this.restaurantDetails.next(res.features[random]);
            console.log(res.features[random]);
        });
    }
    getUserCoord() {
        return { lat: this.userlat, lng: this.userlng };
    }
    setUserCoord(x, y) {
        this.userlat = x;
        this.userlng = y;
        this.coorUpdated.next();
    }
    getBoundsFromLatLng(lat, lng) {
        const latChange = 10 / 111.2;
        const lonChange = Math.abs(Math.cos(lat * (Math.PI / 180)));
        const bounds = '' +
            (lng - lonChange) + ',' +
            (lat - latChange) + ',' +
            (lng + lonChange) + ',' +
            (lat + latChange) + ''
        return bounds;
    }
}
