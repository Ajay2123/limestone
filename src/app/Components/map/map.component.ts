import { Component, OnInit, ViewChild } from '@angular/core';
import { GetResDataService } from 'src/app/Services/get-res-data.service';
import { environment } from '../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { HttpClient } from '@angular/common/http';
import { MapApiService } from 'src/app/Services/map-api.service';
@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
    constructor(private http: HttpClient, private mapApiService: MapApiService, private getResDataService: GetResDataService) {
        this.coordinates = this.mapApiService.getUserCoord();
    }
    map: mapboxgl.Map;
    coordinates: any;
    marker = new mapboxgl.Marker({ color: '#008000' });
    restaurant = new mapboxgl.Marker({ color: '#dd1021' });
    setLocationMarker = (cord, marker) => marker.setLngLat(cord).addTo(this.map);
    makeApiRequest = () => this.mapApiService.todaysRestaurant();
    ngOnInit() {
        this.addMap();
        this.mapApiService.coorUpdated.subscribe(() => this.coordinates = this.mapApiService.getUserCoord());
        this.mapApiService.restaurantDetails.subscribe((res) => this.showMagicRestaurant(res));
    }

    addMap() {
        Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken').set(environment.mapbox.accessToken);
        this.map = new mapboxgl.Map({
            container: 'map',
            zoom: 15,
            center: [this.coordinates.lng, this.coordinates.lat]
        });
        this.map.addControl(new mapboxgl.NavigationControl());
        this.map.setStyle('mapbox://styles/ajay21/ck1lwi3hl01kp1dpomcl5507r');

        this.map.on('load', () => {


            this.setLocationMarker([this.coordinates.lng, this.coordinates.lat], this.marker);
            const geocoder = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl,
                zoom: 15,
                placeholder: 'Enter an address or place name',
            });
            document.getElementById('geocoder').appendChild(geocoder.onAdd(this.map));
            geocoder.on('result', (data) => this.queryResponse(data.result.center));
        });
        this.makeApiRequest();
    }

    queryResponse(coord) {
        // tslint:disable-next-line: one-variable-per-declaration
        const queryLongitude = coord[0], queryLatitude = coord[1];
        this.mapApiService.setUserCoord(queryLatitude, queryLongitude);
        this.setLocationMarker(coord, this.marker);
        this.makeApiRequest();
    }

    showMagicRestaurant(res) {
        const restaurantName = res.place_name.split(',')[0].toUpperCase();
        this.setLocationMarker(res.center, this.restaurant);
        this.getResDataService.setData(restaurantName);
    }
}
