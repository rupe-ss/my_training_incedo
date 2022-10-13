import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoStatComponent } from './todo-stat.component';

describe('TodoStatComponent', () => {
  let component: TodoStatComponent;
  let fixture: ComponentFixture<TodoStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoStatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
