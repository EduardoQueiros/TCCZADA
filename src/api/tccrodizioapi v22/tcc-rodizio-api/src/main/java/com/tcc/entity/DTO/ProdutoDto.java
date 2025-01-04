package com.tcc.entity.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProdutoDto {

	private Integer id;
	private String descricao;
	private Double valor;
	private String imagemBase64; // Campo para a imagem em Base64
	private Integer tipoProdutoId; // Campo para o ID do TipoProduto


}
