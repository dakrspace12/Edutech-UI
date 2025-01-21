import { Component } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-admin-pichart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './admin-pichart.component.html',
  styleUrl: './admin-pichart.component.scss'
})
export class AdminPichartComponent {
  public pieChartType: ChartType = 'pie';
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Students', 'Admins', 'Instructors'],
    datasets: [{
      data: [300, 50, 100] // Example data, replace with dynamic data
    }]
  };

  // Method to update chart data dynamically
  updateChartData(students: number, admins: number, instructors: number) {
    this.pieChartData.datasets[0].data = [students, admins, instructors];
  }
}
