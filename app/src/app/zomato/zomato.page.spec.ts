import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ZomatoPage } from './zomato.page';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

describe('ZomatoPage', () => {
  let component: ZomatoPage;
  let fixture: ComponentFixture<ZomatoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZomatoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientModule, IonicModule.forRoot()],
      providers: [NativeStorage]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZomatoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
