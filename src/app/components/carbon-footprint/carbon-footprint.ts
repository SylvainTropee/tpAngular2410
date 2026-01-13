import {Component} from '@angular/core';
import {CarbonFootprintForm} from '../carbon-footprint-form/carbon-footprint-form';
import {CarbonFootprintResult} from '../carbon-footprint-result/carbon-footprint-result';
import {DecimalPipe, NgClass, NgStyle} from '@angular/common';

@Component({
  selector: 'app-carbon-footprint',
  imports: [
    CarbonFootprintForm,
    CarbonFootprintResult,
    NgStyle,
    NgClass,
    DecimalPipe
  ],
  templateUrl: './carbon-footprint.html',
  styleUrl: './carbon-footprint.css',
  standalone: true
})
export class CarbonFootprint {

  public readonly MAX_CONSUMPTION: number = 7;
  public readonly MIN_CONSUMPTION: number = 4;

  public distance: number;
  public consumptionPer100: number;

  public travels: { distance: number, consumptionPer100: number }[];// Array<{distance : number, consumptionPer100 : number}>

  constructor() {
    this.distance = 20;
    this.consumptionPer100 = 5;

    this.travels = [];
    this.travels.push({distance: 50, consumptionPer100: 5});
    this.travels.push({distance: 150, consumptionPer100: 6});
    this.travels.push({distance: 250, consumptionPer100: 7});
    this.travels.push({distance: 350, consumptionPer100: 8});
    this.travels.push({distance: 450, consumptionPer100: 9});

    this.calculateDistanceAndConsumptionAverage()
  }

  add100km() {
    this.distance += 100;
  }

  addTravel() {
    const distance = Math.round(Math.random() * 1000);
    const consumption = Math.round(Math.random() * 10);
    this.travels.push({distance: distance, consumptionPer100: consumption});
    this.calculateDistanceAndConsumptionAverage()
  }

  private calculateDistanceAndConsumptionAverage() {

    let totalDistance = 0;
    let totalConsumption = 0;

    for (const travel of this.travels) {
      totalDistance += travel.distance;
      totalConsumption += travel.consumptionPer100;
    }

    this.distance = totalDistance;
    this.consumptionPer100 = totalConsumption / this.travels.length;
  }


}
