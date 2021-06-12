import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AntennaCRUDPagePage } from './antenna-crudpage.page';

describe('AntennaCRUDPagePage', () => {
  let component: AntennaCRUDPagePage;
  let fixture: ComponentFixture<AntennaCRUDPagePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AntennaCRUDPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AntennaCRUDPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
