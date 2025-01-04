package com.tcc.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tcc.entity.ClientePreferencia;

public interface ClientePreferenciaRepository extends JpaRepository<ClientePreferencia, Integer>, JpaSpecificationExecutor<ClientePreferencia> {
    
	@EntityGraph(attributePaths = {"cliente", "cliente.mesa", "produto", "produto.tipoProduto"})
    Optional<ClientePreferencia> findById(Integer id);
	
	@EntityGraph(attributePaths = {"cliente", "cliente.mesa", "produto", "produto.tipoProduto"})
    List<ClientePreferencia> findAll();
    
    //Comando para validar exclusão
    boolean existsByClienteId(Integer clienteId);
    
    boolean existsByProdutoId(Integer produtoId);

@EntityGraph(attributePaths = {"cliente", "cliente.mesa", "produto", "produto.tipoProduto"})
@Query("SELECT cp FROM cliente_preferencias cp " +
       "WHERE cp.cliente.id = :clienteId AND cp.produto.tipoProduto.id <> 6")
List<ClientePreferencia> findAllWithoutAdicionaisByClienteId(@Param("clienteId") Integer clienteId);

@EntityGraph(attributePaths = {"cliente", "cliente.mesa", "produto", "produto.tipoProduto"})
@Query("SELECT cp FROM cliente_preferencias cp " +
       "WHERE cp.cliente.id = :clienteId AND cp.produto.tipoProduto.id = 6")
List<ClientePreferencia> findAllWithAdicionaisByClienteId(@Param("clienteId") Integer clienteId);


@Query("SELECT p, COUNT(cp) AS pedidos " +
       "FROM cliente_preferencias cp " +
       "JOIN cp.produto p " +
       "WHERE cp.status = 1 " +
       "AND cp.produto.tipoProduto.id <> 6" +
       "GROUP BY p.id " +
       "ORDER BY pedidos DESC")
List<Object[]> findProductsOrderedByPopularityWithStatus();
    
}
