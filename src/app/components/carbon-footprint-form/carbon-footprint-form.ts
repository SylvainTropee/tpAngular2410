import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
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


  public travelForm: FormGroup = new FormGroup({})

  constructor(private cfc: CarbonFootprintCompute) {

    this.travelForm = new FormGroup(
      {
        distance: new FormControl(null, [Validators.min(1), Validators.required]),
        consumption: new FormControl(null, [Validators.min(1), Validators.required]),
        date: new FormControl(null, Validators.required),
        travelType: new FormControl('car', [Validators.pattern(/(car|train|plane)/),
          (control) => this.travelTypeValidator(control)])
      }
    )
  }

  travelTypeValidator(control: AbstractControl) {

    const travelType = control.value

    console.log(this.travelForm)
    if (travelType == 'car') {
      this.travelForm.get('consumption')?.setValidators([Validators.min(1), Validators.required])
    } else {
      this.travelForm.get("consumption")?.clearValidators()
      this.travelForm.get("consumption")?.setValue(0)
    }

    this.travelForm.get('consumption')?.updateValueAndValidity()
    return null;
  }


  onTravelSubmit() {


    if (this.travelForm.valid) {
      let value = this.travelForm.value

      let quantityCo2 = this.cfc.getQuantityCo2ByTravel(value.distance, value.consumption, value.travelType);
      this.cfc.addTravel(
        {distance: value.distance, consumptionPer100: value.consumption, quantityCo2: quantityCo2}
      )
    } else {
      console.log(this.travelForm.value)
    }

  }

}
