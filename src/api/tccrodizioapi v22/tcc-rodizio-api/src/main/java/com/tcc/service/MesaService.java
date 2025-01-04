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
import com.tcc.entity.Mesa;
import com.tcc.exception.RegistroNaoEncontradoException;
import com.tcc.repository.ItemPedidoRepository;
import com.tcc.repository.MesaRepository;
import com.tcc.repository.specification.MesaSpecification;
import com.validation.AoAlterar;
import com.validation.AoInserir;

@Validated
@Service
public class MesaService {

	@Autowired
	private MesaRepository mesaRepository;

	@Autowired
	private ItemPedidoRepository itemPedidoRepository;

	@Validated(AoInserir.class)
	public List<Mesa> inserir(@Valid List<Mesa> mesas) {
		return mesaRepository.saveAll(mesas); // Salva todos os mesas da lista
	}

	@Validated(AoAlterar.class)
	public Mesa alterar(@Valid Mesa mesa) {
		this.buscarPor(mesa.getId());
		return mesaRepository.save(mesa); // Não alterado, pois é para um mesa único
	}

	public void remover(@NotNull(message = "Os ids dos mesas devem ser informados") List<Integer> ids) {
		ids.forEach(id -> {
			// Verifica se o mesa existe
			this.buscarPor(id);

			// Verifica se existem associações que impeçam a remoção
			validaCliente(id);

			// Se não houver conflitos, exclui o mesa
			this.mesaRepository.deleteById(id);
		});
	}

	private void validaCliente(Integer id) {
		Preconditions.checkArgument(!itemPedidoRepository.existsByClienteId(id),
				"Não é possível remover mesas com itens de pedido associados");
	}

	// Mantida a função de busca por ID como está
	public Mesa buscarPor(@NotNull(message = "O código do mesa deve ser informado") Integer id) {
		Optional<Mesa> clienteEncontrado = mesaRepository.findById(id);

		if (clienteEncontrado.isPresent()) {
			return clienteEncontrado.get();
		}

		throw new RegistroNaoEncontradoException("Mesa não encontrado");
	}

	public List<Mesa> listarTodos() {
		return mesaRepository.findAll();
	}

	public List<Mesa> buscarComFiltros(Mesa mesaFiltro) {
		Specification<Mesa> specification = MesaSpecification.comFiltros(mesaFiltro);
		return mesaRepository.findAll(specification);
	}

}
