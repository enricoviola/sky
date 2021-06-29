import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbsGalleryComponent } from './thumbs-gallery.component';

describe('ThumbsGalleryComponent', () => {
  let component: ThumbsGalleryComponent;
  let fixture: ComponentFixture<ThumbsGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThumbsGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbsGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
