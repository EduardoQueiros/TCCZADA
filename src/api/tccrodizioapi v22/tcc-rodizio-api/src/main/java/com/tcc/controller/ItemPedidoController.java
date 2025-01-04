package com.tcc.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcc.controller.conversor.MapConverter;
import com.tcc.entity.ItemPedido;
import com.tcc.service.ItemPedidoService;

@RestController
@RequestMapping("api/v1/item-pedido")
public class ItemPedidoController {
    
    @Autowired
    private ItemPedidoService itemPedidoService;
    
    @Autowired
    private MapConverter mapConverter;
    
    // Inserir uma lista de ItemPedidos
    @PostMapping
    public ResponseEntity<?> inserir(@RequestBody List<ItemPedido> itemPedidos){
        List<ItemPedido> ItemPedidosInseridos = itemPedidoService.inserir(itemPedidos);
        return ResponseEntity.created(URI.create("/id/" + ItemPedidosInseridos.get(0).getId())).build();
    }
    
    // Buscar um ItemPedido por código
    @GetMapping("/id/{id}")
    public ResponseEntity<?> buscarPor(@PathVariable(name = "id") Integer id){
        return ResponseEntity.ok(mapConverter.toJsonMap(itemPedidoService.buscarPor(id)));
    }
    
    // Alterar um ItemPedido
    @PutMapping
    public ResponseEntity<?> alterar(@RequestBody ItemPedido itemPedido){
        return ResponseEntity.ok(mapConverter.toJsonMap(itemPedidoService.alterar(itemPedido)));
    }
    
    // Remover uma lista de ItemPedidos pelo ID
    @DeleteMapping
    public ResponseEntity<?> removerPor(@RequestBody List<Integer> ids){
        this.itemPedidoService.remover(ids);
        return ResponseEntity.ok().build();
    }
    
    // Listar todos os ItemPedidos
    @GetMapping
    public ResponseEntity<?> listarTodos(){
        return ResponseEntity.ok(mapConverter.toJsonList(itemPedidoService.listarTodos()));
    }
    
    @PostMapping("/criteria")
    public ResponseEntity<List<ItemPedido>> buscarComFiltros(@RequestBody ItemPedido itemPedidoFiltro) {
        List<ItemPedido> itemPedidos = itemPedidoService.buscarComFiltros(itemPedidoFiltro);
        return ResponseEntity.ok(itemPedidos);
    }
}
