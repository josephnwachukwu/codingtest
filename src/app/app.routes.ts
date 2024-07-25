import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
          import('./employee-list/employee-list.component').then((m) => m.EmployeeListComponent),
      },
];
