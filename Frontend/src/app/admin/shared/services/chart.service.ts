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
    title: string,
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
  public revealLineChart(canvas : string , dataset : any , labels : string[], title : string) {
    return new Chart(<HTMLCanvasElement>document.getElementById(canvas),{
      type : 'line', 
      data : {
        labels: labels, 
        datasets:[ {
          label : title ,
          data : dataset,
          fill: false,
          borderColor: '#ff008cff',
          tension: 0.2
        }]
      }
    })

  }
}
