package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ThongTinSangLocVaDanhGiaDD;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ThongTinSangLocVaDanhGiaDD entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ThongTinSangLocVaDanhGiaDDRepository extends JpaRepository<ThongTinSangLocVaDanhGiaDD, Long> {}
