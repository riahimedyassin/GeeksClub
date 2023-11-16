import { Injectable } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor() {}
  public revealCharts(
    canvas: string,
    dataset: any,
    labels: string[],
    title: string
  ) {
    return new Chart(canvas, {
      type: 'bar',
      data: {
        datasets: [
          {
            label: title,
            data: dataset,
            backgroundColor: ['#ff008cff'],
          },
        ],
        labels: labels,
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
