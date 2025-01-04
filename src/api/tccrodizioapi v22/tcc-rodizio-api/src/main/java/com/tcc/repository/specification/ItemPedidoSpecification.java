package com.tcc.repository.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.tcc.entity.Cliente;
import com.tcc.entity.ItemPedido;
import com.tcc.entity.Mesa;
import com.tcc.entity.Pedido;
import com.tcc.entity.Produto;

public class ItemPedidoSpecification {

    public static Specification<ItemPedido> comFiltros(ItemPedido itemPedidoFiltro) {
        return (Root<ItemPedido> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();

            // Filtrar por id de ItemPedido, se preenchido
            if (itemPedidoFiltro.getId() != null) {
                predicate = criteriaBuilder.and(predicate,
                    criteriaBuilder.equal(root.get("id"), itemPedidoFiltro.getId()));
            }

            // Join e filtro para Produto
            if (itemPedidoFiltro.getProduto() != null) {
                Join<ItemPedido, Produto> produtoJoin = root.join("produto");

                if (itemPedidoFiltro.getProduto().getId() != null) {
                    predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.equal(produtoJoin.get("id"), itemPedidoFiltro.getProduto().getId()));
                }

                if (itemPedidoFiltro.getProduto().getDescricao() != null && !itemPedidoFiltro.getProduto().getDescricao().isEmpty()) {
                    predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.like(
                            criteriaBuilder.lower(produtoJoin.get("descricao")),
                            "%" + itemPedidoFiltro.getProduto().getDescricao().toLowerCase() + "%"
                        )
                    );
                }
            }

            // Join e filtro para Mesa
            if (itemPedidoFiltro.getMesa() != null) {
                Join<ItemPedido, Mesa> mesaJoin = root.join("mesa");

                if (itemPedidoFiltro.getMesa().getId() != null) {
                    predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.equal(mesaJoin.get("id"), itemPedidoFiltro.getMesa().getId()));
                }

                if (itemPedidoFiltro.getMesa().getCodigoMesa() != null && !itemPedidoFiltro.getMesa().getCodigoMesa().isEmpty()) {
                    predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.like(
                            criteriaBuilder.lower(mesaJoin.get("codigoMesa")),
                            "%" + itemPedidoFiltro.getMesa().getCodigoMesa().toLowerCase() + "%"
                        )
                    );
                }
            }

            // Join e filtro para Cliente
            if (itemPedidoFiltro.getCliente() != null) {
                Join<ItemPedido, Cliente> clienteJoin = root.join("cliente");

                if (itemPedidoFiltro.getCliente().getId() != null) {
                    predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.equal(clienteJoin.get("id"), itemPedidoFiltro.getCliente().getId()));
                }

                if (itemPedidoFiltro.getCliente().getNome() != null && !itemPedidoFiltro.getCliente().getNome().isEmpty()) {
                    predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.like(
                            criteriaBuilder.lower(clienteJoin.get("nome")),
                            "%" + itemPedidoFiltro.getCliente().getNome().toLowerCase() + "%"
                        )
                    );
                }
            }

            // Join e filtro para Pedido
            if (itemPedidoFiltro.getPedido() != null) {
                Join<ItemPedido, Pedido> pedidoJoin = root.join("pedido");

                // Filtrar por pedido.id, se preenchido
                if (itemPedidoFiltro.getPedido().getId() != null) {
                    predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.equal(pedidoJoin.get("id"), itemPedidoFiltro.getPedido().getId()));
                }

                // Filtrar por dataHoraAbertura, se preenchido
                if (itemPedidoFiltro.getPedido().getDataHoraAbertura() != null) {
                    predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.greaterThanOrEqualTo(pedidoJoin.get("dataHoraAbertura"),
                            itemPedidoFiltro.getPedido().getDataHoraAbertura()));
                }

                // Filtrar por dataHoraFechamento, se preenchido
                if (itemPedidoFiltro.getPedido().getDataHoraFechamento() != null) {
                    predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.lessThanOrEqualTo(pedidoJoin.get("dataHoraFechamento"),
                            itemPedidoFiltro.getPedido().getDataHoraFechamento()));
                }

                // Filtrar por totalPedido, se preenchido
                if (itemPedidoFiltro.getPedido().getTotalPedido() != null) {
                    predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.equal(pedidoJoin.get("totalPedido"), itemPedidoFiltro.getPedido().getTotalPedido()));
                }

                // Filtrar por status, se preenchido
                if (itemPedidoFiltro.getPedido().getStatus() != null) {
                    predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.equal(pedidoJoin.get("status"), itemPedidoFiltro.getPedido().getStatus()));
                }
            }

            return predicate;
        };
    }
}
