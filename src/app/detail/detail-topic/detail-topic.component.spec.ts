import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTopicComponent } from './detail-topic.component';

describe('DetailTopicComponent', () => {
  let component: DetailTopicComponent;
  let fixture: ComponentFixture<DetailTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailTopicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
