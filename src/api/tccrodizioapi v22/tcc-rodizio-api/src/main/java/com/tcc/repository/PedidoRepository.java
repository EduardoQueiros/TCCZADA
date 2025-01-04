package com.tcc.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.tcc.entity.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Integer>, JpaSpecificationExecutor<Pedido> {
    
	@EntityGraph(attributePaths = {"cliente"})
    Optional<Pedido> findById(Integer id);
	
	@EntityGraph(attributePaths = {"cliente"})
    List<Pedido> findAll();
    
    //Comando para validar exclusão
    boolean existsByClienteId(Integer clienteId);
    
}
