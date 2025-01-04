package com.tcc.repository.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.tcc.entity.Cliente;

public class ClienteSpecification {

	public static Specification<Cliente> comFiltros(Cliente clienteFiltro) {
		return (Root<Cliente> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
			Predicate predicate = criteriaBuilder.conjunction();

			// Filtrar por id do produto, se preenchido
			if (clienteFiltro.getId() != null) {
				predicate = criteriaBuilder.and(predicate,
						criteriaBuilder.equal(root.get("id"), clienteFiltro.getId()));
			}

			// Filtrar por nome, se preenchido (case-insensitive)
			if (clienteFiltro.getNome() != null && !clienteFiltro.getNome().isEmpty()) {
				predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(criteriaBuilder.lower(root.get("nome")),
						"%" + clienteFiltro.getNome().toLowerCase() + "%"));
			}

			// Filtrar por email, se preenchido (case-insensitive)
			if (clienteFiltro.getEmail() != null && !clienteFiltro.getEmail().isEmpty()) {
				predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(
						criteriaBuilder.lower(root.get("email")), "%" + clienteFiltro.getEmail().toLowerCase() + "%"));
			}

			return predicate;
		};
	}
}
