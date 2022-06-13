import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IThongTinSangLocVaDanhGiaDD, ThongTinSangLocVaDanhGiaDD } from '../thong-tin-sang-loc-va-danh-gia-dd.model';
import { ThongTinSangLocVaDanhGiaDDService } from '../service/thong-tin-sang-loc-va-danh-gia-dd.service';

import { ThongTinSangLocVaDanhGiaDDRoutingResolveService } from './thong-tin-sang-loc-va-danh-gia-dd-routing-resolve.service';

describe('ThongTinSangLocVaDanhGiaDD routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ThongTinSangLocVaDanhGiaDDRoutingResolveService;
  let service: ThongTinSangLocVaDanhGiaDDService;
  let resultThongTinSangLocVaDanhGiaDD: IThongTinSangLocVaDanhGiaDD | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(ThongTinSangLocVaDanhGiaDDRoutingResolveService);
    service = TestBed.inject(ThongTinSangLocVaDanhGiaDDService);
    resultThongTinSangLocVaDanhGiaDD = undefined;
  });

  describe('resolve', () => {
    it('should return IThongTinSangLocVaDanhGiaDD returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultThongTinSangLocVaDanhGiaDD = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultThongTinSangLocVaDanhGiaDD).toEqual({ id: 123 });
    });

    it('should return new IThongTinSangLocVaDanhGiaDD if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultThongTinSangLocVaDanhGiaDD = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultThongTinSangLocVaDanhGiaDD).toEqual(new ThongTinSangLocVaDanhGiaDD());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as ThongTinSangLocVaDanhGiaDD })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultThongTinSangLocVaDanhGiaDD = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultThongTinSangLocVaDanhGiaDD).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
