import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalcResult, CalculatorService } from '../../services/calculator.service';
import { of } from 'rxjs';
import { InputSectionComponent } from './input-section.component';

describe('InputSectionComponent', () => {
  let component: InputSectionComponent;
  let fixture: ComponentFixture<InputSectionComponent>;
  let calcService: jasmine.SpyObj<CalculatorService>;

  beforeEach(async () => {
    const calcServiceSpy = jasmine.createSpyObj('CalculatorService', ['calculateTax']);

    await TestBed.configureTestingModule({
      declarations: [InputSectionComponent],
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule
      ],
      providers: [{ provide: CalculatorService, useValue: calcServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(InputSectionComponent);
    component = fixture.componentInstance;
    calcService = TestBed.inject(CalculatorService) as jasmine.SpyObj<CalculatorService>;
    calcService.calculate.and.returnValue(of(new CalcResult()));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a required field validator on grossSalary', () => {
    const grossSalaryControl = component.inputForm.get('grossSalary');
    grossSalaryControl?.setValue('');
    expect(grossSalaryControl?.hasError('required')).toBeTruthy();
  });

  it('should have a pattern validator on grossSalary for numerical input', () => {
    const grossSalaryControl = component.inputForm.get('grossSalary');
    grossSalaryControl?.setValue('abc');
    expect(grossSalaryControl?.hasError('pattern')).toBeTruthy();
  });

  it('should call calculateTax on form submit', () => {
    const grossSalaryControl = component.inputForm.get('grossSalary');
    grossSalaryControl?.setValue('50000');
    component.calculate();
    expect(calcService.calculate).toHaveBeenCalledWith(50000);
  });
});
