import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IThongTinSangLocVaDanhGiaDD } from '../thong-tin-sang-loc-va-danh-gia-dd.model';
import { ThongTinSangLocVaDanhGiaDDService } from '../service/thong-tin-sang-loc-va-danh-gia-dd.service';

@Component({
  templateUrl: './thong-tin-sang-loc-va-danh-gia-dd-delete-dialog.component.html',
})
export class ThongTinSangLocVaDanhGiaDDDeleteDialogComponent {
  thongTinSangLocVaDanhGiaDD?: IThongTinSangLocVaDanhGiaDD;

  constructor(protected thongTinSangLocVaDanhGiaDDService: ThongTinSangLocVaDanhGiaDDService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.thongTinSangLocVaDanhGiaDDService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
