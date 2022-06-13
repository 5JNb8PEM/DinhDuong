import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ThongTinSangLocVaDanhGiaDDDetailComponent } from './thong-tin-sang-loc-va-danh-gia-dd-detail.component';

describe('ThongTinSangLocVaDanhGiaDD Management Detail Component', () => {
  let comp: ThongTinSangLocVaDanhGiaDDDetailComponent;
  let fixture: ComponentFixture<ThongTinSangLocVaDanhGiaDDDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThongTinSangLocVaDanhGiaDDDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ thongTinSangLocVaDanhGiaDD: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ThongTinSangLocVaDanhGiaDDDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ThongTinSangLocVaDanhGiaDDDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load thongTinSangLocVaDanhGiaDD on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.thongTinSangLocVaDanhGiaDD).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
