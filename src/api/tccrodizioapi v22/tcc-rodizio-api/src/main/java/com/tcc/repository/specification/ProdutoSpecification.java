package com.tcc.repository.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.tcc.entity.Produto;
import com.tcc.entity.TipoProduto;

public class ProdutoSpecification {

	public static Specification<Produto> comFiltros(Produto produtoFiltro) {
		return (Root<Produto> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
			Predicate predicate = criteriaBuilder.conjunction();

			// Filtrar por id do produto, se preenchido
			if (produtoFiltro.getId() != null) {
				predicate = criteriaBuilder.and(predicate,
						criteriaBuilder.equal(root.get("id"), produtoFiltro.getId()));
			}

			// Filtrar por descrição do produto, se preenchido
			if (produtoFiltro.getDescricao() != null && !produtoFiltro.getDescricao().isEmpty()) {
				predicate = criteriaBuilder.and(predicate,
						criteriaBuilder.like(criteriaBuilder.lower(root.get("descricao")),
								"%" + produtoFiltro.getDescricao().toLowerCase() + "%"));
			}

			// Filtrar por valor do produto, se preenchido
			if (produtoFiltro.getValor() != null) {
				predicate = criteriaBuilder.and(predicate,
						criteriaBuilder.equal(root.get("valor"), produtoFiltro.getValor()));
			}

			if (produtoFiltro.getTipoProduto() != null) {
				Join<Produto, TipoProduto> tipoProdutoJoin = root.join("tipoProduto"); // Faz o join uma única vez

				// Verificar se o ID de tipoProduto foi informado
				if (produtoFiltro.getTipoProduto().getId() != null) {
					predicate = criteriaBuilder.and(predicate,
							criteriaBuilder.equal(tipoProdutoJoin.get("id"), produtoFiltro.getTipoProduto().getId()));
				}

				// Verificar se a descrição de tipoProduto foi informada (case-insensitive)
				if (produtoFiltro.getTipoProduto().getDescricao() != null
						&& !produtoFiltro.getTipoProduto().getDescricao().isEmpty()) {
					predicate = criteriaBuilder.and(predicate,
							criteriaBuilder.like(criteriaBuilder.lower(tipoProdutoJoin.get("descricao")),
									"%" + produtoFiltro.getTipoProduto().getDescricao().toLowerCase() + "%"));
				}
			}

			return predicate;
		};
	}
}
