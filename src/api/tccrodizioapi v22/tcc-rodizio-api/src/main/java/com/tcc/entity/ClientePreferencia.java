package com.tcc.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.tcc.enums.ClientePreferenciaStatusEnum;
import com.validation.AoAlterar;
import com.validation.AoInserir;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@JsonIgnoreProperties(ignoreUnknown = true, value = {"hibernateLazyInitializer", "handler"})
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity(name = "cliente_preferencias")
@Table(name = "cliente_preferencias")
public class ClientePreferencia {
	
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@NotNull(message = "O id da promissória deve ser obrigatório", groups = AoAlterar.class)
	@Null(message = "O id da promissória deve ser nulo", groups = AoInserir.class)
	@EqualsAndHashCode.Include
	private Integer id;
	
	@Enumerated
	@Column(name = "status")
	@NotNull(message = "O status da preferênia deve ser obrigatório")
	private ClientePreferenciaStatusEnum status;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
	@JoinColumn(name = "cliente_id")
	@NotNull(message = "O cliente da preferencia é obrigatório")
	private Cliente cliente;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
	@JoinColumn(name = "produto_id")
	@NotNull(message = "O produto da preferencia é obrigatório")
	private Produto produto;
	
	public void preencher(Cliente cliente, Produto produto) {
		this.cliente = cliente;
		this.produto = produto;
	}

}
