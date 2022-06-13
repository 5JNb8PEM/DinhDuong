import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IThongTinSangLocVaDanhGiaDD, getThongTinSangLocVaDanhGiaDDIdentifier } from '../thong-tin-sang-loc-va-danh-gia-dd.model';

export type EntityResponseType = HttpResponse<IThongTinSangLocVaDanhGiaDD>;
export type EntityArrayResponseType = HttpResponse<IThongTinSangLocVaDanhGiaDD[]>;

@Injectable({ providedIn: 'root' })
export class ThongTinSangLocVaDanhGiaDDService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/thong-tin-sang-loc-va-danh-gia-dds');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(thongTinSangLocVaDanhGiaDD: IThongTinSangLocVaDanhGiaDD): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(thongTinSangLocVaDanhGiaDD);
    return this.http
      .post<IThongTinSangLocVaDanhGiaDD>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(thongTinSangLocVaDanhGiaDD: IThongTinSangLocVaDanhGiaDD): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(thongTinSangLocVaDanhGiaDD);
    return this.http
      .put<IThongTinSangLocVaDanhGiaDD>(
        `${this.resourceUrl}/${getThongTinSangLocVaDanhGiaDDIdentifier(thongTinSangLocVaDanhGiaDD) as number}`,
        copy,
        { observe: 'response' }
      )
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(thongTinSangLocVaDanhGiaDD: IThongTinSangLocVaDanhGiaDD): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(thongTinSangLocVaDanhGiaDD);
    return this.http
      .patch<IThongTinSangLocVaDanhGiaDD>(
        `${this.resourceUrl}/${getThongTinSangLocVaDanhGiaDDIdentifier(thongTinSangLocVaDanhGiaDD) as number}`,
        copy,
        { observe: 'response' }
      )
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IThongTinSangLocVaDanhGiaDD>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IThongTinSangLocVaDanhGiaDD[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addThongTinSangLocVaDanhGiaDDToCollectionIfMissing(
    thongTinSangLocVaDanhGiaDDCollection: IThongTinSangLocVaDanhGiaDD[],
    ...thongTinSangLocVaDanhGiaDDSToCheck: (IThongTinSangLocVaDanhGiaDD | null | undefined)[]
  ): IThongTinSangLocVaDanhGiaDD[] {
    const thongTinSangLocVaDanhGiaDDS: IThongTinSangLocVaDanhGiaDD[] = thongTinSangLocVaDanhGiaDDSToCheck.filter(isPresent);
    if (thongTinSangLocVaDanhGiaDDS.length > 0) {
      const thongTinSangLocVaDanhGiaDDCollectionIdentifiers = thongTinSangLocVaDanhGiaDDCollection.map(
        thongTinSangLocVaDanhGiaDDItem => getThongTinSangLocVaDanhGiaDDIdentifier(thongTinSangLocVaDanhGiaDDItem)!
      );
      const thongTinSangLocVaDanhGiaDDSToAdd = thongTinSangLocVaDanhGiaDDS.filter(thongTinSangLocVaDanhGiaDDItem => {
        const thongTinSangLocVaDanhGiaDDIdentifier = getThongTinSangLocVaDanhGiaDDIdentifier(thongTinSangLocVaDanhGiaDDItem);
        if (
          thongTinSangLocVaDanhGiaDDIdentifier == null ||
          thongTinSangLocVaDanhGiaDDCollectionIdentifiers.includes(thongTinSangLocVaDanhGiaDDIdentifier)
        ) {
          return false;
        }
        thongTinSangLocVaDanhGiaDDCollectionIdentifiers.push(thongTinSangLocVaDanhGiaDDIdentifier);
        return true;
      });
      return [...thongTinSangLocVaDanhGiaDDSToAdd, ...thongTinSangLocVaDanhGiaDDCollection];
    }
    return thongTinSangLocVaDanhGiaDDCollection;
  }

  protected convertDateFromClient(thongTinSangLocVaDanhGiaDD: IThongTinSangLocVaDanhGiaDD): IThongTinSangLocVaDanhGiaDD {
    return Object.assign({}, thongTinSangLocVaDanhGiaDD, {
      thoiGianChiDinh: thongTinSangLocVaDanhGiaDD.thoiGianChiDinh?.isValid()
        ? thongTinSangLocVaDanhGiaDD.thoiGianChiDinh.toJSON()
        : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.thoiGianChiDinh = res.body.thoiGianChiDinh ? dayjs(res.body.thoiGianChiDinh) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((thongTinSangLocVaDanhGiaDD: IThongTinSangLocVaDanhGiaDD) => {
        thongTinSangLocVaDanhGiaDD.thoiGianChiDinh = thongTinSangLocVaDanhGiaDD.thoiGianChiDinh
          ? dayjs(thongTinSangLocVaDanhGiaDD.thoiGianChiDinh)
          : undefined;
      });
    }
    return res;
  }
}
