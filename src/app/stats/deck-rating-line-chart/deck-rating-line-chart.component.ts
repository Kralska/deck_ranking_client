import { Component, Input } from '@angular/core';
import * as d3 from 'd3';
import { Game } from '../../interfaces/game';
import { Observable } from 'rxjs';

interface Datapoint {
  order: number,
  date: Date,
  rating: number  
}

@Component({
  selector: 'app-deck-rating-line-chart',
  imports: [],
  templateUrl: './deck-rating-line-chart.component.html',
  styleUrl: './deck-rating-line-chart.component.scss'
})
export class DeckRatingLineChartComponent {
  
  margin = {top: 20, right: 30, bottom: 30, left: 40};
  width = 1296;
  height = 432;

  @Input({required: true, alias:'games'})
  games$!: Observable<Game[]>;
  
  ngOnInit(): void {
    this.games$.subscribe(game => this.createBarChart(game));
 }

  private createBarChart(games: Game[]): void {
    games = games.sort((game1, game2) => game1.playedAt!.getTime() -  game2.playedAt!.getTime());
    let order = 0;
    let gamesData: Datapoint[] = games.map(game => {
      return {
        order: order++,
        date: game.playedAt!,
        rating: game.placements![0].rating
      }
    });
    this.renderData(gamesData);
  }

  private renderData(data: Datapoint[]) {
    const x = d3.scaleLinear()
      .domain((d3.extent(data, function(d: Datapoint) {return d.order})) as [number, number])
      .range([this.margin.left, this.width - this.margin.right]);

    const y = d3.scaleLinear()
      .domain((d3.extent(data, function(d: Datapoint) {return d.rating})) as number[])
      .range([this.height - this.margin.bottom, this.margin.top]);

    const line = d3.line<Datapoint>()
      .x(d => x(d.order))
      .y(d => y(d.rating));

    const svg = d3.create("svg")
      .attr("viewBox", [0, 0, this.width, this.height]);

    // Add the y-axis, remove the domain line, add grid lines and a label.
    svg.append("g")
      .attr("transform", `translate(${this.margin.left},0)`)
      .call(d3.axisLeft(y).ticks(this.height / 40))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
        .attr("x2", this.width - this.margin.left - this.margin.right)
        .attr("stroke-opacity", 0.1))
      .call(g => g.append("text")
        .attr("x", -this.margin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start"));

    // Append a path for the line.
    svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line(data));

    document.querySelector("#base")!.append(svg.node()!);
  }

}
