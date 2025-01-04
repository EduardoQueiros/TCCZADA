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
import com.tcc.entity.ItemPedido;
import com.tcc.entity.Mesa;
import com.tcc.entity.Pedido;
import com.tcc.entity.Produto;
import com.tcc.exception.RegistroNaoEncontradoException;
import com.tcc.repository.ClienteRepository;
import com.tcc.repository.ItemPedidoRepository;
import com.tcc.repository.MesaRepository;
import com.tcc.repository.PedidoRepository;
import com.tcc.repository.ProdutoRepository;
import com.tcc.repository.specification.ItemPedidoSpecification;
import com.validation.AoAlterar;
import com.validation.AoInserir;

@Validated
@Service
public class ItemPedidoService {


    @Autowired
    private ItemPedidoRepository itemPedidoRepository;

    @Autowired
    private ClienteRepository clienteRepository;
    
    @Autowired
    private MesaRepository mesaRepository;
    
    @Autowired
    private PedidoRepository pedidoRepository;
    
    @Autowired
    private ProdutoRepository produtoRepository;

    @Validated(AoInserir.class)
    public List<ItemPedido> inserir(@Valid List<ItemPedido> itensPedido) {
    	
    	for (ItemPedido itemPedido : itensPedido) {

			Cliente cliente = clienteRepository.findById(itemPedido.getCliente().getId())
					.orElseThrow(() -> new RegistroNaoEncontradoException("Cliente não encontrado"));
			
			Mesa mesa = mesaRepository.findById(itemPedido.getMesa().getId())
					.orElseThrow(() -> new RegistroNaoEncontradoException("Mesa não encontrada"));
			
			Pedido pedido = pedidoRepository.findById(itemPedido.getPedido().getId())
					.orElseThrow(() -> new RegistroNaoEncontradoException("Pedido não encontrado"));

			Produto produto = produtoRepository.findById(itemPedido.getProduto().getId())
					.orElseThrow(() -> new RegistroNaoEncontradoException("Produto não encontrado"));

			itemPedido.preencher(cliente, produto, mesa, pedido);
		}
    	
        return itemPedidoRepository.saveAll(itensPedido);
    }

    @Validated(AoAlterar.class)
    public ItemPedido alterar(@Valid ItemPedido itemPedido) {
        this.buscarPor(itemPedido.getId());
        
        Cliente cliente = clienteRepository.findById(itemPedido.getCliente().getId())
				.orElseThrow(() -> new RegistroNaoEncontradoException("Cliente não encontrado"));
		
		Mesa mesa = mesaRepository.findById(itemPedido.getMesa().getId())
				.orElseThrow(() -> new RegistroNaoEncontradoException("Mesa não encontrada"));
		
		Pedido pedido = pedidoRepository.findById(itemPedido.getPedido().getId())
				.orElseThrow(() -> new RegistroNaoEncontradoException("Pedido não encontrado"));

		Produto produto = produtoRepository.findById(itemPedido.getProduto().getId())
				.orElseThrow(() -> new RegistroNaoEncontradoException("Produto não encontrado"));

		itemPedido.preencher(cliente, produto, mesa, pedido);
        
        return itemPedidoRepository.save(itemPedido); 
    }

    public void remover(@NotNull(message = "Os ids dos itensPedido devem ser informados") List<Integer> ids) {
        ids.forEach(id -> {
            this.buscarPor(id);

            this.itemPedidoRepository.deleteById(id);
        });
    }

    public ItemPedido buscarPor(@NotNull(message = "O código do ItemPedido deve ser informado") Integer id) {
        Optional<ItemPedido> clienteEncontrado = itemPedidoRepository.findById(id);

        if (clienteEncontrado.isPresent()) {
            return clienteEncontrado.get();
        }

        throw new RegistroNaoEncontradoException("ItemPedido não encontrado");
    }

    public List<ItemPedido> listarTodos() {
        return itemPedidoRepository.findAll();
    }
    
    public List<ItemPedido> buscarComFiltros(ItemPedido itemPedidoFiltro) {
        Specification<ItemPedido> specification = ItemPedidoSpecification.comFiltros(itemPedidoFiltro);
        return itemPedidoRepository.findAll(specification);
    }

}
