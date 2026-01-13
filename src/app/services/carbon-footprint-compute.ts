import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarbonFootprintCompute {

  public travels: { distance: number, consumptionPer100: number, quantityCo2: number }[];

  constructor() {

    this.travels = [];
    this.travels.push({distance: 50, consumptionPer100: 5, quantityCo2: 10});
    this.travels.push({distance: 150, consumptionPer100: 6, quantityCo2: 250});
    this.travels.push({distance: 250, consumptionPer100: 7, quantityCo2: 8});
    this.travels.push({distance: 350, consumptionPer100: 8, quantityCo2: 17});
    this.travels.push({distance: 450, consumptionPer100: 9, quantityCo2: 86});

  }

  getTravels() {
    return this.travels;
  }

  addTravel(travel: any) {
    this.travels.push(travel);
  }

  getQuantityCo2ByTravel(distance: number, consumptionPer100: number) {
    return distance * consumptionPer100 / 100 * 2.3
  }

  getResumeTravels() {
    let totalDistance = 0;
    let totalConsumption = 0;
    let totaleCo2 = 0;

    for (const travel of this.travels) {
      totalDistance += travel.distance;
      totalConsumption += travel.consumptionPer100;
      totaleCo2 += travel.quantityCo2;
    }

    return {
      totalDistance: totalDistance,
      consumptionPer100: totalConsumption / this.travels.length,
      quantityCo2: totaleCo2
    }

  }


}
