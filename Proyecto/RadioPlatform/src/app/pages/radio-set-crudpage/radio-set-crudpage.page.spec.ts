import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RadioSetCRUDPagePage } from './radio-set-crudpage.page';

describe('RadioSetCRUDPagePage', () => {
  let component: RadioSetCRUDPagePage;
  let fixture: ComponentFixture<RadioSetCRUDPagePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioSetCRUDPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RadioSetCRUDPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
