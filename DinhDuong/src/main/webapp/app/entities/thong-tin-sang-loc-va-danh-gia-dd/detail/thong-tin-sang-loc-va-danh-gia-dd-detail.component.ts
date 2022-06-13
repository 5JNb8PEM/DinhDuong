import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IThongTinSangLocVaDanhGiaDD } from '../thong-tin-sang-loc-va-danh-gia-dd.model';

@Component({
  selector: 'jhi-thong-tin-sang-loc-va-danh-gia-dd-detail',
  templateUrl: './thong-tin-sang-loc-va-danh-gia-dd-detail.component.html',
})
export class ThongTinSangLocVaDanhGiaDDDetailComponent implements OnInit {
  thongTinSangLocVaDanhGiaDD: IThongTinSangLocVaDanhGiaDD | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ thongTinSangLocVaDanhGiaDD }) => {
      this.thongTinSangLocVaDanhGiaDD = thongTinSangLocVaDanhGiaDD;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
