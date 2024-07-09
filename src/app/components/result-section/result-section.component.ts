import { Component } from '@angular/core';
import { CalculatorService } from '../../services/calculator.service';

@Component({
  selector: 'app-result-section',
  templateUrl: './result-section.component.html',
  styleUrl: './result-section.component.css'
})

export class ResultSectionComponent 
{
  result$ = this.calcService.result$;

  constructor(private calcService: CalculatorService) {
  }
}
