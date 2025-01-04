package com.tcc.repository.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.tcc.entity.Cliente;
import com.tcc.entity.Pedido;

public class PedidoSpecification {

    public static Specification<Pedido> comFiltros(Pedido pedidoFiltro) {
        return (Root<Pedido> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();

            // Filtrar por id, se preenchido
            if (pedidoFiltro.getId() != null) {
                predicate = criteriaBuilder.and(predicate,
                    criteriaBuilder.equal(root.get("id"), pedidoFiltro.getId()));
            }

            // Filtrar por dataHoraAbertura, se preenchido
            if (pedidoFiltro.getDataHoraAbertura() != null) {
                predicate = criteriaBuilder.and(predicate,
                    criteriaBuilder.greaterThanOrEqualTo(root.get("dataHoraAbertura"), pedidoFiltro.getDataHoraAbertura()));
            }

            // Filtrar por dataHoraFechamento, se preenchido
            if (pedidoFiltro.getDataHoraFechamento() != null) {
                predicate = criteriaBuilder.and(predicate,
                    criteriaBuilder.lessThanOrEqualTo(root.get("dataHoraFechamento"), pedidoFiltro.getDataHoraFechamento()));
            }

            // Filtrar por totalPedido, se preenchido
            if (pedidoFiltro.getTotalPedido() != null) {
                predicate = criteriaBuilder.and(predicate,
                    criteriaBuilder.equal(root.get("totalPedido"), pedidoFiltro.getTotalPedido()));
            }

            // Filtrar por status, se preenchido
            if (pedidoFiltro.getStatus() != null) {
                predicate = criteriaBuilder.and(predicate,
                    criteriaBuilder.equal(root.get("status"), pedidoFiltro.getStatus()));
            }

            // Join e filtro para Cliente
            if (pedidoFiltro.getCliente() != null) {
                Join<Pedido, Cliente> clienteJoin = root.join("cliente");

                // Filtrar por cliente.id, se preenchido
                if (pedidoFiltro.getCliente().getId() != null) {
                    predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.equal(clienteJoin.get("id"), pedidoFiltro.getCliente().getId()));
                }

                // Filtrar por cliente.nome, se preenchido (case-insensitive)
                if (pedidoFiltro.getCliente().getNome() != null && !pedidoFiltro.getCliente().getNome().isEmpty()) {
                    predicate = criteriaBuilder.and(predicate,
                        criteriaBuilder.like(
                            criteriaBuilder.lower(clienteJoin.get("nome")),
                            "%" + pedidoFiltro.getCliente().getNome().toLowerCase() + "%"
                        )
                    );
                }
            }

            return predicate;
        };
    }
}
