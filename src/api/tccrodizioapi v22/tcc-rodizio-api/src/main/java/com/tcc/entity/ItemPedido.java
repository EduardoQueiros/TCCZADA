package com.tcc.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import javax.validation.constraints.Positive;

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
@Entity(name = "item_pedido")
@Table(name = "item_pedido")
public class ItemPedido {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@NotNull(message = "O id do Pedido deve ser obrigatório", groups = AoAlterar.class)
	@Null(message = "O id do Pedido deve ser nulo", groups = AoInserir.class)
	@EqualsAndHashCode.Include
	private Integer id;

	@Positive
	@NotNull
	@Column(name = "qtdProduto")
	private Integer qtdProduto;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
	@JoinColumn(name = "pedido_id")
	@NotNull(message = "O pedido do itemPedido é obrigatório")
	private Pedido pedido;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
	@JoinColumn(name = "mesa_id")
	@NotNull(message = "O mesa do itemPedido é obrigatório")
	private Mesa mesa;
	
	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
	@JoinColumn(name = "produto_id")
	@NotNull(message = "O produto do itemPedido é obrigatório")
	private Produto produto;

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
	@JoinColumn(name = "cliente_id")
	@NotNull(message = "O cliente do itemPedido é obrigatório")
	private Cliente cliente;
	
	public void preencher(Cliente cliente, Produto produto, Mesa mesa, Pedido pedido) {
		this.cliente = cliente;
		this.produto = produto;
		this.mesa = mesa;
		this.pedido = pedido;


	}

}
