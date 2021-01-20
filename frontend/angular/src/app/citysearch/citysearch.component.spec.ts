import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitysearchComponent } from './citysearch.component';

describe('CitysearchComponent', () => {
  let component: CitysearchComponent;
  let fixture: ComponentFixture<CitysearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitysearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitysearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
