package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ThongTinSangLocVaDanhGiaDDTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ThongTinSangLocVaDanhGiaDD.class);
        ThongTinSangLocVaDanhGiaDD thongTinSangLocVaDanhGiaDD1 = new ThongTinSangLocVaDanhGiaDD();
        thongTinSangLocVaDanhGiaDD1.setId(1L);
        ThongTinSangLocVaDanhGiaDD thongTinSangLocVaDanhGiaDD2 = new ThongTinSangLocVaDanhGiaDD();
        thongTinSangLocVaDanhGiaDD2.setId(thongTinSangLocVaDanhGiaDD1.getId());
        assertThat(thongTinSangLocVaDanhGiaDD1).isEqualTo(thongTinSangLocVaDanhGiaDD2);
        thongTinSangLocVaDanhGiaDD2.setId(2L);
        assertThat(thongTinSangLocVaDanhGiaDD1).isNotEqualTo(thongTinSangLocVaDanhGiaDD2);
        thongTinSangLocVaDanhGiaDD1.setId(null);
        assertThat(thongTinSangLocVaDanhGiaDD1).isNotEqualTo(thongTinSangLocVaDanhGiaDD2);
    }
}
