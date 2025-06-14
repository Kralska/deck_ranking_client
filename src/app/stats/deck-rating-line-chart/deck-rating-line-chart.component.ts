import { Component } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-deck-rating-line-chart',
  imports: [],
  templateUrl: './deck-rating-line-chart.component.html',
  styleUrl: './deck-rating-line-chart.component.scss'
})
export class DeckRatingLineChartComponent {
  private margin = 50;
  private width = 750 - 2 * this.margin;
  private height = 400 - 2 * this.margin;

  private svg: any;

  

  private createSvg(): void {
    const x = d3.scaleUtc()
      .domain(d3.extent(ratings, r => r.rating))
      .range([this.margin, this.width - this.margin]);

    const y = d3.scaleLinear()
      .domain(d3.max(unemployment, r => r.date))
      .range([this.margin, this.height - this.margin]);

    this.svg = d3.create("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .attr("viewBox", [0, 0, this.width, this.height])
      .attr("style", "max-width: 100%; height: auto; overflow: visible; font: 10px sans-serif;");
  }
}
