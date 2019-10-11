import { Component, OnInit, NgModule } from '@angular/core';
import { MaterialModule } from './Components/shared/material.module';

@NgModule({
    imports: [
        MaterialModule,
    ]
})
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'limestone';
    imgPath: string;

    ngOnInit() {
        this.imgPath = '../assets/images/background.jpg';
    }
}
