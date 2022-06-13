import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IThongTinSangLocVaDanhGiaDD, ThongTinSangLocVaDanhGiaDD } from '../thong-tin-sang-loc-va-danh-gia-dd.model';

import { ThongTinSangLocVaDanhGiaDDService } from './thong-tin-sang-loc-va-danh-gia-dd.service';

describe('ThongTinSangLocVaDanhGiaDD Service', () => {
  let service: ThongTinSangLocVaDanhGiaDDService;
  let httpMock: HttpTestingController;
  let elemDefault: IThongTinSangLocVaDanhGiaDD;
  let expectedResult: IThongTinSangLocVaDanhGiaDD | IThongTinSangLocVaDanhGiaDD[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ThongTinSangLocVaDanhGiaDDService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      maBN: 'AAAAAAA',
      mangThai: false,
      bMI: 0,
      danhGiaBMI: 0,
      phanTramCanNangTrong3Thang: 0,
      danhGiaCanNang: 0,
      anUongTrongTuan: 'AAAAAAA',
      danhGiaAnUong: 0,
      thoiGianChiDinh: currentDate,
      nguyCoSDD: false,
      cheDoAn: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          thoiGianChiDinh: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a ThongTinSangLocVaDanhGiaDD', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          thoiGianChiDinh: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          thoiGianChiDinh: currentDate,
        },
        returnedFromService
      );

      service.create(new ThongTinSangLocVaDanhGiaDD()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ThongTinSangLocVaDanhGiaDD', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          maBN: 'BBBBBB',
          mangThai: true,
          bMI: 1,
          danhGiaBMI: 1,
          phanTramCanNangTrong3Thang: 1,
          danhGiaCanNang: 1,
          anUongTrongTuan: 'BBBBBB',
          danhGiaAnUong: 1,
          thoiGianChiDinh: currentDate.format(DATE_TIME_FORMAT),
          nguyCoSDD: true,
          cheDoAn: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          thoiGianChiDinh: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ThongTinSangLocVaDanhGiaDD', () => {
      const patchObject = Object.assign(
        {
          maBN: 'BBBBBB',
          mangThai: true,
          danhGiaBMI: 1,
          danhGiaCanNang: 1,
          nguyCoSDD: true,
          cheDoAn: 'BBBBBB',
        },
        new ThongTinSangLocVaDanhGiaDD()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          thoiGianChiDinh: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ThongTinSangLocVaDanhGiaDD', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          maBN: 'BBBBBB',
          mangThai: true,
          bMI: 1,
          danhGiaBMI: 1,
          phanTramCanNangTrong3Thang: 1,
          danhGiaCanNang: 1,
          anUongTrongTuan: 'BBBBBB',
          danhGiaAnUong: 1,
          thoiGianChiDinh: currentDate.format(DATE_TIME_FORMAT),
          nguyCoSDD: true,
          cheDoAn: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          thoiGianChiDinh: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a ThongTinSangLocVaDanhGiaDD', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addThongTinSangLocVaDanhGiaDDToCollectionIfMissing', () => {
      it('should add a ThongTinSangLocVaDanhGiaDD to an empty array', () => {
        const thongTinSangLocVaDanhGiaDD: IThongTinSangLocVaDanhGiaDD = { id: 123 };
        expectedResult = service.addThongTinSangLocVaDanhGiaDDToCollectionIfMissing([], thongTinSangLocVaDanhGiaDD);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(thongTinSangLocVaDanhGiaDD);
      });

      it('should not add a ThongTinSangLocVaDanhGiaDD to an array that contains it', () => {
        const thongTinSangLocVaDanhGiaDD: IThongTinSangLocVaDanhGiaDD = { id: 123 };
        const thongTinSangLocVaDanhGiaDDCollection: IThongTinSangLocVaDanhGiaDD[] = [
          {
            ...thongTinSangLocVaDanhGiaDD,
          },
          { id: 456 },
        ];
        expectedResult = service.addThongTinSangLocVaDanhGiaDDToCollectionIfMissing(
          thongTinSangLocVaDanhGiaDDCollection,
          thongTinSangLocVaDanhGiaDD
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ThongTinSangLocVaDanhGiaDD to an array that doesn't contain it", () => {
        const thongTinSangLocVaDanhGiaDD: IThongTinSangLocVaDanhGiaDD = { id: 123 };
        const thongTinSangLocVaDanhGiaDDCollection: IThongTinSangLocVaDanhGiaDD[] = [{ id: 456 }];
        expectedResult = service.addThongTinSangLocVaDanhGiaDDToCollectionIfMissing(
          thongTinSangLocVaDanhGiaDDCollection,
          thongTinSangLocVaDanhGiaDD
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(thongTinSangLocVaDanhGiaDD);
      });

      it('should add only unique ThongTinSangLocVaDanhGiaDD to an array', () => {
        const thongTinSangLocVaDanhGiaDDArray: IThongTinSangLocVaDanhGiaDD[] = [{ id: 123 }, { id: 456 }, { id: 13317 }];
        const thongTinSangLocVaDanhGiaDDCollection: IThongTinSangLocVaDanhGiaDD[] = [{ id: 123 }];
        expectedResult = service.addThongTinSangLocVaDanhGiaDDToCollectionIfMissing(
          thongTinSangLocVaDanhGiaDDCollection,
          ...thongTinSangLocVaDanhGiaDDArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const thongTinSangLocVaDanhGiaDD: IThongTinSangLocVaDanhGiaDD = { id: 123 };
        const thongTinSangLocVaDanhGiaDD2: IThongTinSangLocVaDanhGiaDD = { id: 456 };
        expectedResult = service.addThongTinSangLocVaDanhGiaDDToCollectionIfMissing(
          [],
          thongTinSangLocVaDanhGiaDD,
          thongTinSangLocVaDanhGiaDD2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(thongTinSangLocVaDanhGiaDD);
        expect(expectedResult).toContain(thongTinSangLocVaDanhGiaDD2);
      });

      it('should accept null and undefined values', () => {
        const thongTinSangLocVaDanhGiaDD: IThongTinSangLocVaDanhGiaDD = { id: 123 };
        expectedResult = service.addThongTinSangLocVaDanhGiaDDToCollectionIfMissing([], null, thongTinSangLocVaDanhGiaDD, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(thongTinSangLocVaDanhGiaDD);
      });

      it('should return initial array if no ThongTinSangLocVaDanhGiaDD is added', () => {
        const thongTinSangLocVaDanhGiaDDCollection: IThongTinSangLocVaDanhGiaDD[] = [{ id: 123 }];
        expectedResult = service.addThongTinSangLocVaDanhGiaDDToCollectionIfMissing(thongTinSangLocVaDanhGiaDDCollection, undefined, null);
        expect(expectedResult).toEqual(thongTinSangLocVaDanhGiaDDCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
