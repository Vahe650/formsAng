import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {catchError, delay, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

export interface Employees {
  employerId: number;
  name: string;
  surname: string;
  degree: string;


}

@Injectable()
export class EmplsService {

  constructor(
    private http: HttpClient) {
  }

  getEmployess() {
    const heads = new HttpHeaders({
      'Content-Type': 'applilaction/json; charset-utf8'
    });
    return this.http.get('http://localhost:8087/api/employers/all', {
      headers: heads
    }).pipe(
      delay(500), // zaderjka na 3 second
      map((res: HttpResponse<Employees[]>) => {
        return res[`_embedded`][`employees`];
      }),
      catchError(err => {
        return throwError('Server Failed:  ');
      })
    );
  }


  addEmployess(emplName: string, emplSurname: string, emplDegree: string) {
    const data: Employees = {
      employerId: 0,
      name: emplName,
      surname: emplSurname,
      degree: emplDegree
    };
    return this.http.post('http://localhost:8087/api/employers', data).pipe(
      map((res: HttpResponse<Employees>) => {
        return res;
      }) // or any other operator
    );
  }

  editEmployers(id: string, name: string, surname: string, degree: string) {
    const data = {name, surname, degree};
    console.log(data + ' id' + id);
    const url = `http://localhost:8087/api/employers/${id}`;
    console.log(url);
    return this.http.put(url, data).pipe(
      map((res: HttpResponse<Employees>) => {
        return res;
      }) // or any other operator
    );

  }

  deleteEmployers(empl: HttpResponse<Employees>) {
    const url = `http://localhost:8087/api/employers/${empl[`employerId`]}`;
    return this.http.delete(url, empl).pipe(
      map((res: HttpResponse<Employees>) => {
        return res;
      }) // or any other operator
    );
  }
}
