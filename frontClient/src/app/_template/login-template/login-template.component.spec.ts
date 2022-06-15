import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginTemplateComponent } from './login-template.component';

describe('LoginTemplateComponent', () => {
  let component: LoginTemplateComponent;
  let fixture: ComponentFixture<LoginTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginTemplateComponent],
      imports:[NgbModule],
      providers:[NgbActiveModal,NgbModal]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginTemplateComponent);
    component = fixture.componentInstance;
    component.my_modal_title = "hello word"
    component.my_modal_content = "content"
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.my_modal_content).toBe("content")
    expect(component.my_modal_title).toBe("hello word")
  });
});
