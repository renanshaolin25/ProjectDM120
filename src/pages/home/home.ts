import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { TemperaturaPage } from '../temperatura/temperatura';
import { LuminosidadePage } from '../luminosidade/luminosidade';
import { Dweet } from '../../models/dweet';
import { DweetServiceProvider } from '../../providers/dweet-service/dweet-service';
import { DweetSettingsEnum } from '../../enum/DweetSettingsEnum';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {

  private thingName: any;
  private thingName2: any;
  private dweet: Dweet;
  private isLoading: boolean = true;
  private time: any;
  private dataPlot: Array<any>;
  options: Object;

  constructor(public navCtrl: NavController, private dweetService: DweetServiceProvider) {
    this.time = setInterval(() => { this.getLastDweet() }, 3000);
  }

  goToTempPage(){
    this.navCtrl.push(TemperaturaPage);
  }

  goToLumPage(){
    this.navCtrl.push(LuminosidadePage);
  }

  private getLastDweet() {
    this.dataPlot = [];
    this.dweetService.loadLastDweets(this.thingName).subscribe(
      data => this.preencherDweet(data),
      err => console.log(),
      () => this.isLoading = false
    );
  }

  private preencherDweet(data: any) {
    this.dweet = this.dweetService.preencherDweet(data);
    console.log(this.dweet.with[0].content);
  }

  ngOnInit() {
    this.thingName = DweetSettingsEnum.DWEET_THING_NAME;
    this.thingName2 = DweetSettingsEnum.DWEET_THING_NAME2;
    this.getLastDweet();
  }

  ngOnDestroy() {
    this.thingName = DweetSettingsEnum.DWEET_THING_NAME;
    clearInterval(this.time);
  }

ativaAlarme(){
  this.dweetService.updateDweet(this.thingName2, 1).subscribe();
}

desativaAlarme(){
  this.dweetService.updateDweet(this.thingName2, 0).subscribe();
}

}
