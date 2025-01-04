package com.tcc.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.validation.AoAlterar;
import com.validation.AoInserir;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import javax.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@JsonIgnoreProperties(ignoreUnknown = true, value = {"hibernateLazyInitializer", "handler"})
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity(name = "Cliente")
@Table(name = "clientes")
public class Cliente {
	
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@NotNull(message = "O código do cliente deve ser obrigatório", groups = AoAlterar.class)
	@Null(message = "O código do cliente deve ser nulo", groups = AoInserir.class)
	@EqualsAndHashCode.Include
	private Integer id;
	
	@Column(name = "nome")
	@NotEmpty(message = "O nome completo do cliente é obrigatório")
	@Size(min=2, max = 50, message = "O tamanho do nome do cliente deve estar entre 2 e 50 caracteres")
	private String nome;
	
	@Email
	@Column(name = "email")
	@NotEmpty(message = "O email do cliente é obrigatório")
	private String email;

	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "mesa_id", nullable = false)
	@NotNull(message = "O cliente deve estar associado a uma mesa")
	private Mesa mesa; // Referência à mesa associada
	
}
