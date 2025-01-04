package com.tcc.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.tcc.entity.Mesa;

public interface MesaRepository extends JpaRepository<Mesa, Integer>, JpaSpecificationExecutor<Mesa> {
    
    Optional<Mesa> findById(Integer id);
	
    List<Mesa> findAll();
    
}
