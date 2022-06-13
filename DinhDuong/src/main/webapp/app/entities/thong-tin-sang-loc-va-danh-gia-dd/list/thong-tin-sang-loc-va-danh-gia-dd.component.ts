import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IThongTinSangLocVaDanhGiaDD } from '../thong-tin-sang-loc-va-danh-gia-dd.model';
import { ThongTinSangLocVaDanhGiaDDService } from '../service/thong-tin-sang-loc-va-danh-gia-dd.service';
import { ThongTinSangLocVaDanhGiaDDDeleteDialogComponent } from '../delete/thong-tin-sang-loc-va-danh-gia-dd-delete-dialog.component';

@Component({
  selector: 'jhi-thong-tin-sang-loc-va-danh-gia-dd',
  templateUrl: './thong-tin-sang-loc-va-danh-gia-dd.component.html',
})
export class ThongTinSangLocVaDanhGiaDDComponent implements OnInit {
  thongTinSangLocVaDanhGiaDDS?: IThongTinSangLocVaDanhGiaDD[];
  isLoading = false;

  constructor(protected thongTinSangLocVaDanhGiaDDService: ThongTinSangLocVaDanhGiaDDService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.thongTinSangLocVaDanhGiaDDService.query().subscribe({
      next: (res: HttpResponse<IThongTinSangLocVaDanhGiaDD[]>) => {
        this.isLoading = false;
        this.thongTinSangLocVaDanhGiaDDS = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IThongTinSangLocVaDanhGiaDD): number {
    return item.id!;
  }

  delete(thongTinSangLocVaDanhGiaDD: IThongTinSangLocVaDanhGiaDD): void {
    const modalRef = this.modalService.open(ThongTinSangLocVaDanhGiaDDDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.thongTinSangLocVaDanhGiaDD = thongTinSangLocVaDanhGiaDD;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
