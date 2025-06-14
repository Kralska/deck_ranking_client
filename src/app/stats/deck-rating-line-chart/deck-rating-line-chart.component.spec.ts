import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckRatingLineChartComponent } from './deck-rating-line-chart.component';

describe('DeckRatingLineChartComponent', () => {
  let component: DeckRatingLineChartComponent;
  let fixture: ComponentFixture<DeckRatingLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeckRatingLineChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeckRatingLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
