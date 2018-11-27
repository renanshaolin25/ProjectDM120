import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '../../../node_modules/@angular/core';
import { DweetSettingsEnum } from '../../enum/DweetSettingsEnum';
import { Dweet } from '../../models/dweet';
import { With } from '../../models/with';
import { Content } from '../../models/content';
import 'rxjs/add/operator/map';


@Injectable()
export class DweetServiceProvider {

    private dweetioApiUrl = DweetSettingsEnum.DWEET_URL_GET_ALL;
    private dweetioApiUrl2 = DweetSettingsEnum.DWEET_URL_POST;


    constructor(public http: HttpClient) {
        console.log('Hello Dweet Privider');
    }

    updateDweet(thingName: string, v: any) {
        return this.http.post(this.dweetioApiUrl2 + thingName, {
            "buzzer": v
        });
    }

    loadLastDweets(thingName: string) {
        return this.http.get(this.dweetioApiUrl + thingName);
    }

    preencherDweet(data: any){

        let dweet: Dweet;
        let _withs: Array<With>;
        let _date: string;
        let _time: string;

        _withs = new Array<With>();

        for(let _with of data.with){

            let tempContent: Content;
            tempContent = new Content(_with.content.temperatura, _with.content.Luminosidade, _with.content.Touch, _with.content.Status);

            _date = this.formatDate(_with.created);
            _time = this.formatTime(_with.created);

            let tempWith: With;
            tempWith = new With(_with.thing, _with.created, tempContent, _date, _time);

            _withs.push(tempWith);
        }

        dweet = new Dweet(data.this, data.by, data.the, _withs);

        return dweet;
    }

    private formatDate(data: any): string{
        let originalDate: string = data;
        var dateParse = originalDate.slice(0,10);
        return dateParse;
    }

    
    private formatTime(data: any): string{
        let originalDate: string = data;
        var timeParse = originalDate.slice(11,19);
        return timeParse;
    }

}