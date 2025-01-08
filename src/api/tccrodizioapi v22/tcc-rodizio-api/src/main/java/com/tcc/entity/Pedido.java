package com.tcc.entity;

import java.time.LocalDateTime;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.tcc.enums.PedidoEnum;
import com.validation.AoAlterar;
import com.validation.AoInserir;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@JsonIgnoreProperties(ignoreUnknown = true, value = { "hibernateLazyInitializer", "handler" })
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity(name = "pedido")
@Table(name = "pedido")
public class Pedido {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@NotNull(message = "O id do Pedido deve ser obrigatório", groups = AoAlterar.class)
	@Null(message = "O id do Pedido deve ser nulo", groups = AoInserir.class)
	@EqualsAndHashCode.Include
	private Integer id;

	@Column(name = "dataHoraAbertura")
	@CreationTimestamp
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm")
	private LocalDateTime dataHoraAbertura;

	@Column(name = "dataHoraFechamento")
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm")
	private LocalDateTime dataHoraFechamento;

	@Column(name = "totalPedido")
	private Double totalPedido;
	
	@Enumerated
	@Column(name = "status")
	private PedidoEnum status;

	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
	@JoinColumn(name = "cliente_id")
	@NotNull(message = "O cliente do pedido é obrigatório")
	private Cliente cliente;
	
	public void preencher(Cliente cliente) {
		this.cliente = cliente;
	}

}
