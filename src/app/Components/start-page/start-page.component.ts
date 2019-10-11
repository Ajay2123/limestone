import { Component, OnInit, NgModule } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { GetResDataService } from 'src/app/Services/get-res-data.service';
import { MapApiService } from 'src/app/Services/map-api.service';

@NgModule({
    imports: [
        MaterialModule,
    ]
})
@Component({
    selector: 'app-start-page',
    templateUrl: './start-page.component.html',
    styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {
    currentRestaurantName: string;
    didReceiveGoogleResponse: boolean;
    currentRestaurantDetails: any;
    makeApiRequest = () => this.mapApiService.todaysRestaurant();

    constructor(private getResData: GetResDataService, private mapApiService: MapApiService) {
        this.didReceiveGoogleResponse = false;
    }

    ngOnInit() {
        this.generateNewRestaurant();
        this.getResData.dataUpdated.subscribe(res => {
            if (res !== '') {
                this.currentRestaurantName = res;
            }
        }
        );
    }

    generateNewRestaurant() {
        this.makeApiRequest();
        const res = this.getResData.getApiResponse();
        this.currentRestaurantName = res;

    }

}
