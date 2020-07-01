import {Component, OnInit} from '@angular/core';
import {Employees, EmplsService} from './empls.service';
import {HttpResponse} from '@angular/common/http';


@Component({
  selector: 'app-form-req',
  templateUrl: './form-req.component.html',
  styleUrls: ['./form-req.component.css']
})
export class FormReqComponent implements OnInit {

  degrees = [
    {
      text: 'Junior',
      type: 'JUNIOR',
    },

    {
      text: 'Middle',
      type: 'MIDDLE',
    },

    {
      text: 'Senior',
      type: 'SENIOR',
    }
  ];
  employees: HttpResponse<Employees> [] = [];
  emplId = '';
  emplName = '';
  emplSurname = '';
  emplDegree = '';

  constructor(private emplsService: EmplsService) {
  }

  ngOnInit(): void {

  }

  loadEmployers() {
    this.emplsService
      .getEmployess()
      .subscribe(
        (employees) => {
          this.employees = employees;
        },
        (error) => {
          alert(error);
        }
      );
  }

  // asyncLoadEmployers() {
  //   this.employees = this.emplsService.getEmployess();
  // }

  addEmployers() {
    this.emplsService
      .addEmployess(this.emplName, this.emplSurname, this.emplDegree)
      .subscribe((json) => {
        console.log(json);
        this.employees.push(json);
      });
    this.emplName = '';
    this.emplSurname = '';
    this.emplDegree = '';

  }

  setInputValues(empl) {
    this.emplId = empl.employerId;
    this.emplName = empl.name;
    this.emplSurname = empl.surname;
    this.emplDegree = empl.degree;

  }

  editEmployers() {
    this.emplsService
      .editEmployers(this.emplId, this.emplName, this.emplSurname, this.emplDegree)
      .subscribe((json) => {
        console.log(json);
      });
    const employeesHttpResponse: HttpResponse<Employees> = this.employees.find((empl) => empl['employerId'] === this.emplId);
    employeesHttpResponse[`name`] = this.emplName;
    employeesHttpResponse[`surname`] = this.emplSurname;
    employeesHttpResponse[`degree`] = this.emplDegree;
    this.emplId = '';
    this.emplName = '';
    this.emplSurname = '';
    this.emplDegree = '';


  }

  deleteEmpl(empl: HttpResponse<Employees>) {
    this.emplsService
      .deleteEmployers(empl)
      .subscribe((json) => {
        console.log(json);
      });
    setTimeout(() => {
      this.loadEmployers();
    }, 500);


  }
}
