package com.tcc.service;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.google.common.base.Preconditions;
import com.tcc.entity.TipoProduto;
import com.tcc.exception.RegistroNaoEncontradoException;
import com.tcc.repository.ProdutoRepository;
import com.tcc.repository.TipoProdutoRepository;
import com.tcc.repository.specification.TipoProdutoSpecification;
import com.validation.AoAlterar;
import com.validation.AoInserir;

@Validated
@Service
public class TipoProdutoService {

	@Autowired
	private TipoProdutoRepository tipoProdutoRepository;

	@Autowired
	private ProdutoRepository produtoRepository;

	@Validated(AoInserir.class)
	public List<TipoProduto> inserir(@Valid List<TipoProduto> tipoProdutos) {
		return tipoProdutoRepository.saveAll(tipoProdutos); // Salva todos os tipoProdutos da lista
	}

	@Validated(AoAlterar.class)
	public TipoProduto alterar(@Valid TipoProduto tipoProduto) {
		this.buscarPor(tipoProduto.getId());
		return tipoProdutoRepository.save(tipoProduto); // Não alterado, pois é para um tipoProduto único
	}

	public void remover(@NotNull(message = "Os ids dos tipoProdutos devem ser informados") List<Integer> ids) {
		ids.forEach(id -> {
			// Verifica se o tipoProduto existe
			this.buscarPor(id);

			// Verifica se existem associações que impeçam a remoção
			validaCliente(id);

			// Se não houver conflitos, exclui o tipoProduto
			this.tipoProdutoRepository.deleteById(id);
		});
	}

	private void validaCliente(Integer id) {
		Preconditions.checkArgument(!produtoRepository.existsByTipoProdutoId(id),
				"Não é possível remover tipoProdutos com itens de pedido associados");
	}

	// Mantida a função de busca por ID como está
	public TipoProduto buscarPor(@NotNull(message = "O código do tipoProduto deve ser informado") Integer id) {
		Optional<TipoProduto> clienteEncontrado = tipoProdutoRepository.findById(id);

		if (clienteEncontrado.isPresent()) {
			return clienteEncontrado.get();
		}

		throw new RegistroNaoEncontradoException("TipoProduto não encontrado");
	}

	public List<TipoProduto> listarTodos() {
		return tipoProdutoRepository.findAll();
	}

	public List<TipoProduto> buscarComFiltros(TipoProduto tipoProdutoFiltro) {
		Specification<TipoProduto> specification = TipoProdutoSpecification.comFiltros(tipoProdutoFiltro);
		return tipoProdutoRepository.findAll(specification);
	}

}
