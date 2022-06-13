package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.ThongTinSangLocVaDanhGiaDD;
import com.mycompany.myapp.repository.ThongTinSangLocVaDanhGiaDDRepository;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link ThongTinSangLocVaDanhGiaDDResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ThongTinSangLocVaDanhGiaDDResourceIT {

    private static final String DEFAULT_MA_BN = "AAAAAAAAAA";
    private static final String UPDATED_MA_BN = "BBBBBBBBBB";

    private static final Boolean DEFAULT_MANG_THAI = false;
    private static final Boolean UPDATED_MANG_THAI = true;

    private static final Float DEFAULT_B_MI = 1F;
    private static final Float UPDATED_B_MI = 2F;

    private static final Integer DEFAULT_DANH_GIA_BMI = 1;
    private static final Integer UPDATED_DANH_GIA_BMI = 2;

    private static final Float DEFAULT_PHAN_TRAM_CAN_NANG_TRONG_3_THANG = 1F;
    private static final Float UPDATED_PHAN_TRAM_CAN_NANG_TRONG_3_THANG = 2F;

    private static final Integer DEFAULT_DANH_GIA_CAN_NANG = 1;
    private static final Integer UPDATED_DANH_GIA_CAN_NANG = 2;

    private static final String DEFAULT_AN_UONG_TRONG_TUAN = "AAAAAAAAAA";
    private static final String UPDATED_AN_UONG_TRONG_TUAN = "BBBBBBBBBB";

    private static final Integer DEFAULT_DANH_GIA_AN_UONG = 1;
    private static final Integer UPDATED_DANH_GIA_AN_UONG = 2;

    private static final ZonedDateTime DEFAULT_THOI_GIAN_CHI_DINH = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_THOI_GIAN_CHI_DINH = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Boolean DEFAULT_NGUY_CO_SDD = false;
    private static final Boolean UPDATED_NGUY_CO_SDD = true;

    private static final String DEFAULT_CHE_DO_AN = "AAAAAAAAAA";
    private static final String UPDATED_CHE_DO_AN = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/thong-tin-sang-loc-va-danh-gia-dds";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ThongTinSangLocVaDanhGiaDDRepository thongTinSangLocVaDanhGiaDDRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restThongTinSangLocVaDanhGiaDDMockMvc;

    private ThongTinSangLocVaDanhGiaDD thongTinSangLocVaDanhGiaDD;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ThongTinSangLocVaDanhGiaDD createEntity(EntityManager em) {
        ThongTinSangLocVaDanhGiaDD thongTinSangLocVaDanhGiaDD = new ThongTinSangLocVaDanhGiaDD()
            .maBN(DEFAULT_MA_BN)
            .mangThai(DEFAULT_MANG_THAI)
            .bMI(DEFAULT_B_MI)
            .danhGiaBMI(DEFAULT_DANH_GIA_BMI)
            .phanTramCanNangTrong3Thang(DEFAULT_PHAN_TRAM_CAN_NANG_TRONG_3_THANG)
            .danhGiaCanNang(DEFAULT_DANH_GIA_CAN_NANG)
            .anUongTrongTuan(DEFAULT_AN_UONG_TRONG_TUAN)
            .danhGiaAnUong(DEFAULT_DANH_GIA_AN_UONG)
            .thoiGianChiDinh(DEFAULT_THOI_GIAN_CHI_DINH)
            .nguyCoSDD(DEFAULT_NGUY_CO_SDD)
            .cheDoAn(DEFAULT_CHE_DO_AN);
        return thongTinSangLocVaDanhGiaDD;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ThongTinSangLocVaDanhGiaDD createUpdatedEntity(EntityManager em) {
        ThongTinSangLocVaDanhGiaDD thongTinSangLocVaDanhGiaDD = new ThongTinSangLocVaDanhGiaDD()
            .maBN(UPDATED_MA_BN)
            .mangThai(UPDATED_MANG_THAI)
            .bMI(UPDATED_B_MI)
            .danhGiaBMI(UPDATED_DANH_GIA_BMI)
            .phanTramCanNangTrong3Thang(UPDATED_PHAN_TRAM_CAN_NANG_TRONG_3_THANG)
            .danhGiaCanNang(UPDATED_DANH_GIA_CAN_NANG)
            .anUongTrongTuan(UPDATED_AN_UONG_TRONG_TUAN)
            .danhGiaAnUong(UPDATED_DANH_GIA_AN_UONG)
            .thoiGianChiDinh(UPDATED_THOI_GIAN_CHI_DINH)
            .nguyCoSDD(UPDATED_NGUY_CO_SDD)
            .cheDoAn(UPDATED_CHE_DO_AN);
        return thongTinSangLocVaDanhGiaDD;
    }

    @BeforeEach
    public void initTest() {
        thongTinSangLocVaDanhGiaDD = createEntity(em);
    }

    @Test
    @Transactional
    void createThongTinSangLocVaDanhGiaDD() throws Exception {
        int databaseSizeBeforeCreate = thongTinSangLocVaDanhGiaDDRepository.findAll().size();
        // Create the ThongTinSangLocVaDanhGiaDD
        restThongTinSangLocVaDanhGiaDDMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(thongTinSangLocVaDanhGiaDD))
            )
            .andExpect(status().isCreated());

        // Validate the ThongTinSangLocVaDanhGiaDD in the database
        List<ThongTinSangLocVaDanhGiaDD> thongTinSangLocVaDanhGiaDDList = thongTinSangLocVaDanhGiaDDRepository.findAll();
        assertThat(thongTinSangLocVaDanhGiaDDList).hasSize(databaseSizeBeforeCreate + 1);
        ThongTinSangLocVaDanhGiaDD testThongTinSangLocVaDanhGiaDD = thongTinSangLocVaDanhGiaDDList.get(
            thongTinSangLocVaDanhGiaDDList.size() - 1
        );
        assertThat(testThongTinSangLocVaDanhGiaDD.getMaBN()).isEqualTo(DEFAULT_MA_BN);
        assertThat(testThongTinSangLocVaDanhGiaDD.getMangThai()).isEqualTo(DEFAULT_MANG_THAI);
        assertThat(testThongTinSangLocVaDanhGiaDD.getbMI()).isEqualTo(DEFAULT_B_MI);
        assertThat(testThongTinSangLocVaDanhGiaDD.getDanhGiaBMI()).isEqualTo(DEFAULT_DANH_GIA_BMI);
        assertThat(testThongTinSangLocVaDanhGiaDD.getPhanTramCanNangTrong3Thang()).isEqualTo(DEFAULT_PHAN_TRAM_CAN_NANG_TRONG_3_THANG);
        assertThat(testThongTinSangLocVaDanhGiaDD.getDanhGiaCanNang()).isEqualTo(DEFAULT_DANH_GIA_CAN_NANG);
        assertThat(testThongTinSangLocVaDanhGiaDD.getAnUongTrongTuan()).isEqualTo(DEFAULT_AN_UONG_TRONG_TUAN);
        assertThat(testThongTinSangLocVaDanhGiaDD.getDanhGiaAnUong()).isEqualTo(DEFAULT_DANH_GIA_AN_UONG);
        assertThat(testThongTinSangLocVaDanhGiaDD.getThoiGianChiDinh()).isEqualTo(DEFAULT_THOI_GIAN_CHI_DINH);
        assertThat(testThongTinSangLocVaDanhGiaDD.getNguyCoSDD()).isEqualTo(DEFAULT_NGUY_CO_SDD);
        assertThat(testThongTinSangLocVaDanhGiaDD.getCheDoAn()).isEqualTo(DEFAULT_CHE_DO_AN);
    }

    @Test
    @Transactional
    void createThongTinSangLocVaDanhGiaDDWithExistingId() throws Exception {
        // Create the ThongTinSangLocVaDanhGiaDD with an existing ID
        thongTinSangLocVaDanhGiaDD.setId(1L);

        int databaseSizeBeforeCreate = thongTinSangLocVaDanhGiaDDRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restThongTinSangLocVaDanhGiaDDMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(thongTinSangLocVaDanhGiaDD))
            )
            .andExpect(status().isBadRequest());

        // Validate the ThongTinSangLocVaDanhGiaDD in the database
        List<ThongTinSangLocVaDanhGiaDD> thongTinSangLocVaDanhGiaDDList = thongTinSangLocVaDanhGiaDDRepository.findAll();
        assertThat(thongTinSangLocVaDanhGiaDDList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllThongTinSangLocVaDanhGiaDDS() throws Exception {
        // Initialize the database
        thongTinSangLocVaDanhGiaDDRepository.saveAndFlush(thongTinSangLocVaDanhGiaDD);

        // Get all the thongTinSangLocVaDanhGiaDDList
        restThongTinSangLocVaDanhGiaDDMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(thongTinSangLocVaDanhGiaDD.getId().intValue())))
            .andExpect(jsonPath("$.[*].maBN").value(hasItem(DEFAULT_MA_BN)))
            .andExpect(jsonPath("$.[*].mangThai").value(hasItem(DEFAULT_MANG_THAI.booleanValue())))
            .andExpect(jsonPath("$.[*].bMI").value(hasItem(DEFAULT_B_MI.doubleValue())))
            .andExpect(jsonPath("$.[*].danhGiaBMI").value(hasItem(DEFAULT_DANH_GIA_BMI)))
            .andExpect(jsonPath("$.[*].phanTramCanNangTrong3Thang").value(hasItem(DEFAULT_PHAN_TRAM_CAN_NANG_TRONG_3_THANG.doubleValue())))
            .andExpect(jsonPath("$.[*].danhGiaCanNang").value(hasItem(DEFAULT_DANH_GIA_CAN_NANG)))
            .andExpect(jsonPath("$.[*].anUongTrongTuan").value(hasItem(DEFAULT_AN_UONG_TRONG_TUAN)))
            .andExpect(jsonPath("$.[*].danhGiaAnUong").value(hasItem(DEFAULT_DANH_GIA_AN_UONG)))
            .andExpect(jsonPath("$.[*].thoiGianChiDinh").value(hasItem(sameInstant(DEFAULT_THOI_GIAN_CHI_DINH))))
            .andExpect(jsonPath("$.[*].nguyCoSDD").value(hasItem(DEFAULT_NGUY_CO_SDD.booleanValue())))
            .andExpect(jsonPath("$.[*].cheDoAn").value(hasItem(DEFAULT_CHE_DO_AN)));
    }

    @Test
    @Transactional
    void getThongTinSangLocVaDanhGiaDD() throws Exception {
        // Initialize the database
        thongTinSangLocVaDanhGiaDDRepository.saveAndFlush(thongTinSangLocVaDanhGiaDD);

        // Get the thongTinSangLocVaDanhGiaDD
        restThongTinSangLocVaDanhGiaDDMockMvc
            .perform(get(ENTITY_API_URL_ID, thongTinSangLocVaDanhGiaDD.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(thongTinSangLocVaDanhGiaDD.getId().intValue()))
            .andExpect(jsonPath("$.maBN").value(DEFAULT_MA_BN))
            .andExpect(jsonPath("$.mangThai").value(DEFAULT_MANG_THAI.booleanValue()))
            .andExpect(jsonPath("$.bMI").value(DEFAULT_B_MI.doubleValue()))
            .andExpect(jsonPath("$.danhGiaBMI").value(DEFAULT_DANH_GIA_BMI))
            .andExpect(jsonPath("$.phanTramCanNangTrong3Thang").value(DEFAULT_PHAN_TRAM_CAN_NANG_TRONG_3_THANG.doubleValue()))
            .andExpect(jsonPath("$.danhGiaCanNang").value(DEFAULT_DANH_GIA_CAN_NANG))
            .andExpect(jsonPath("$.anUongTrongTuan").value(DEFAULT_AN_UONG_TRONG_TUAN))
            .andExpect(jsonPath("$.danhGiaAnUong").value(DEFAULT_DANH_GIA_AN_UONG))
            .andExpect(jsonPath("$.thoiGianChiDinh").value(sameInstant(DEFAULT_THOI_GIAN_CHI_DINH)))
            .andExpect(jsonPath("$.nguyCoSDD").value(DEFAULT_NGUY_CO_SDD.booleanValue()))
            .andExpect(jsonPath("$.cheDoAn").value(DEFAULT_CHE_DO_AN));
    }

    @Test
    @Transactional
    void getNonExistingThongTinSangLocVaDanhGiaDD() throws Exception {
        // Get the thongTinSangLocVaDanhGiaDD
        restThongTinSangLocVaDanhGiaDDMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewThongTinSangLocVaDanhGiaDD() throws Exception {
        // Initialize the database
        thongTinSangLocVaDanhGiaDDRepository.saveAndFlush(thongTinSangLocVaDanhGiaDD);

        int databaseSizeBeforeUpdate = thongTinSangLocVaDanhGiaDDRepository.findAll().size();

        // Update the thongTinSangLocVaDanhGiaDD
        ThongTinSangLocVaDanhGiaDD updatedThongTinSangLocVaDanhGiaDD = thongTinSangLocVaDanhGiaDDRepository
            .findById(thongTinSangLocVaDanhGiaDD.getId())
            .get();
        // Disconnect from session so that the updates on updatedThongTinSangLocVaDanhGiaDD are not directly saved in db
        em.detach(updatedThongTinSangLocVaDanhGiaDD);
        updatedThongTinSangLocVaDanhGiaDD
            .maBN(UPDATED_MA_BN)
            .mangThai(UPDATED_MANG_THAI)
            .bMI(UPDATED_B_MI)
            .danhGiaBMI(UPDATED_DANH_GIA_BMI)
            .phanTramCanNangTrong3Thang(UPDATED_PHAN_TRAM_CAN_NANG_TRONG_3_THANG)
            .danhGiaCanNang(UPDATED_DANH_GIA_CAN_NANG)
            .anUongTrongTuan(UPDATED_AN_UONG_TRONG_TUAN)
            .danhGiaAnUong(UPDATED_DANH_GIA_AN_UONG)
            .thoiGianChiDinh(UPDATED_THOI_GIAN_CHI_DINH)
            .nguyCoSDD(UPDATED_NGUY_CO_SDD)
            .cheDoAn(UPDATED_CHE_DO_AN);

        restThongTinSangLocVaDanhGiaDDMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedThongTinSangLocVaDanhGiaDD.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedThongTinSangLocVaDanhGiaDD))
            )
            .andExpect(status().isOk());

        // Validate the ThongTinSangLocVaDanhGiaDD in the database
        List<ThongTinSangLocVaDanhGiaDD> thongTinSangLocVaDanhGiaDDList = thongTinSangLocVaDanhGiaDDRepository.findAll();
        assertThat(thongTinSangLocVaDanhGiaDDList).hasSize(databaseSizeBeforeUpdate);
        ThongTinSangLocVaDanhGiaDD testThongTinSangLocVaDanhGiaDD = thongTinSangLocVaDanhGiaDDList.get(
            thongTinSangLocVaDanhGiaDDList.size() - 1
        );
        assertThat(testThongTinSangLocVaDanhGiaDD.getMaBN()).isEqualTo(UPDATED_MA_BN);
        assertThat(testThongTinSangLocVaDanhGiaDD.getMangThai()).isEqualTo(UPDATED_MANG_THAI);
        assertThat(testThongTinSangLocVaDanhGiaDD.getbMI()).isEqualTo(UPDATED_B_MI);
        assertThat(testThongTinSangLocVaDanhGiaDD.getDanhGiaBMI()).isEqualTo(UPDATED_DANH_GIA_BMI);
        assertThat(testThongTinSangLocVaDanhGiaDD.getPhanTramCanNangTrong3Thang()).isEqualTo(UPDATED_PHAN_TRAM_CAN_NANG_TRONG_3_THANG);
        assertThat(testThongTinSangLocVaDanhGiaDD.getDanhGiaCanNang()).isEqualTo(UPDATED_DANH_GIA_CAN_NANG);
        assertThat(testThongTinSangLocVaDanhGiaDD.getAnUongTrongTuan()).isEqualTo(UPDATED_AN_UONG_TRONG_TUAN);
        assertThat(testThongTinSangLocVaDanhGiaDD.getDanhGiaAnUong()).isEqualTo(UPDATED_DANH_GIA_AN_UONG);
        assertThat(testThongTinSangLocVaDanhGiaDD.getThoiGianChiDinh()).isEqualTo(UPDATED_THOI_GIAN_CHI_DINH);
        assertThat(testThongTinSangLocVaDanhGiaDD.getNguyCoSDD()).isEqualTo(UPDATED_NGUY_CO_SDD);
        assertThat(testThongTinSangLocVaDanhGiaDD.getCheDoAn()).isEqualTo(UPDATED_CHE_DO_AN);
    }

    @Test
    @Transactional
    void putNonExistingThongTinSangLocVaDanhGiaDD() throws Exception {
        int databaseSizeBeforeUpdate = thongTinSangLocVaDanhGiaDDRepository.findAll().size();
        thongTinSangLocVaDanhGiaDD.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restThongTinSangLocVaDanhGiaDDMockMvc
            .perform(
                put(ENTITY_API_URL_ID, thongTinSangLocVaDanhGiaDD.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(thongTinSangLocVaDanhGiaDD))
            )
            .andExpect(status().isBadRequest());

        // Validate the ThongTinSangLocVaDanhGiaDD in the database
        List<ThongTinSangLocVaDanhGiaDD> thongTinSangLocVaDanhGiaDDList = thongTinSangLocVaDanhGiaDDRepository.findAll();
        assertThat(thongTinSangLocVaDanhGiaDDList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchThongTinSangLocVaDanhGiaDD() throws Exception {
        int databaseSizeBeforeUpdate = thongTinSangLocVaDanhGiaDDRepository.findAll().size();
        thongTinSangLocVaDanhGiaDD.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restThongTinSangLocVaDanhGiaDDMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(thongTinSangLocVaDanhGiaDD))
            )
            .andExpect(status().isBadRequest());

        // Validate the ThongTinSangLocVaDanhGiaDD in the database
        List<ThongTinSangLocVaDanhGiaDD> thongTinSangLocVaDanhGiaDDList = thongTinSangLocVaDanhGiaDDRepository.findAll();
        assertThat(thongTinSangLocVaDanhGiaDDList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamThongTinSangLocVaDanhGiaDD() throws Exception {
        int databaseSizeBeforeUpdate = thongTinSangLocVaDanhGiaDDRepository.findAll().size();
        thongTinSangLocVaDanhGiaDD.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restThongTinSangLocVaDanhGiaDDMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(thongTinSangLocVaDanhGiaDD))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ThongTinSangLocVaDanhGiaDD in the database
        List<ThongTinSangLocVaDanhGiaDD> thongTinSangLocVaDanhGiaDDList = thongTinSangLocVaDanhGiaDDRepository.findAll();
        assertThat(thongTinSangLocVaDanhGiaDDList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateThongTinSangLocVaDanhGiaDDWithPatch() throws Exception {
        // Initialize the database
        thongTinSangLocVaDanhGiaDDRepository.saveAndFlush(thongTinSangLocVaDanhGiaDD);

        int databaseSizeBeforeUpdate = thongTinSangLocVaDanhGiaDDRepository.findAll().size();

        // Update the thongTinSangLocVaDanhGiaDD using partial update
        ThongTinSangLocVaDanhGiaDD partialUpdatedThongTinSangLocVaDanhGiaDD = new ThongTinSangLocVaDanhGiaDD();
        partialUpdatedThongTinSangLocVaDanhGiaDD.setId(thongTinSangLocVaDanhGiaDD.getId());

        partialUpdatedThongTinSangLocVaDanhGiaDD
            .bMI(UPDATED_B_MI)
            .danhGiaBMI(UPDATED_DANH_GIA_BMI)
            .anUongTrongTuan(UPDATED_AN_UONG_TRONG_TUAN);

        restThongTinSangLocVaDanhGiaDDMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedThongTinSangLocVaDanhGiaDD.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedThongTinSangLocVaDanhGiaDD))
            )
            .andExpect(status().isOk());

        // Validate the ThongTinSangLocVaDanhGiaDD in the database
        List<ThongTinSangLocVaDanhGiaDD> thongTinSangLocVaDanhGiaDDList = thongTinSangLocVaDanhGiaDDRepository.findAll();
        assertThat(thongTinSangLocVaDanhGiaDDList).hasSize(databaseSizeBeforeUpdate);
        ThongTinSangLocVaDanhGiaDD testThongTinSangLocVaDanhGiaDD = thongTinSangLocVaDanhGiaDDList.get(
            thongTinSangLocVaDanhGiaDDList.size() - 1
        );
        assertThat(testThongTinSangLocVaDanhGiaDD.getMaBN()).isEqualTo(DEFAULT_MA_BN);
        assertThat(testThongTinSangLocVaDanhGiaDD.getMangThai()).isEqualTo(DEFAULT_MANG_THAI);
        assertThat(testThongTinSangLocVaDanhGiaDD.getbMI()).isEqualTo(UPDATED_B_MI);
        assertThat(testThongTinSangLocVaDanhGiaDD.getDanhGiaBMI()).isEqualTo(UPDATED_DANH_GIA_BMI);
        assertThat(testThongTinSangLocVaDanhGiaDD.getPhanTramCanNangTrong3Thang()).isEqualTo(DEFAULT_PHAN_TRAM_CAN_NANG_TRONG_3_THANG);
        assertThat(testThongTinSangLocVaDanhGiaDD.getDanhGiaCanNang()).isEqualTo(DEFAULT_DANH_GIA_CAN_NANG);
        assertThat(testThongTinSangLocVaDanhGiaDD.getAnUongTrongTuan()).isEqualTo(UPDATED_AN_UONG_TRONG_TUAN);
        assertThat(testThongTinSangLocVaDanhGiaDD.getDanhGiaAnUong()).isEqualTo(DEFAULT_DANH_GIA_AN_UONG);
        assertThat(testThongTinSangLocVaDanhGiaDD.getThoiGianChiDinh()).isEqualTo(DEFAULT_THOI_GIAN_CHI_DINH);
        assertThat(testThongTinSangLocVaDanhGiaDD.getNguyCoSDD()).isEqualTo(DEFAULT_NGUY_CO_SDD);
        assertThat(testThongTinSangLocVaDanhGiaDD.getCheDoAn()).isEqualTo(DEFAULT_CHE_DO_AN);
    }

    @Test
    @Transactional
    void fullUpdateThongTinSangLocVaDanhGiaDDWithPatch() throws Exception {
        // Initialize the database
        thongTinSangLocVaDanhGiaDDRepository.saveAndFlush(thongTinSangLocVaDanhGiaDD);

        int databaseSizeBeforeUpdate = thongTinSangLocVaDanhGiaDDRepository.findAll().size();

        // Update the thongTinSangLocVaDanhGiaDD using partial update
        ThongTinSangLocVaDanhGiaDD partialUpdatedThongTinSangLocVaDanhGiaDD = new ThongTinSangLocVaDanhGiaDD();
        partialUpdatedThongTinSangLocVaDanhGiaDD.setId(thongTinSangLocVaDanhGiaDD.getId());

        partialUpdatedThongTinSangLocVaDanhGiaDD
            .maBN(UPDATED_MA_BN)
            .mangThai(UPDATED_MANG_THAI)
            .bMI(UPDATED_B_MI)
            .danhGiaBMI(UPDATED_DANH_GIA_BMI)
            .phanTramCanNangTrong3Thang(UPDATED_PHAN_TRAM_CAN_NANG_TRONG_3_THANG)
            .danhGiaCanNang(UPDATED_DANH_GIA_CAN_NANG)
            .anUongTrongTuan(UPDATED_AN_UONG_TRONG_TUAN)
            .danhGiaAnUong(UPDATED_DANH_GIA_AN_UONG)
            .thoiGianChiDinh(UPDATED_THOI_GIAN_CHI_DINH)
            .nguyCoSDD(UPDATED_NGUY_CO_SDD)
            .cheDoAn(UPDATED_CHE_DO_AN);

        restThongTinSangLocVaDanhGiaDDMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedThongTinSangLocVaDanhGiaDD.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedThongTinSangLocVaDanhGiaDD))
            )
            .andExpect(status().isOk());

        // Validate the ThongTinSangLocVaDanhGiaDD in the database
        List<ThongTinSangLocVaDanhGiaDD> thongTinSangLocVaDanhGiaDDList = thongTinSangLocVaDanhGiaDDRepository.findAll();
        assertThat(thongTinSangLocVaDanhGiaDDList).hasSize(databaseSizeBeforeUpdate);
        ThongTinSangLocVaDanhGiaDD testThongTinSangLocVaDanhGiaDD = thongTinSangLocVaDanhGiaDDList.get(
            thongTinSangLocVaDanhGiaDDList.size() - 1
        );
        assertThat(testThongTinSangLocVaDanhGiaDD.getMaBN()).isEqualTo(UPDATED_MA_BN);
        assertThat(testThongTinSangLocVaDanhGiaDD.getMangThai()).isEqualTo(UPDATED_MANG_THAI);
        assertThat(testThongTinSangLocVaDanhGiaDD.getbMI()).isEqualTo(UPDATED_B_MI);
        assertThat(testThongTinSangLocVaDanhGiaDD.getDanhGiaBMI()).isEqualTo(UPDATED_DANH_GIA_BMI);
        assertThat(testThongTinSangLocVaDanhGiaDD.getPhanTramCanNangTrong3Thang()).isEqualTo(UPDATED_PHAN_TRAM_CAN_NANG_TRONG_3_THANG);
        assertThat(testThongTinSangLocVaDanhGiaDD.getDanhGiaCanNang()).isEqualTo(UPDATED_DANH_GIA_CAN_NANG);
        assertThat(testThongTinSangLocVaDanhGiaDD.getAnUongTrongTuan()).isEqualTo(UPDATED_AN_UONG_TRONG_TUAN);
        assertThat(testThongTinSangLocVaDanhGiaDD.getDanhGiaAnUong()).isEqualTo(UPDATED_DANH_GIA_AN_UONG);
        assertThat(testThongTinSangLocVaDanhGiaDD.getThoiGianChiDinh()).isEqualTo(UPDATED_THOI_GIAN_CHI_DINH);
        assertThat(testThongTinSangLocVaDanhGiaDD.getNguyCoSDD()).isEqualTo(UPDATED_NGUY_CO_SDD);
        assertThat(testThongTinSangLocVaDanhGiaDD.getCheDoAn()).isEqualTo(UPDATED_CHE_DO_AN);
    }

    @Test
    @Transactional
    void patchNonExistingThongTinSangLocVaDanhGiaDD() throws Exception {
        int databaseSizeBeforeUpdate = thongTinSangLocVaDanhGiaDDRepository.findAll().size();
        thongTinSangLocVaDanhGiaDD.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restThongTinSangLocVaDanhGiaDDMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, thongTinSangLocVaDanhGiaDD.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(thongTinSangLocVaDanhGiaDD))
            )
            .andExpect(status().isBadRequest());

        // Validate the ThongTinSangLocVaDanhGiaDD in the database
        List<ThongTinSangLocVaDanhGiaDD> thongTinSangLocVaDanhGiaDDList = thongTinSangLocVaDanhGiaDDRepository.findAll();
        assertThat(thongTinSangLocVaDanhGiaDDList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchThongTinSangLocVaDanhGiaDD() throws Exception {
        int databaseSizeBeforeUpdate = thongTinSangLocVaDanhGiaDDRepository.findAll().size();
        thongTinSangLocVaDanhGiaDD.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restThongTinSangLocVaDanhGiaDDMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(thongTinSangLocVaDanhGiaDD))
            )
            .andExpect(status().isBadRequest());

        // Validate the ThongTinSangLocVaDanhGiaDD in the database
        List<ThongTinSangLocVaDanhGiaDD> thongTinSangLocVaDanhGiaDDList = thongTinSangLocVaDanhGiaDDRepository.findAll();
        assertThat(thongTinSangLocVaDanhGiaDDList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamThongTinSangLocVaDanhGiaDD() throws Exception {
        int databaseSizeBeforeUpdate = thongTinSangLocVaDanhGiaDDRepository.findAll().size();
        thongTinSangLocVaDanhGiaDD.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restThongTinSangLocVaDanhGiaDDMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(thongTinSangLocVaDanhGiaDD))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ThongTinSangLocVaDanhGiaDD in the database
        List<ThongTinSangLocVaDanhGiaDD> thongTinSangLocVaDanhGiaDDList = thongTinSangLocVaDanhGiaDDRepository.findAll();
        assertThat(thongTinSangLocVaDanhGiaDDList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteThongTinSangLocVaDanhGiaDD() throws Exception {
        // Initialize the database
        thongTinSangLocVaDanhGiaDDRepository.saveAndFlush(thongTinSangLocVaDanhGiaDD);

        int databaseSizeBeforeDelete = thongTinSangLocVaDanhGiaDDRepository.findAll().size();

        // Delete the thongTinSangLocVaDanhGiaDD
        restThongTinSangLocVaDanhGiaDDMockMvc
            .perform(delete(ENTITY_API_URL_ID, thongTinSangLocVaDanhGiaDD.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ThongTinSangLocVaDanhGiaDD> thongTinSangLocVaDanhGiaDDList = thongTinSangLocVaDanhGiaDDRepository.findAll();
        assertThat(thongTinSangLocVaDanhGiaDDList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
