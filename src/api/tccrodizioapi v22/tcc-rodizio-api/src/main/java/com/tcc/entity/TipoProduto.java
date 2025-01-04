package com.tcc.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.validation.AoAlterar;
import com.validation.AoInserir;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@JsonIgnoreProperties(ignoreUnknown = true, value = { "hibernateLazyInitializer", "handler" })
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity(name = "tipoProduto")
@Table(name = "tipo_produto") 
public class TipoProduto {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@NotNull(message = "O id do tipoProduto deve ser obrigatório", groups = AoAlterar.class)
	@Null(message = "O id do tipoProduto deve ser nulo", groups = AoInserir.class)
	@EqualsAndHashCode.Include
	private Integer id;

	@Column(name = "descricao")
	@NotEmpty(message = "A descricao do tipoProduto é obrigatória")
	private String descricao;
}
