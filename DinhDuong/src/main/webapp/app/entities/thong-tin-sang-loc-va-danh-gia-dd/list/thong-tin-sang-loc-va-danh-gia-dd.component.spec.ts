import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ThongTinSangLocVaDanhGiaDDService } from '../service/thong-tin-sang-loc-va-danh-gia-dd.service';

import { ThongTinSangLocVaDanhGiaDDComponent } from './thong-tin-sang-loc-va-danh-gia-dd.component';

describe('ThongTinSangLocVaDanhGiaDD Management Component', () => {
  let comp: ThongTinSangLocVaDanhGiaDDComponent;
  let fixture: ComponentFixture<ThongTinSangLocVaDanhGiaDDComponent>;
  let service: ThongTinSangLocVaDanhGiaDDService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ThongTinSangLocVaDanhGiaDDComponent],
    })
      .overrideTemplate(ThongTinSangLocVaDanhGiaDDComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ThongTinSangLocVaDanhGiaDDComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ThongTinSangLocVaDanhGiaDDService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.thongTinSangLocVaDanhGiaDDS?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
