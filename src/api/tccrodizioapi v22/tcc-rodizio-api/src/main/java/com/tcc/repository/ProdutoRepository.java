package com.tcc.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.tcc.entity.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Integer>, JpaSpecificationExecutor<Produto> {
    
	@EntityGraph(attributePaths = {"tipoProduto"})
    Optional<Produto> findById(Integer id);
	
	@EntityGraph(attributePaths = {"tipoProduto"})
    List<Produto> findAll();
    
  //Comando para validar exclusão
    boolean existsByTipoProdutoId(Integer tipoProdutoId);
    
}
