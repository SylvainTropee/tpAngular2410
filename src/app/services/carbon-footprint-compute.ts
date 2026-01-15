import {computed, Injectable, signal} from '@angular/core';
import {Travel} from '../models/travel';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, switchMap, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarbonFootprintCompute {

  private readonly BASE_URL = "http://localhost:8080";

  private _travels = signal<Travel[]>([])
  readonly travels = this._travels.asReadonly()

  resumeTravels = computed(() => this.getResumeTravels())

  constructor(private http: HttpClient) {

  }

  getTravels() {

    this.http.get<any[]>(`${this.BASE_URL}/tousMesVoyages/1`).pipe(
      map(
        response => {
          const travels = response.map(
            item => {
              const travel: Travel = {
                travelType: item.travelType,
                distance: item.distance,
                quantityCo2: item.co2,
                consumptionPer100: item.consommation
              }
              return travel;
            }
          )
          this._travels.set(travels)
        }
      )
    ).subscribe()

  }

  addTravel(travel: Travel) {
    console.log(travel)
    this.getQuantityCo2ByTravel(travel).pipe(
      switchMap(
        co2 => {
          const data =
            {
              userId: 1,
              distance: travel.distance,
              consommation: travel.consumptionPer100,
              co2: co2,
              travelType:travel.travelType
            }
          return this.http.post(`${this.BASE_URL}/ajouterUnVoyage`, data)
        }
      ),
      tap(
        () => {
          this.getTravels()
        }
      )
    ).subscribe()

  }

  getQuantityCo2ByTravel(travel: Travel) {
    switch (travel.travelType) {
      case 'train':
        return this.getQuantityCo2ByTrain(travel)
      case 'plane':
        return this.getQuantityCo2ByPlane(travel)
      default :
        return this.getQuantityCo2ByCar(travel)
    }
  }

  getQuantityCo2ByPlane(travel: Travel) {
    const params = new HttpParams().set('distanceKm', travel.distance)
    return this.http.get<{ empreinteCarbone: number }>(`${this.BASE_URL}/calculerTrajetAvion`, {params: params}).pipe(
      map(
        response => response.empreinteCarbone
      )
    )
  }

  getQuantityCo2ByTrain(travel: Travel) {
    const params = new HttpParams().set('distanceKm', travel.distance)
    return this.http.get<{ empreinteCarbone: number }>(`${this.BASE_URL}/calculerTrajetTrain`, {params: params}).pipe(
      map(
        response => response.empreinteCarbone
      )
    )
  }

  getQuantityCo2ByCar(travel: Travel) {
    const params = new HttpParams().set('distanceKm', travel.distance).set("consommationPour100Km", travel.consumptionPer100)
    return this.http.get<{ empreinteCarbone: number }>(`${this.BASE_URL}/calculerTrajetVoiture`, {params: params}).pipe(
      map(
        response => response.empreinteCarbone
      )
    )
  }


  getResumeTravels() {
    let totalDistance = 0;
    let totalConsumption = 0;
    let totaleCo2 = 0;

    for (const travel of this.travels()) {
      totalDistance += travel.distance;
      totalConsumption += travel.consumptionPer100;
      totaleCo2 += travel.quantityCo2 ?? 0;
    }

    return {
      distance: totalDistance,
      consumptionPer100: totalConsumption / this._travels().length,
      quantityCo2: totaleCo2
    }

  }


}
