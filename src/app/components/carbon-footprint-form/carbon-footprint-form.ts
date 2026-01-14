import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CarbonFootprintCompute} from '../../services/carbon-footprint-compute';

@Component({
  selector: 'app-carbon-footprint-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './carbon-footprint-form.html',
  styleUrl: './carbon-footprint-form.css',
  standalone: true
})
export class CarbonFootprintForm {


  public travelForm: FormGroup

  constructor(private cfc: CarbonFootprintCompute) {
    this.travelForm = new FormGroup(
      {
        distance: new FormControl(null, [Validators.min(1), Validators.required]),
        consumption: new FormControl(null, [Validators.min(1), Validators.required]),
        date: new FormControl(null, Validators.required),
        travelType : new FormControl(null, [Validators.pattern(/(car|train|plane)/)])
      }
    )
  }

  onTravelSubmit() {
    if (this.travelForm.valid) {
      let value = this.travelForm.value

      let quantityCo2 = this.cfc.getQuantityCo2ByTravel(value.distance, value.consumption);
      this.cfc.addTravel(
        {distance: value.distance, consumptionPer100: value.consumption, quantityCo2: quantityCo2}
      )
    }

  }

}
