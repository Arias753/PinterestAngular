import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFavouriteComponent } from './dialog-favourite.component';

describe('DialogFavouriteComponent', () => {
  let component: DialogFavouriteComponent;
  let fixture: ComponentFixture<DialogFavouriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogFavouriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFavouriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
