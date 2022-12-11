import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfacePanelComponent } from './interface-panel.component';

describe('InterfacePanelComponent', () => {
  let component: InterfacePanelComponent;
  let fixture: ComponentFixture<InterfacePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterfacePanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterfacePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
