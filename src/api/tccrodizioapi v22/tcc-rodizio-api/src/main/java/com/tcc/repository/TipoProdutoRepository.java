package com.tcc.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.tcc.entity.TipoProduto;

public interface TipoProdutoRepository extends JpaRepository<TipoProduto, Integer>, JpaSpecificationExecutor<TipoProduto> {
    
    Optional<TipoProduto> findById(Integer id);
	
    List<TipoProduto> findAll();
    
}
