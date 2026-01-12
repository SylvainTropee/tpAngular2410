import { Component } from '@angular/core';
import {CarbonFootprintForm} from '../carbon-footprint-form/carbon-footprint-form';
import {CarbonFootprintResult} from '../carbon-footprint-result/carbon-footprint-result';

@Component({
  selector: 'app-carbon-footprint',
  imports: [
    CarbonFootprintForm,
    CarbonFootprintResult
  ],
  templateUrl: './carbon-footprint.html',
  styleUrl: './carbon-footprint.css',
  standalone: true
})
export class CarbonFootprint {

}
