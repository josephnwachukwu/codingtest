import { AfterViewInit, Component, computed, inject, OnInit, signal } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Observable } from 'rxjs';
import { Employee } from '../types/emplyee.types';
import { FormsModule } from '@angular/forms';
import { EmployeeCardComponent } from "../employee-card/employee-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cde-employee-list',
  standalone: true,
  imports: [FormsModule, EmployeeCardComponent, CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements AfterViewInit {
  
  employeeService = inject(EmployeeService);
  currentDepartment = signal<string>("All");
  start: number = 0;
  end: number = 6;
  pagelimit: number = 6
  activePage = 1

  ngAfterViewInit() {
    this.employeeService.getEmployees()
    this.employeeService.getDepartments()
  }

  // Computed Signal to show employees
  visibleEmployees = computed(() => {
    const employees = this.employeeService.employeeSignal();

    if(this.currentDepartment() !== 'All') {
      return employees.filter((employee) => employee.department === this.currentDepartment())
    }
    return employees;
  });

  // Computed Signal for pagination
  pages = computed(()=>{
    const pgs = Math.ceil(this.visibleEmployees().length / 6)
    const pages = Array.from(Array(pgs).keys())
    return pages
  })

  onDepartmentChanged = (dept: string) => {
    this.currentDepartment.set(dept)
  }

  updatePage = (page:number) => {
    this.activePage = page + 1
    if(page !== 0) {
      this.start = (page * this.pagelimit)
      this.end = (page * this.pagelimit) + (this.pagelimit)
    } else if(page === 0) {
      this.start = 0
      this.end = 6
    }
  }
  nextPage = () => {
    const maxpage = this.pages().length
    if(maxpage - 1 >= this.activePage ) {
      this.updatePage(this.activePage)
    }
  }
  prevPage = () => {
   if(this.activePage > 1) {
    this.updatePage(this.activePage - 2)
   }
  }
  
}
