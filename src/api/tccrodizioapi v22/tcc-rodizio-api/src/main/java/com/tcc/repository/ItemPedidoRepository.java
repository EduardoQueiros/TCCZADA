package com.tcc.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.tcc.entity.ItemPedido;

public interface ItemPedidoRepository extends JpaRepository<ItemPedido, Integer>, JpaSpecificationExecutor<ItemPedido> {
    
	@EntityGraph(attributePaths = {"cliente", "produto", "mesa", "pedido"})
    Optional<ItemPedido> findById(Integer id);
	
	@EntityGraph(attributePaths = {"cliente", "produto", "mesa", "pedido"})
    List<ItemPedido> findAll();
    
    //Comando para validar exclusão
    boolean existsByClienteId(Integer clienteId);
    
    boolean existsByProdutoId(Integer ProdutoId);

    
}
