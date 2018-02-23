import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTemplateComponent } from './order-template.component';

describe('OrderTemplateComponent', () => {
  let component: OrderTemplateComponent;
  let fixture: ComponentFixture<OrderTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
