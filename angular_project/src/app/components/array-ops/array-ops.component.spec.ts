import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayOpsComponent } from './array-ops.component';

describe('ArrayOpsComponent', () => {
  let component: ArrayOpsComponent;
  let fixture: ComponentFixture<ArrayOpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrayOpsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrayOpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
