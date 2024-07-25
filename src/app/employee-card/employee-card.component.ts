import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Employee } from '../types/emplyee.types';

@Component({
  selector: 'cde-employee-card',
  standalone: true,
  imports: [],
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.scss'
})
export class EmployeeCardComponent implements AfterViewInit {
  @Input({required: true}) employee!:Employee
  ngAfterViewInit(): void {
  }
}
