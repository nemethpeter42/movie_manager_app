import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCommonComponent } from './movie-common.component';

describe('MovieCommonComponent', () => {
  let component: MovieCommonComponent;
  let fixture: ComponentFixture<MovieCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCommonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
