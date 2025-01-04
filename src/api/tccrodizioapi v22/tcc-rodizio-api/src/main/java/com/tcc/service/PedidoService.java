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
import com.tcc.entity.Cliente;
import com.tcc.entity.Pedido;
import com.tcc.exception.RegistroNaoEncontradoException;
import com.tcc.repository.ClientePreferenciaRepository;
import com.tcc.repository.ClienteRepository;
import com.tcc.repository.ItemPedidoRepository;
import com.tcc.repository.PedidoRepository;
import com.tcc.repository.specification.PedidoSpecification;
import com.validation.AoAlterar;
import com.validation.AoInserir;

@Validated
@Service
public class PedidoService {

	@Autowired
	private ClientePreferenciaRepository clientePreferenciaRepository;

	@Autowired
	private ItemPedidoRepository itemPedidoRepository;

	@Autowired
	private ClienteRepository clienteRepository;

	@Autowired
	private PedidoRepository pedidoRepository;

	@Validated(AoInserir.class)
	public List<Pedido> inserir(@Valid List<Pedido> pedidos) {

		for (Pedido pedido : pedidos) {

			Cliente cliente = clienteRepository.findById(pedido.getCliente().getId())
					.orElseThrow(() -> new RegistroNaoEncontradoException("Cliente não encontrado"));
			pedido.preencher(cliente);
		}

		return pedidoRepository.saveAll(pedidos);
	}

	@Validated(AoAlterar.class)
	public Pedido alterar(@Valid Pedido pedido) {
		this.buscarPor(pedido.getId());

		Cliente cliente = clienteRepository.findById(pedido.getCliente().getId())
				.orElseThrow(() -> new RegistroNaoEncontradoException("Cliente não encontrado"));
		pedido.preencher(cliente);

		return pedidoRepository.save(pedido);
	}

	public void remover(@NotNull(message = "Os ids dos pedidos devem ser informados") List<Integer> ids) {
		ids.forEach(id -> {

			this.buscarPor(id);

			validaCliente(id);

			this.pedidoRepository.deleteById(id);
		});
	}

	private void validaCliente(Integer id) {
		Preconditions.checkArgument(!clientePreferenciaRepository.existsByClienteId(id),
				"Não é possível remover pedidos com preferências associadas");
		Preconditions.checkArgument(!itemPedidoRepository.existsByClienteId(id),
				"Não é possível remover pedidos com itens de pedido associados");
		Preconditions.checkArgument(!pedidoRepository.existsByClienteId(id),
				"Não é possível remover pedidos com pedidos associados");
	}

	// Mantida a função de busca por ID como está
	public Pedido buscarPor(@NotNull(message = "O código do pedido deve ser informado") Integer id) {
		Optional<Pedido> clienteEncontrado = pedidoRepository.findById(id);

		if (clienteEncontrado.isPresent()) {
			return clienteEncontrado.get();
		}

		throw new RegistroNaoEncontradoException("Pedido não encontrado");
	}

	public List<Pedido> listarTodos() {
		return pedidoRepository.findAll();
	}
	
	public List<Pedido> buscarComFiltros(Pedido pedidoFiltro) {
        Specification<Pedido> specification = PedidoSpecification.comFiltros(pedidoFiltro);
        return pedidoRepository.findAll(specification);
    }

}
