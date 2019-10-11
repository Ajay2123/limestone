import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class GetResDataService {
    private dataPath = '../../assets/Jsons/restaurants.json';
    dataList = '';

    dataUpdated: Subject<any> = new Subject<any>();
    constructor(private httpService: HttpClient) { }

    private loadData() {
        return this.httpService.get(this.dataPath).toPromise();
    }
    public getData() {
        return this.loadData();
    }
    public getApiResponse() {
        return this.dataList;
    }
    public setData(res: any) {
        this.dataList = res;
        this.dataUpdated.next(this.dataList);
    }
}