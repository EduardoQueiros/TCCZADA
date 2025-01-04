package com.tcc.repository.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.tcc.entity.Cliente;
import com.tcc.entity.ClientePreferencia;
import com.tcc.entity.Produto;

public class ClientePreferenciaSpecification {

	public static Specification<ClientePreferencia> comFiltros(ClientePreferencia preferenciaFiltro) {
		return (Root<ClientePreferencia> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
			Predicate predicate = criteriaBuilder.conjunction();

			// Filtrar por id, se preenchido
			if (preferenciaFiltro.getId() != null) {
				predicate = criteriaBuilder.and(predicate,
						criteriaBuilder.equal(root.get("id"), preferenciaFiltro.getId()));
			}

			// Filtrar por status, se preenchido
			if (preferenciaFiltro.getStatus() != null) {
				predicate = criteriaBuilder.and(predicate,
						criteriaBuilder.equal(root.get("status"), preferenciaFiltro.getStatus()));
			}

			// Filtrar por cliente.id, se preenchido
			if (preferenciaFiltro.getCliente() != null && preferenciaFiltro.getCliente().getId() != null) {
				Join<ClientePreferencia, Cliente> clienteJoin = root.join("cliente");
				predicate = criteriaBuilder.and(predicate,
						criteriaBuilder.equal(clienteJoin.get("id"), preferenciaFiltro.getCliente().getId()));
			}

			// Filtrar por produto.id, se preenchido
			if (preferenciaFiltro.getProduto() != null && preferenciaFiltro.getProduto().getId() != null) {
				Join<ClientePreferencia, Produto> produtoJoin = root.join("produto");
				predicate = criteriaBuilder.and(predicate,
						criteriaBuilder.equal(produtoJoin.get("id"), preferenciaFiltro.getProduto().getId()));
			}

			if (preferenciaFiltro.getCliente() != null) {
				Join<ClientePreferencia, Cliente> clienteJoin = root.join("cliente"); // Faz o join uma única vez

				// Filtrar por id do produto, se preenchido
				if (preferenciaFiltro.getCliente().getId() != null) {
					predicate = criteriaBuilder.and(predicate,
							criteriaBuilder.equal(clienteJoin.get("id"), preferenciaFiltro.getCliente().getId()));
				}

				// Filtrar por nome, se preenchido (case-insensitive)
				if (preferenciaFiltro.getCliente().getNome() != null
						&& !preferenciaFiltro.getCliente().getNome().isEmpty()) {
					predicate = criteriaBuilder.and(predicate,
							criteriaBuilder.like(criteriaBuilder.lower(clienteJoin.get("nome")),
									"%" + preferenciaFiltro.getCliente().getNome().toLowerCase() + "%"));
				}

				// Filtrar por email, se preenchido (case-insensitive)
				if (preferenciaFiltro.getCliente().getEmail() != null
						&& !preferenciaFiltro.getCliente().getEmail().isEmpty()) {
					predicate = criteriaBuilder.and(predicate,
							criteriaBuilder.like(criteriaBuilder.lower(clienteJoin.get("email")),
									"%" + preferenciaFiltro.getCliente().getEmail().toLowerCase() + "%"));
				}
			}

			return predicate;
		};
	}
}
