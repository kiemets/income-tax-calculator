import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { of } from 'rxjs';
import { ResultSectionComponent } from './result-section.component';
import { CalculatorService } from '../../services/calculator.service';

describe('ResultSectionComponent', () => {
  let component: ResultSectionComponent;
  let fixture: ComponentFixture<ResultSectionComponent>;
  let taxService: jasmine.SpyObj<CalculatorService>;

  beforeEach(async () => {
    const calcServiceSpy = jasmine.createSpyObj('CalculatorService', ['result$']);

    await TestBed.configureTestingModule({
      declarations: [ResultSectionComponent],
      imports: [MatCardModule],
      providers: [{ provide: CalculatorService, useValue: calcServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(ResultSectionComponent);
    component = fixture.componentInstance;
    taxService = TestBed.inject(CalculatorService) as jasmine.SpyObj<CalculatorService>;
    taxService.result$ = of({
      grossAnnualSalary: 60000,
      grossMonthlySalary: 5000,
      netAnnualSalary: 48000,
      netMonthlySalary: 4000,
      annualTaxPaid: 12000,
      monthlyTaxPaid: 1000
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct calculation results', () => {
    const compiled = fixture.nativeElement;

    const rows = compiled.querySelectorAll('.row');
    expect(rows.length).toBe(6);

    expect(rows[0].querySelector('.label').textContent).toContain('Gross Annual Salary:');
    expect(rows[0].querySelector('div:nth-child(2)').textContent).toContain('$60,000.00');

    expect(rows[1].querySelector('.label').textContent).toContain('Gross Monthly Salary:');
    expect(rows[1].querySelector('div:nth-child(2)').textContent).toContain('$5,000.00');

    expect(rows[2].querySelector('.label').textContent).toContain('Net Annual Salary:');
    expect(rows[2].querySelector('div:nth-child(2)').textContent).toContain('$48,000.00');

    expect(rows[3].querySelector('.label').textContent).toContain('Net Monthly Salary:');
    expect(rows[3].querySelector('div:nth-child(2)').textContent).toContain('$4,000.00');

    expect(rows[4].querySelector('.label').textContent).toContain('Annual Tax Paid:');
    expect(rows[4].querySelector('div:nth-child(2)').textContent).toContain('$12,000.00');

    expect(rows[5].querySelector('.label').textContent).toContain('Monthly Tax Paid:');
    expect(rows[5].querySelector('div:nth-child(2)').textContent).toContain('$1,000.00');
  });});
