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
        const query = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
            'restaurant.json?' +
            'proximity=' + this.userlng + ',' + this.userlat +
            '&limit=10' +
            '&access_token=' + environment.mapbox.accessToken;
        console.log(this.userlng + '-+' + this.userlat);
        return this.http.get(query).toPromise();
    }

    todaysRestaurant() {
        const response = this.makeCall();
        response.then((res: any) => {
            const random = Math.floor(Math.random() * res.features.length);
            this.restaurantDetails.next(res.features[random]);
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
    moveALittle() {
        // tslint:disable-next-line: one-variable-per-declaration
        const earth = 6378.137,  // radius of the earth in kilometer
            pi = Math.PI,
            m = (1 / ((2 * pi / 360) * earth)) / 1000;  // 1 meter in degree

        const newlatitude = this.userlat + (100 * m);
        const newlongitude = this.userlng + (100 * m) / Math.cos(this.userlng * (pi / 180));

        this.setUserCoord(newlatitude, newlongitude);
    }

}
