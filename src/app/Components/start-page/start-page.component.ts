import { Component, OnInit, NgModule } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { GetResDataService } from 'src/app/Services/get-res-data.service';
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
    constructor(private getResData: GetResDataService) {
        this.didReceiveGoogleResponse = false;
    }

    ngOnInit() {
        this.generateNewRestaurant();
        this.getResData.dataUpdated.subscribe(data => {
            console.log("Received From service", data);
            this.currentRestaurantDetails = data;
            this.currentRestaurantName = data.name;
            console.log("currentRestaurantDetails From service", this.currentRestaurantDetails);
            this.didReceiveGoogleResponse = true;


        }
        );
    }

    generateNewRestaurant() {
        this.getResData.getData().then((data: any) => {
            this.currentRestaurantName = 'vox hotel';
            const resList = data['res'];
            this.currentRestaurantName = resList[Math.floor(Math.random() * resList.length)].toUpperCase();
        });
    }

}
