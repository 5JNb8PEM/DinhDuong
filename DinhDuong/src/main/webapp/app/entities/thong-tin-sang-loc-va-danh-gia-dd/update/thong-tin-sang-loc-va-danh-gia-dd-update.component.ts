import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IThongTinSangLocVaDanhGiaDD, ThongTinSangLocVaDanhGiaDD } from '../thong-tin-sang-loc-va-danh-gia-dd.model';
import { ThongTinSangLocVaDanhGiaDDService } from '../service/thong-tin-sang-loc-va-danh-gia-dd.service';
import { IDanhGiaCanThiepDD } from 'app/entities/danh-gia-can-thiep-dd/danh-gia-can-thiep-dd.model';
import { DanhGiaCanThiepDDService } from 'app/entities/danh-gia-can-thiep-dd/service/danh-gia-can-thiep-dd.service';

@Component({
  selector: 'jhi-thong-tin-sang-loc-va-danh-gia-dd-update',
  templateUrl: './thong-tin-sang-loc-va-danh-gia-dd-update.component.html',
})
export class ThongTinSangLocVaDanhGiaDDUpdateComponent implements OnInit {
  isSaving = false;

  danhGiaCanThiepDDSCollection: IDanhGiaCanThiepDD[] = [];

  editForm = this.fb.group({
    id: [],
    maBN: [],
    mangThai: [],
    bMI: [],
    danhGiaBMI: [],
    phanTramCanNangTrong3Thang: [],
    danhGiaCanNang: [],
    anUongTrongTuan: [],
    danhGiaAnUong: [],
    thoiGianChiDinh: [],
    nguyCoSDD: [],
    cheDoAn: [],
    danhGiaCanThiepDD: [],
  });

  constructor(
    protected thongTinSangLocVaDanhGiaDDService: ThongTinSangLocVaDanhGiaDDService,
    protected danhGiaCanThiepDDService: DanhGiaCanThiepDDService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ thongTinSangLocVaDanhGiaDD }) => {
      if (thongTinSangLocVaDanhGiaDD.id === undefined) {
        const today = dayjs().startOf('day');
        thongTinSangLocVaDanhGiaDD.thoiGianChiDinh = today;
      }

      this.updateForm(thongTinSangLocVaDanhGiaDD);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const thongTinSangLocVaDanhGiaDD = this.createFromForm();
    if (thongTinSangLocVaDanhGiaDD.id !== undefined) {
      this.subscribeToSaveResponse(this.thongTinSangLocVaDanhGiaDDService.update(thongTinSangLocVaDanhGiaDD));
    } else {
      this.subscribeToSaveResponse(this.thongTinSangLocVaDanhGiaDDService.create(thongTinSangLocVaDanhGiaDD));
    }
  }

  trackDanhGiaCanThiepDDById(_index: number, item: IDanhGiaCanThiepDD): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IThongTinSangLocVaDanhGiaDD>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(thongTinSangLocVaDanhGiaDD: IThongTinSangLocVaDanhGiaDD): void {
    this.editForm.patchValue({
      id: thongTinSangLocVaDanhGiaDD.id,
      maBN: thongTinSangLocVaDanhGiaDD.maBN,
      mangThai: thongTinSangLocVaDanhGiaDD.mangThai,
      bMI: thongTinSangLocVaDanhGiaDD.bMI,
      danhGiaBMI: thongTinSangLocVaDanhGiaDD.danhGiaBMI,
      phanTramCanNangTrong3Thang: thongTinSangLocVaDanhGiaDD.phanTramCanNangTrong3Thang,
      danhGiaCanNang: thongTinSangLocVaDanhGiaDD.danhGiaCanNang,
      anUongTrongTuan: thongTinSangLocVaDanhGiaDD.anUongTrongTuan,
      danhGiaAnUong: thongTinSangLocVaDanhGiaDD.danhGiaAnUong,
      thoiGianChiDinh: thongTinSangLocVaDanhGiaDD.thoiGianChiDinh
        ? thongTinSangLocVaDanhGiaDD.thoiGianChiDinh.format(DATE_TIME_FORMAT)
        : null,
      nguyCoSDD: thongTinSangLocVaDanhGiaDD.nguyCoSDD,
      cheDoAn: thongTinSangLocVaDanhGiaDD.cheDoAn,
      danhGiaCanThiepDD: thongTinSangLocVaDanhGiaDD.danhGiaCanThiepDD,
    });

    this.danhGiaCanThiepDDSCollection = this.danhGiaCanThiepDDService.addDanhGiaCanThiepDDToCollectionIfMissing(
      this.danhGiaCanThiepDDSCollection,
      thongTinSangLocVaDanhGiaDD.danhGiaCanThiepDD
    );
  }

  protected loadRelationshipsOptions(): void {
    this.danhGiaCanThiepDDService
      .query({ filter: 'thongtinsanglocvadanhgiadd-is-null' })
      .pipe(map((res: HttpResponse<IDanhGiaCanThiepDD[]>) => res.body ?? []))
      .pipe(
        map((danhGiaCanThiepDDS: IDanhGiaCanThiepDD[]) =>
          this.danhGiaCanThiepDDService.addDanhGiaCanThiepDDToCollectionIfMissing(
            danhGiaCanThiepDDS,
            this.editForm.get('danhGiaCanThiepDD')!.value
          )
        )
      )
      .subscribe((danhGiaCanThiepDDS: IDanhGiaCanThiepDD[]) => (this.danhGiaCanThiepDDSCollection = danhGiaCanThiepDDS));
  }

  protected createFromForm(): IThongTinSangLocVaDanhGiaDD {
    return {
      ...new ThongTinSangLocVaDanhGiaDD(),
      id: this.editForm.get(['id'])!.value,
      maBN: this.editForm.get(['maBN'])!.value,
      mangThai: this.editForm.get(['mangThai'])!.value,
      bMI: this.editForm.get(['bMI'])!.value,
      danhGiaBMI: this.editForm.get(['danhGiaBMI'])!.value,
      phanTramCanNangTrong3Thang: this.editForm.get(['phanTramCanNangTrong3Thang'])!.value,
      danhGiaCanNang: this.editForm.get(['danhGiaCanNang'])!.value,
      anUongTrongTuan: this.editForm.get(['anUongTrongTuan'])!.value,
      danhGiaAnUong: this.editForm.get(['danhGiaAnUong'])!.value,
      thoiGianChiDinh: this.editForm.get(['thoiGianChiDinh'])!.value
        ? dayjs(this.editForm.get(['thoiGianChiDinh'])!.value, DATE_TIME_FORMAT)
        : undefined,
      nguyCoSDD: this.editForm.get(['nguyCoSDD'])!.value,
      cheDoAn: this.editForm.get(['cheDoAn'])!.value,
      danhGiaCanThiepDD: this.editForm.get(['danhGiaCanThiepDD'])!.value,
    };
  }
}
