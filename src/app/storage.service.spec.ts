import { TestBed, inject } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { mock, instance, when, anything, verify, capture, spy } from 'ts-mockito'

import { HttpClientModule } from '@angular/common/http'
import { RestaurantDetail } from './models'


describe('StorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService, NativeStorage],
      imports: [
        HttpClientModule
      ]
    });
  });

  it('should be created', inject([StorageService], (service: StorageService) => {
    expect(service).toBeTruthy();
  }));

  it('should get restaurants', () => {
    const bar: NativeStorage = mock(NativeStorage);
    const service: StorageService = new StorageService(instance(bar));
    const restArr: number[] = [1, 2, 3, 4];

    when(bar.getItem(anything())).thenReturn(Promise.resolve(restArr));
    service.getRestaurants().then((result) => {
      expect(result).toEqual(restArr);
    });
  });
});
