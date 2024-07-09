import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalculatorService } from '../../services/calculator.service';

@Component({
  selector: 'app-input-section',
  templateUrl: './input-section.component.html',
  styleUrl: './input-section.component.css'
})
export class InputSectionComponent 
{ 
  public inputForm: FormGroup;
  public isCalculating = false;

  constructor(private formBuilder: FormBuilder, private calcService: CalculatorService) {
    this.inputForm = this.formBuilder.group({
      grossSalary: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]]
    });
  }

  public calculate() {
    if (this.inputForm.valid) {
      this.isCalculating = true;
      const grossSalary = this.inputForm.get('grossSalary')?.value;
      this.calcService.calculate(grossSalary).subscribe({
        next: () => {
          this.isCalculating = false;
        },
        error: () => {
          this.isCalculating = false;
          // Show error message
        }
      });
    }
  }

  public hasError(errorType: string): boolean {
    let input = this.inputForm.get('grossSalary');
    return input ? input.hasError(errorType): false;
  }
}
