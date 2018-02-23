import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsInfoComponent } from './goods-info.component';

describe('GoodsInfoComponent', () => {
  let component: GoodsInfoComponent;
  let fixture: ComponentFixture<GoodsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
