import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoStatisticalComponent } from './info-statistical.component';

describe('InfoStatisticalComponent', () => {
  let component: InfoStatisticalComponent;
  let fixture: ComponentFixture<InfoStatisticalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoStatisticalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoStatisticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
