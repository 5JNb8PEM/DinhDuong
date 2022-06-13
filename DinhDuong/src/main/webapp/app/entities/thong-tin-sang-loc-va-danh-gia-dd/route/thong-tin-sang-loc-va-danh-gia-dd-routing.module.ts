import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ThongTinSangLocVaDanhGiaDDComponent } from '../list/thong-tin-sang-loc-va-danh-gia-dd.component';
import { ThongTinSangLocVaDanhGiaDDDetailComponent } from '../detail/thong-tin-sang-loc-va-danh-gia-dd-detail.component';
import { ThongTinSangLocVaDanhGiaDDUpdateComponent } from '../update/thong-tin-sang-loc-va-danh-gia-dd-update.component';
import { ThongTinSangLocVaDanhGiaDDRoutingResolveService } from './thong-tin-sang-loc-va-danh-gia-dd-routing-resolve.service';

const thongTinSangLocVaDanhGiaDDRoute: Routes = [
  {
    path: '',
    component: ThongTinSangLocVaDanhGiaDDComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ThongTinSangLocVaDanhGiaDDDetailComponent,
    resolve: {
      thongTinSangLocVaDanhGiaDD: ThongTinSangLocVaDanhGiaDDRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ThongTinSangLocVaDanhGiaDDUpdateComponent,
    resolve: {
      thongTinSangLocVaDanhGiaDD: ThongTinSangLocVaDanhGiaDDRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ThongTinSangLocVaDanhGiaDDUpdateComponent,
    resolve: {
      thongTinSangLocVaDanhGiaDD: ThongTinSangLocVaDanhGiaDDRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(thongTinSangLocVaDanhGiaDDRoute)],
  exports: [RouterModule],
})
export class ThongTinSangLocVaDanhGiaDDRoutingModule {}
