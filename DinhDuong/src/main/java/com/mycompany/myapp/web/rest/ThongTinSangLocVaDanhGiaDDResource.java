package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.ThongTinSangLocVaDanhGiaDD;
import com.mycompany.myapp.repository.ThongTinSangLocVaDanhGiaDDRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.ThongTinSangLocVaDanhGiaDD}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ThongTinSangLocVaDanhGiaDDResource {

    private final Logger log = LoggerFactory.getLogger(ThongTinSangLocVaDanhGiaDDResource.class);

    private static final String ENTITY_NAME = "thongTinSangLocVaDanhGiaDD";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ThongTinSangLocVaDanhGiaDDRepository thongTinSangLocVaDanhGiaDDRepository;

    public ThongTinSangLocVaDanhGiaDDResource(ThongTinSangLocVaDanhGiaDDRepository thongTinSangLocVaDanhGiaDDRepository) {
        this.thongTinSangLocVaDanhGiaDDRepository = thongTinSangLocVaDanhGiaDDRepository;
    }

    /**
     * {@code POST  /thong-tin-sang-loc-va-danh-gia-dds} : Create a new thongTinSangLocVaDanhGiaDD.
     *
     * @param thongTinSangLocVaDanhGiaDD the thongTinSangLocVaDanhGiaDD to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new thongTinSangLocVaDanhGiaDD, or with status {@code 400 (Bad Request)} if the thongTinSangLocVaDanhGiaDD has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/thong-tin-sang-loc-va-danh-gia-dds")
    public ResponseEntity<ThongTinSangLocVaDanhGiaDD> createThongTinSangLocVaDanhGiaDD(
        @RequestBody ThongTinSangLocVaDanhGiaDD thongTinSangLocVaDanhGiaDD
    ) throws URISyntaxException {
        log.debug("REST request to save ThongTinSangLocVaDanhGiaDD : {}", thongTinSangLocVaDanhGiaDD);
        if (thongTinSangLocVaDanhGiaDD.getId() != null) {
            throw new BadRequestAlertException("A new thongTinSangLocVaDanhGiaDD cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ThongTinSangLocVaDanhGiaDD result = thongTinSangLocVaDanhGiaDDRepository.save(thongTinSangLocVaDanhGiaDD);
        return ResponseEntity
            .created(new URI("/api/thong-tin-sang-loc-va-danh-gia-dds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /thong-tin-sang-loc-va-danh-gia-dds/:id} : Updates an existing thongTinSangLocVaDanhGiaDD.
     *
     * @param id the id of the thongTinSangLocVaDanhGiaDD to save.
     * @param thongTinSangLocVaDanhGiaDD the thongTinSangLocVaDanhGiaDD to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated thongTinSangLocVaDanhGiaDD,
     * or with status {@code 400 (Bad Request)} if the thongTinSangLocVaDanhGiaDD is not valid,
     * or with status {@code 500 (Internal Server Error)} if the thongTinSangLocVaDanhGiaDD couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/thong-tin-sang-loc-va-danh-gia-dds/{id}")
    public ResponseEntity<ThongTinSangLocVaDanhGiaDD> updateThongTinSangLocVaDanhGiaDD(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ThongTinSangLocVaDanhGiaDD thongTinSangLocVaDanhGiaDD
    ) throws URISyntaxException {
        log.debug("REST request to update ThongTinSangLocVaDanhGiaDD : {}, {}", id, thongTinSangLocVaDanhGiaDD);
        if (thongTinSangLocVaDanhGiaDD.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, thongTinSangLocVaDanhGiaDD.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!thongTinSangLocVaDanhGiaDDRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ThongTinSangLocVaDanhGiaDD result = thongTinSangLocVaDanhGiaDDRepository.save(thongTinSangLocVaDanhGiaDD);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, thongTinSangLocVaDanhGiaDD.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /thong-tin-sang-loc-va-danh-gia-dds/:id} : Partial updates given fields of an existing thongTinSangLocVaDanhGiaDD, field will ignore if it is null
     *
     * @param id the id of the thongTinSangLocVaDanhGiaDD to save.
     * @param thongTinSangLocVaDanhGiaDD the thongTinSangLocVaDanhGiaDD to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated thongTinSangLocVaDanhGiaDD,
     * or with status {@code 400 (Bad Request)} if the thongTinSangLocVaDanhGiaDD is not valid,
     * or with status {@code 404 (Not Found)} if the thongTinSangLocVaDanhGiaDD is not found,
     * or with status {@code 500 (Internal Server Error)} if the thongTinSangLocVaDanhGiaDD couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/thong-tin-sang-loc-va-danh-gia-dds/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ThongTinSangLocVaDanhGiaDD> partialUpdateThongTinSangLocVaDanhGiaDD(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ThongTinSangLocVaDanhGiaDD thongTinSangLocVaDanhGiaDD
    ) throws URISyntaxException {
        log.debug("REST request to partial update ThongTinSangLocVaDanhGiaDD partially : {}, {}", id, thongTinSangLocVaDanhGiaDD);
        if (thongTinSangLocVaDanhGiaDD.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, thongTinSangLocVaDanhGiaDD.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!thongTinSangLocVaDanhGiaDDRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ThongTinSangLocVaDanhGiaDD> result = thongTinSangLocVaDanhGiaDDRepository
            .findById(thongTinSangLocVaDanhGiaDD.getId())
            .map(existingThongTinSangLocVaDanhGiaDD -> {
                if (thongTinSangLocVaDanhGiaDD.getMaBN() != null) {
                    existingThongTinSangLocVaDanhGiaDD.setMaBN(thongTinSangLocVaDanhGiaDD.getMaBN());
                }
                if (thongTinSangLocVaDanhGiaDD.getMangThai() != null) {
                    existingThongTinSangLocVaDanhGiaDD.setMangThai(thongTinSangLocVaDanhGiaDD.getMangThai());
                }
                if (thongTinSangLocVaDanhGiaDD.getbMI() != null) {
                    existingThongTinSangLocVaDanhGiaDD.setbMI(thongTinSangLocVaDanhGiaDD.getbMI());
                }
                if (thongTinSangLocVaDanhGiaDD.getDanhGiaBMI() != null) {
                    existingThongTinSangLocVaDanhGiaDD.setDanhGiaBMI(thongTinSangLocVaDanhGiaDD.getDanhGiaBMI());
                }
                if (thongTinSangLocVaDanhGiaDD.getPhanTramCanNangTrong3Thang() != null) {
                    existingThongTinSangLocVaDanhGiaDD.setPhanTramCanNangTrong3Thang(
                        thongTinSangLocVaDanhGiaDD.getPhanTramCanNangTrong3Thang()
                    );
                }
                if (thongTinSangLocVaDanhGiaDD.getDanhGiaCanNang() != null) {
                    existingThongTinSangLocVaDanhGiaDD.setDanhGiaCanNang(thongTinSangLocVaDanhGiaDD.getDanhGiaCanNang());
                }
                if (thongTinSangLocVaDanhGiaDD.getAnUongTrongTuan() != null) {
                    existingThongTinSangLocVaDanhGiaDD.setAnUongTrongTuan(thongTinSangLocVaDanhGiaDD.getAnUongTrongTuan());
                }
                if (thongTinSangLocVaDanhGiaDD.getDanhGiaAnUong() != null) {
                    existingThongTinSangLocVaDanhGiaDD.setDanhGiaAnUong(thongTinSangLocVaDanhGiaDD.getDanhGiaAnUong());
                }
                if (thongTinSangLocVaDanhGiaDD.getThoiGianChiDinh() != null) {
                    existingThongTinSangLocVaDanhGiaDD.setThoiGianChiDinh(thongTinSangLocVaDanhGiaDD.getThoiGianChiDinh());
                }
                if (thongTinSangLocVaDanhGiaDD.getNguyCoSDD() != null) {
                    existingThongTinSangLocVaDanhGiaDD.setNguyCoSDD(thongTinSangLocVaDanhGiaDD.getNguyCoSDD());
                }
                if (thongTinSangLocVaDanhGiaDD.getCheDoAn() != null) {
                    existingThongTinSangLocVaDanhGiaDD.setCheDoAn(thongTinSangLocVaDanhGiaDD.getCheDoAn());
                }

                return existingThongTinSangLocVaDanhGiaDD;
            })
            .map(thongTinSangLocVaDanhGiaDDRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, thongTinSangLocVaDanhGiaDD.getId().toString())
        );
    }

    /**
     * {@code GET  /thong-tin-sang-loc-va-danh-gia-dds} : get all the thongTinSangLocVaDanhGiaDDS.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of thongTinSangLocVaDanhGiaDDS in body.
     */
    @GetMapping("/thong-tin-sang-loc-va-danh-gia-dds")
    public List<ThongTinSangLocVaDanhGiaDD> getAllThongTinSangLocVaDanhGiaDDS() {
        log.debug("REST request to get all ThongTinSangLocVaDanhGiaDDS");
        return thongTinSangLocVaDanhGiaDDRepository.findAll();
    }

    /**
     * {@code GET  /thong-tin-sang-loc-va-danh-gia-dds/:id} : get the "id" thongTinSangLocVaDanhGiaDD.
     *
     * @param id the id of the thongTinSangLocVaDanhGiaDD to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the thongTinSangLocVaDanhGiaDD, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/thong-tin-sang-loc-va-danh-gia-dds/{id}")
    public ResponseEntity<ThongTinSangLocVaDanhGiaDD> getThongTinSangLocVaDanhGiaDD(@PathVariable Long id) {
        log.debug("REST request to get ThongTinSangLocVaDanhGiaDD : {}", id);
        Optional<ThongTinSangLocVaDanhGiaDD> thongTinSangLocVaDanhGiaDD = thongTinSangLocVaDanhGiaDDRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(thongTinSangLocVaDanhGiaDD);
    }

    /**
     * {@code DELETE  /thong-tin-sang-loc-va-danh-gia-dds/:id} : delete the "id" thongTinSangLocVaDanhGiaDD.
     *
     * @param id the id of the thongTinSangLocVaDanhGiaDD to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/thong-tin-sang-loc-va-danh-gia-dds/{id}")
    public ResponseEntity<Void> deleteThongTinSangLocVaDanhGiaDD(@PathVariable Long id) {
        log.debug("REST request to delete ThongTinSangLocVaDanhGiaDD : {}", id);
        thongTinSangLocVaDanhGiaDDRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
