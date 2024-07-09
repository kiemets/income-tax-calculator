import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export class CalcResult
{
  grossAnnualSalary: number = 0;
  grossMonthlySalary: number = 0;
  netAnnualSalary: number = 0;
  netMonthlySalary: number = 0;
  annualTaxPaid: number = 0;
  monthlyTaxPaid: number = 0;
}

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private resultSubject = new BehaviorSubject<any>(null);
  public result$ = this.resultSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  calculate(grossAnnualSalary: number): Observable<CalcResult> {
    return this.http.post<CalcResult>(`${environment.calcServer}/calculate`, { grossAnnualSalary }).pipe(
      delay(2000),
      tap(result => this.resultSubject.next(result)),
      catchError(error => {
        console.error('Error occured during calculation:', error);
        throw error;
      })
    );
  }
}
