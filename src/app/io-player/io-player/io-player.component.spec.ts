import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IoPlayerComponent } from './io-player.component';

describe('IoPlayerComponent', () => {
  let component: IoPlayerComponent;
  let fixture: ComponentFixture<IoPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IoPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
