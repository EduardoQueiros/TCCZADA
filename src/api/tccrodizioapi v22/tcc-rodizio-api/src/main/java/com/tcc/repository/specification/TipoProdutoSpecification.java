package com.tcc.repository.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.tcc.entity.TipoProduto;

public class TipoProdutoSpecification {

	public static Specification<TipoProduto> comFiltros(TipoProduto tipoProdutoFiltro) {
		return (Root<TipoProduto> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
			Predicate predicate = criteriaBuilder.conjunction();

			// Filtrar por id, se preenchido
			if (tipoProdutoFiltro.getId() != null) {
				predicate = criteriaBuilder.and(predicate,
						criteriaBuilder.equal(root.get("id"), tipoProdutoFiltro.getId()));
			}

			// Filtrar por descricao, se preenchido (case-insensitive)
			if (tipoProdutoFiltro.getDescricao() != null && !tipoProdutoFiltro.getDescricao().isEmpty()) {
				predicate = criteriaBuilder.and(predicate,
						criteriaBuilder.like(criteriaBuilder.lower(root.get("descricao")),
								"%" + tipoProdutoFiltro.getDescricao().toLowerCase() + "%"));
			}

			return predicate;
		};
	}
}
