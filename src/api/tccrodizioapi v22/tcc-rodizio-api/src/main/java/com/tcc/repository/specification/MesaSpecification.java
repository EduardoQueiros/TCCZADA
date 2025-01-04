package com.tcc.repository.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.tcc.entity.Mesa;

public class MesaSpecification {

	public static Specification<Mesa> comFiltros(Mesa mesaFiltro) {
		return (Root<Mesa> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
			Predicate predicate = criteriaBuilder.conjunction();

			// Filtrar por id, se preenchido
			if (mesaFiltro.getId() != null) {
				predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("id"), mesaFiltro.getId()));
			}

			// Filtrar por codigoMesa, se preenchido (case-insensitive)
			if (mesaFiltro.getCodigoMesa() != null && !mesaFiltro.getCodigoMesa().isEmpty()) {
				predicate = criteriaBuilder.and(predicate,
						criteriaBuilder.like(criteriaBuilder.lower(root.get("codigoMesa")),
								"%" + mesaFiltro.getCodigoMesa().toLowerCase() + "%"));
			}

			return predicate;
		};
	}
}
