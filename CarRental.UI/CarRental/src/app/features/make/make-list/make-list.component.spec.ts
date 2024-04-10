import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeListComponent } from './make-list.component';

describe('MakeListComponent', () => {
  let component: MakeListComponent;
  let fixture: ComponentFixture<MakeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MakeListComponent]
    });
    fixture = TestBed.createComponent(MakeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
