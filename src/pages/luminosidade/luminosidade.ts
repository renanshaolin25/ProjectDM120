import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Dweet } from '../../models/dweet';
import { DweetSettingsEnum } from '../../enum/DweetSettingsEnum';
import { DweetServiceProvider } from '../../providers/dweet-service/dweet-service';

/**
 * Generated class for the LuminosidadePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-luminosidade',
  templateUrl: 'luminosidade.html',
})
export class LuminosidadePage {

  private thingName: any;
  private dweet: Dweet;
  private isLoading: boolean = true;
  private time: any;
  private dataPlot: Array<any>;
  options: Object;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private dweetService: DweetServiceProvider) {
    this.time = setInterval(() => { this.getLastDweet() }, 3000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LuminosidadePage');
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
    this.loadDataForPlot(this.dweet);
    this.plotChat();
  }

  loadDataForPlot(dweet: Dweet) {
    for (let _with of dweet.with) {
      let epoch = new Date(_with.created).getTime();
      this.dataPlot.push([epoch, _with.content.getLuminosidade()]);
    }
  }

  ngOnInit() {
    this.thingName = DweetSettingsEnum.DWEET_THING_NAME;
    this.getLastDweet();
  }

  ngOnDestroy() {
    this.thingName = DweetSettingsEnum.DWEET_THING_NAME;
    clearInterval(this.time);
  }

  plotChat() {
    this.options = {
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        labels: {
          formatter: function () {
            return this.value + 'lux';
          }
        },
      },
      title: { text: 'luminosidade' },
      series: [{
        name: 'luminosidade',
        data: this.dataPlot.reverse(),
        pointInterval: 60 * 60
      }]
    };
  }

}
