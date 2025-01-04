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
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
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
@JsonIgnoreProperties(ignoreUnknown = true, value = {"hibernateLazyInitializer", "handler"})
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity(name = "produto")
@Table(name = "produto")
public class Produto {
    
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull(message = "O id do produto deve ser obrigatório", groups = AoAlterar.class)
    @Null(message = "O id do produto deve ser nulo", groups = AoInserir.class)
    @EqualsAndHashCode.Include
    private Integer id;
    
    @Column(name = "descricao")
    @NotEmpty(message = "A descricao do produto é obrigatória")
    private String descricao;
    
    @Column(name = "valor")
    @NotNull(message = "O valor do produto é obrigatório")
    @Positive
    private Double valor;
    
    @Column(name = "imagem")
    private byte[] imagem;
    
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "tipo_produto_id")
    @NotNull(message = "O tipoProduto do produto é obrigatório")
    private TipoProduto tipoProduto;
    
    public void preencher(TipoProduto tipoProduto) {
		this.tipoProduto = tipoProduto;
	}
}
