import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IThongTinSangLocVaDanhGiaDD, ThongTinSangLocVaDanhGiaDD } from '../thong-tin-sang-loc-va-danh-gia-dd.model';
import { ThongTinSangLocVaDanhGiaDDService } from '../service/thong-tin-sang-loc-va-danh-gia-dd.service';

@Injectable({ providedIn: 'root' })
export class ThongTinSangLocVaDanhGiaDDRoutingResolveService implements Resolve<IThongTinSangLocVaDanhGiaDD> {
  constructor(protected service: ThongTinSangLocVaDanhGiaDDService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IThongTinSangLocVaDanhGiaDD> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((thongTinSangLocVaDanhGiaDD: HttpResponse<ThongTinSangLocVaDanhGiaDD>) => {
          if (thongTinSangLocVaDanhGiaDD.body) {
            return of(thongTinSangLocVaDanhGiaDD.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ThongTinSangLocVaDanhGiaDD());
  }
}
