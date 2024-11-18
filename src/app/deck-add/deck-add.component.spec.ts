import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckAddComponent } from './deck-add.component';

describe('DeckAddComponent', () => {
  let component: DeckAddComponent;
  let fixture: ComponentFixture<DeckAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeckAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeckAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
