import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ThongTinSangLocVaDanhGiaDDComponent } from './list/thong-tin-sang-loc-va-danh-gia-dd.component';
import { ThongTinSangLocVaDanhGiaDDDetailComponent } from './detail/thong-tin-sang-loc-va-danh-gia-dd-detail.component';
import { ThongTinSangLocVaDanhGiaDDUpdateComponent } from './update/thong-tin-sang-loc-va-danh-gia-dd-update.component';
import { ThongTinSangLocVaDanhGiaDDDeleteDialogComponent } from './delete/thong-tin-sang-loc-va-danh-gia-dd-delete-dialog.component';
import { ThongTinSangLocVaDanhGiaDDRoutingModule } from './route/thong-tin-sang-loc-va-danh-gia-dd-routing.module';

@NgModule({
  imports: [SharedModule, ThongTinSangLocVaDanhGiaDDRoutingModule],
  declarations: [
    ThongTinSangLocVaDanhGiaDDComponent,
    ThongTinSangLocVaDanhGiaDDDetailComponent,
    ThongTinSangLocVaDanhGiaDDUpdateComponent,
    ThongTinSangLocVaDanhGiaDDDeleteDialogComponent,
  ],
  entryComponents: [ThongTinSangLocVaDanhGiaDDDeleteDialogComponent],
})
export class ThongTinSangLocVaDanhGiaDDModule {}
