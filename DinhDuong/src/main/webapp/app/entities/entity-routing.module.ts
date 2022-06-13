import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'benh-nhan',
        data: { pageTitle: 'dinhDuongApp.benhNhan.home.title' },
        loadChildren: () => import('./benh-nhan/benh-nhan.module').then(m => m.BenhNhanModule),
      },
      {
        path: 'dieu-tri',
        data: { pageTitle: 'dinhDuongApp.dieuTri.home.title' },
        loadChildren: () => import('./dieu-tri/dieu-tri.module').then(m => m.DieuTriModule),
      },
      {
        path: 'thong-tin-sang-loc-va-danh-gia-dd',
        data: { pageTitle: 'dinhDuongApp.thongTinSangLocVaDanhGiaDD.home.title' },
        loadChildren: () =>
          import('./thong-tin-sang-loc-va-danh-gia-dd/thong-tin-sang-loc-va-danh-gia-dd.module').then(
            m => m.ThongTinSangLocVaDanhGiaDDModule
          ),
      },
      {
        path: 'giay-moi-danh-gia',
        data: { pageTitle: 'dinhDuongApp.giayMoiDanhGia.home.title' },
        loadChildren: () => import('./giay-moi-danh-gia/giay-moi-danh-gia.module').then(m => m.GiayMoiDanhGiaModule),
      },
      {
        path: 'hoa-don',
        data: { pageTitle: 'dinhDuongApp.hoaDon.home.title' },
        loadChildren: () => import('./hoa-don/hoa-don.module').then(m => m.HoaDonModule),
      },
      {
        path: 'danh-gia-can-thiep-dd',
        data: { pageTitle: 'dinhDuongApp.danhGiaCanThiepDD.home.title' },
        loadChildren: () => import('./danh-gia-can-thiep-dd/danh-gia-can-thiep-dd.module').then(m => m.DanhGiaCanThiepDDModule),
      },
      {
        path: 'toa-thuoc',
        data: { pageTitle: 'dinhDuongApp.toaThuoc.home.title' },
        loadChildren: () => import('./toa-thuoc/toa-thuoc.module').then(m => m.ToaThuocModule),
      },
      {
        path: 'thuoc',
        data: { pageTitle: 'dinhDuongApp.thuoc.home.title' },
        loadChildren: () => import('./thuoc/thuoc.module').then(m => m.ThuocModule),
      },
      {
        path: 'phieu-suat-an',
        data: { pageTitle: 'dinhDuongApp.phieuSuatAn.home.title' },
        loadChildren: () => import('./phieu-suat-an/phieu-suat-an.module').then(m => m.PhieuSuatAnModule),
      },
      {
        path: 'bao-hiem',
        data: { pageTitle: 'dinhDuongApp.baoHiem.home.title' },
        loadChildren: () => import('./bao-hiem/bao-hiem.module').then(m => m.BaoHiemModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
