import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Employee } from './types/emplyee.types';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  http = inject(HttpClient)
  employeeSignal = signal<Employee[]>([])
  departmentSignal = signal<string[]>([])
  constructor() { }


  getEmployees = () => {
    this.http.get<Employee[]>('api/v2/employees').subscribe((data:Employee[]) => {
      let  employeeData = data
      employeeData.sort((a: Employee, b: Employee) => new Date(b.dateOfHire as string).valueOf() - new Date(a.dateOfHire as string).valueOf())
      employeeData  = employeeData.map<Employee>((emp) => {
        if(new Date(emp.dateOfHire as string).getTime() <= new Date('2020-01-01').getTime()) {
          return {...emp, isVip: true}
        }
        else {
          return {...emp, isVip: false}
        }
      })
      this.employeeSignal.set([...employeeData])

    })
  }

  getDepartments = () => {
    this.http.get<string[]>('api/v2/departments').subscribe((data) => {
      this.departmentSignal.set([...data])
    })
  }

  updateFilter = () => {

  }


}
