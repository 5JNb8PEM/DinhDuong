import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ThongTinSangLocVaDanhGiaDDService } from '../service/thong-tin-sang-loc-va-danh-gia-dd.service';
import { IThongTinSangLocVaDanhGiaDD, ThongTinSangLocVaDanhGiaDD } from '../thong-tin-sang-loc-va-danh-gia-dd.model';
import { IDanhGiaCanThiepDD } from 'app/entities/danh-gia-can-thiep-dd/danh-gia-can-thiep-dd.model';
import { DanhGiaCanThiepDDService } from 'app/entities/danh-gia-can-thiep-dd/service/danh-gia-can-thiep-dd.service';

import { ThongTinSangLocVaDanhGiaDDUpdateComponent } from './thong-tin-sang-loc-va-danh-gia-dd-update.component';

describe('ThongTinSangLocVaDanhGiaDD Management Update Component', () => {
  let comp: ThongTinSangLocVaDanhGiaDDUpdateComponent;
  let fixture: ComponentFixture<ThongTinSangLocVaDanhGiaDDUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let thongTinSangLocVaDanhGiaDDService: ThongTinSangLocVaDanhGiaDDService;
  let danhGiaCanThiepDDService: DanhGiaCanThiepDDService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ThongTinSangLocVaDanhGiaDDUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ThongTinSangLocVaDanhGiaDDUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ThongTinSangLocVaDanhGiaDDUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    thongTinSangLocVaDanhGiaDDService = TestBed.inject(ThongTinSangLocVaDanhGiaDDService);
    danhGiaCanThiepDDService = TestBed.inject(DanhGiaCanThiepDDService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call danhGiaCanThiepDD query and add missing value', () => {
      const thongTinSangLocVaDanhGiaDD: IThongTinSangLocVaDanhGiaDD = { id: 456 };
      const danhGiaCanThiepDD: IDanhGiaCanThiepDD = { id: 34565 };
      thongTinSangLocVaDanhGiaDD.danhGiaCanThiepDD = danhGiaCanThiepDD;

      const danhGiaCanThiepDDCollection: IDanhGiaCanThiepDD[] = [{ id: 40577 }];
      jest.spyOn(danhGiaCanThiepDDService, 'query').mockReturnValue(of(new HttpResponse({ body: danhGiaCanThiepDDCollection })));
      const expectedCollection: IDanhGiaCanThiepDD[] = [danhGiaCanThiepDD, ...danhGiaCanThiepDDCollection];
      jest.spyOn(danhGiaCanThiepDDService, 'addDanhGiaCanThiepDDToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ thongTinSangLocVaDanhGiaDD });
      comp.ngOnInit();

      expect(danhGiaCanThiepDDService.query).toHaveBeenCalled();
      expect(danhGiaCanThiepDDService.addDanhGiaCanThiepDDToCollectionIfMissing).toHaveBeenCalledWith(
        danhGiaCanThiepDDCollection,
        danhGiaCanThiepDD
      );
      expect(comp.danhGiaCanThiepDDSCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const thongTinSangLocVaDanhGiaDD: IThongTinSangLocVaDanhGiaDD = { id: 456 };
      const danhGiaCanThiepDD: IDanhGiaCanThiepDD = { id: 48048 };
      thongTinSangLocVaDanhGiaDD.danhGiaCanThiepDD = danhGiaCanThiepDD;

      activatedRoute.data = of({ thongTinSangLocVaDanhGiaDD });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(thongTinSangLocVaDanhGiaDD));
      expect(comp.danhGiaCanThiepDDSCollection).toContain(danhGiaCanThiepDD);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ThongTinSangLocVaDanhGiaDD>>();
      const thongTinSangLocVaDanhGiaDD = { id: 123 };
      jest.spyOn(thongTinSangLocVaDanhGiaDDService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ thongTinSangLocVaDanhGiaDD });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: thongTinSangLocVaDanhGiaDD }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(thongTinSangLocVaDanhGiaDDService.update).toHaveBeenCalledWith(thongTinSangLocVaDanhGiaDD);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ThongTinSangLocVaDanhGiaDD>>();
      const thongTinSangLocVaDanhGiaDD = new ThongTinSangLocVaDanhGiaDD();
      jest.spyOn(thongTinSangLocVaDanhGiaDDService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ thongTinSangLocVaDanhGiaDD });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: thongTinSangLocVaDanhGiaDD }));
      saveSubject.complete();

      // THEN
      expect(thongTinSangLocVaDanhGiaDDService.create).toHaveBeenCalledWith(thongTinSangLocVaDanhGiaDD);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ThongTinSangLocVaDanhGiaDD>>();
      const thongTinSangLocVaDanhGiaDD = { id: 123 };
      jest.spyOn(thongTinSangLocVaDanhGiaDDService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ thongTinSangLocVaDanhGiaDD });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(thongTinSangLocVaDanhGiaDDService.update).toHaveBeenCalledWith(thongTinSangLocVaDanhGiaDD);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackDanhGiaCanThiepDDById', () => {
      it('Should return tracked DanhGiaCanThiepDD primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackDanhGiaCanThiepDDById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
