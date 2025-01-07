package com.tcc.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.tcc.entity.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Integer>, JpaSpecificationExecutor<Pedido> {
    
    @EntityGraph(attributePaths = {"cliente", "cliente.mesa"})
    Optional<Pedido> findById(Integer id);
	
    @EntityGraph(attributePaths = {"cliente", "cliente.mesa"})
    List<Pedido> findAll();

    @EntityGraph(attributePaths = {"cliente", "cliente.mesa"})
    List<Pedido> findByDataHoraFechamentoBetween(LocalDateTime dataInicio, LocalDateTime dataFim);
    
    //Comando para validar exclusão
    boolean existsByClienteId(Integer clienteId);
    
}
