import { Component, OnInit, ViewChild } from '@angular/core';
import { } from 'googlemaps';
import { GetResDataService } from 'src/app/Services/get-res-data.service';
@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
    userLongitude;
    userLatitude;
    constructor(private GetResService: GetResDataService) { }
    @ViewChild('map') mapElement: any;
    map: google.maps.Map;

    ngOnInit() {
        /*         this.getPosition().then(pos => {
                    this.userLongitude = pos.lng;
                    this.userLatitude = pos.lat;
                }); */
        // this.activateMap();
        this.makePlacesRequest();
    }

    makePlacesRequest() {
        const request = {
            location: { lat: 57.7820819, lng: 14.1742995 },
            radius: 8000,
            types: ['restaurant']
        };
        const service = new google.maps.places.PlacesService(document.createElement('div'));
        service.nearbySearch(request, (data, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                data.forEach(res => console.log(res));
                const tempResDetails = data[Math.floor(Math.random() * data.length)];
                let resDetails: any;
                resDetails = {
                    name: tempResDetails.name,
                    rating: tempResDetails.rating,
                    vicinity: tempResDetails.vicinity,
                    isOPenNow: tempResDetails.opening_hours.open_now
                };
                this.GetResService.setData(resDetails);
            }

        });

    }

    getPosition(): Promise<any> {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resp => {
                resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
            },
                err => {
                    reject(err);
                });
        });

    }
}
