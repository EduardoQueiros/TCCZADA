package com.tcc.service;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.tcc.entity.Cliente;
import com.tcc.entity.ClientePreferencia;
import com.tcc.entity.Produto;
import com.tcc.exception.RegistroNaoEncontradoException;
import com.tcc.repository.ClientePreferenciaRepository;
import com.tcc.repository.ClienteRepository;
import com.tcc.repository.ProdutoRepository;
import com.tcc.repository.specification.ClientePreferenciaSpecification;
import com.validation.AoAlterar;
import com.validation.AoInserir;

@Validated
@Service
public class ClientePreferenciaService {

	@Autowired
	private ClientePreferenciaRepository clientePreferenciaRepository;

	@Autowired
	private ClienteRepository clienteRepository;

	@Autowired
	private ProdutoRepository produtoRepository;

	@Validated(AoInserir.class)
	public List<ClientePreferencia> inserir(@Valid List<ClientePreferencia> clientePreferencias) {

		for (ClientePreferencia clientePreferencia : clientePreferencias) {

			Cliente cliente = clienteRepository.findById(clientePreferencia.getCliente().getId())
					.orElseThrow(() -> new RegistroNaoEncontradoException("Cliente não encontrado"));

			Produto produto = produtoRepository.findById(clientePreferencia.getProduto().getId())
					.orElseThrow(() -> new RegistroNaoEncontradoException("Produto não encontrado"));

			clientePreferencia.preencher(cliente, produto);
		}

		return clientePreferenciaRepository.saveAll(clientePreferencias);
	}

	@Validated(AoAlterar.class)
	public ClientePreferencia alterar(@Valid ClientePreferencia clientePreferencia) {
		this.buscarPor(clientePreferencia.getId());

		Cliente cliente = clienteRepository.findById(clientePreferencia.getCliente().getId())
				.orElseThrow(() -> new RegistroNaoEncontradoException("Cliente não encontrado"));

		Produto produto = produtoRepository.findById(clientePreferencia.getProduto().getId())
				.orElseThrow(() -> new RegistroNaoEncontradoException("Produto não encontrado"));

		clientePreferencia.preencher(cliente, produto);

		return clientePreferenciaRepository.save(clientePreferencia);
	}

	public void remover(@NotNull(message = "Os ids dos clientes devem ser informados") List<Integer> ids) {
		ids.forEach(id -> {

			this.buscarPor(id);

			this.clientePreferenciaRepository.deleteById(id);
		});
	}

	public ClientePreferencia buscarPor(
			@NotNull(message = "O código do ClientePreferencia deve ser informado") Integer id) {
		Optional<ClientePreferencia> clienteEncontrado = clientePreferenciaRepository.findById(id);

		if (clienteEncontrado.isPresent()) {
			return clienteEncontrado.get();
		}

		throw new RegistroNaoEncontradoException("ClientePreferencia não encontrado");
	}

	public List<ClientePreferencia> listarTodos() {
		return clientePreferenciaRepository.findAll();
	}

	public List<ClientePreferencia> buscarComFiltros(ClientePreferencia preferenciaFiltro) {
		Specification<ClientePreferencia> specification = ClientePreferenciaSpecification.comFiltros(preferenciaFiltro);
		return clientePreferenciaRepository.findAll(specification);
	}

	public List<ClientePreferencia> listarSemAdicionais(Integer clienteId) {
		return clientePreferenciaRepository.findAllWithoutAdicionaisByClienteId(clienteId);
	}
	
	public List<ClientePreferencia> listarComAdicionais(Integer clienteId) {
		return clientePreferenciaRepository.findAllWithAdicionaisByClienteId(clienteId);
	}
	

	public List<ProdutoPopular> listarProdutosMaisPedidos() {
		return clientePreferenciaRepository.findProductsOrderedByPopularityWithStatus().stream()
			.map(result -> new ProdutoPopular((Produto) result[0], (Long) result[1]))
			.toList();
	}
	

	public record ProdutoPopular(Produto produto, Long quantidadePedidos) {}
}
