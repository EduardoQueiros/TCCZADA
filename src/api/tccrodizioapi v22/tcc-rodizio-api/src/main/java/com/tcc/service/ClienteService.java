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
import com.tcc.entity.Mesa;
import com.tcc.exception.RegistroNaoEncontradoException;
import com.tcc.repository.ClientePreferenciaRepository;
import com.tcc.repository.ClienteRepository;
import com.tcc.repository.ItemPedidoRepository;
import com.tcc.repository.MesaRepository;
import com.tcc.repository.PedidoRepository;
import com.tcc.repository.specification.ClienteSpecification;
import com.validation.AoAlterar;
import com.validation.AoInserir;

@Validated
@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ClientePreferenciaRepository clientePreferenciaRepository;

    @Autowired
    private ItemPedidoRepository itemPedidoRepository;

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private MesaRepository mesaRepository;

    @Validated(AoInserir.class)
    public List<Cliente> inserir(@Valid List<Cliente> clientes) {
        for (Cliente cliente : clientes) {
            // Valida e busca a mesa associada
            Mesa mesa = mesaRepository.findById(cliente.getMesa().getId())
                    .orElseThrow(() -> new RegistroNaoEncontradoException("Mesa não encontrada"));
            cliente.setMesa(mesa);
        }
        return clienteRepository.saveAll(clientes);
    }

    @Validated(AoAlterar.class)
    public Cliente alterar(@Valid Cliente cliente) {
        this.buscarPor(cliente.getId());
        // Valida e busca a mesa associada
        Mesa mesa = mesaRepository.findById(cliente.getMesa().getId())
                .orElseThrow(() -> new RegistroNaoEncontradoException("Mesa não encontrada"));
        cliente.setMesa(mesa);

        return clienteRepository.save(cliente);
    }

    public void remover(@NotNull(message = "Os ids dos clientes devem ser informados") List<Integer> ids) {
        ids.forEach(id -> {

            this.buscarPor(id);

            validaCliente(id);

            this.clienteRepository.deleteById(id);
        });
    }

    private void validaCliente(Integer id) {
        Preconditions.checkArgument(!clientePreferenciaRepository.existsByClienteId(id),
                "Não é possível remover clientes com preferências associadas");
        Preconditions.checkArgument(!itemPedidoRepository.existsByClienteId(id),
                "Não é possível remover clientes com itens de pedido associados");
        Preconditions.checkArgument(!pedidoRepository.existsByClienteId(id),
                "Não é possível remover clientes com pedidos associados");
    }

    public Cliente buscarPor(@NotNull(message = "O código do cliente deve ser informado") Integer id) {
        Optional<Cliente> clienteEncontrado = clienteRepository.findById(id);

        if (clienteEncontrado.isPresent()) {
            return clienteEncontrado.get();
        }

        throw new RegistroNaoEncontradoException("Cliente não encontrado");
    }

    public List<Cliente> buscarComFiltros(Cliente clienteFiltro) {
        Specification<Cliente> specification = ClienteSpecification.comFiltros(clienteFiltro);
        return clienteRepository.findAll(specification);
    }

    public List<Cliente> listarTodos() {
        return clienteRepository.findAll();
    }

}
