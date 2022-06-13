import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCommandsComponent } from './home-mycommands.component';

describe('HomeMycommandsComponent', () => {
  let component: MyCommandsComponent;
  let fixture: ComponentFixture<MyCommandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCommandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCommandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
