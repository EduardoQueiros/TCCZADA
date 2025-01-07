package com.tcc.controller;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tcc.controller.conversor.MapConverter;
import com.tcc.entity.Pedido;
import com.tcc.service.PedidoService;

@RestController
@RequestMapping("api/v1/pedido")
public class PedidoController {
    
    @Autowired
    private PedidoService pedidoService;
    
    @Autowired
    private MapConverter mapConverter;
    
    // Inserir uma lista de ItemPedidos
    @PostMapping
    public ResponseEntity<?> inserir(@RequestBody List<Pedido> pedidos){
        List<Pedido> ItemPedidosInseridos = pedidoService.inserir(pedidos);
        return ResponseEntity.created(URI.create("/id/" + ItemPedidosInseridos.get(0).getId())).build();
    }
    
    // Buscar um Pedido por código
    @GetMapping("/id/{id}")
    public ResponseEntity<?> buscarPor(@PathVariable(name = "id") Integer id){
        return ResponseEntity.ok(mapConverter.toJsonMap(pedidoService.buscarPor(id)));
    }
    
    // Alterar um Pedido
    @PutMapping
    public ResponseEntity<?> alterar(@RequestBody Pedido pedido){
        return ResponseEntity.ok(mapConverter.toJsonMap(pedidoService.alterar(pedido)));
    }
    
    // Remover uma lista de ItemPedidos pelo ID
    @DeleteMapping
    public ResponseEntity<?> removerPor(@RequestBody List<Integer> ids){
        this.pedidoService.remover(ids);
        return ResponseEntity.ok().build();
    }
    
    // Listar todos os ItemPedidos
    @GetMapping
    public ResponseEntity<?> listarTodos(){
        return ResponseEntity.ok(mapConverter.toJsonList(pedidoService.listarTodos()));
    }
    
    @PostMapping("/criteria")
    public ResponseEntity<List<Pedido>> buscarComFiltros(@RequestBody Pedido pedidoFiltro) {
        List<Pedido> pedidos = pedidoService.buscarComFiltros(pedidoFiltro);
        return ResponseEntity.ok(pedidos);
    }

     @GetMapping("/date-between")
    public ResponseEntity<List<Pedido>> buscarPedidosPorFechamentoEntreDatas(
        @RequestParam("dataInicio") @DateTimeFormat(pattern = "dd-MM-yyyy HH:mm") LocalDateTime dataInicio,
        @RequestParam("dataFim") @DateTimeFormat(pattern = "dd-MM-yyyy HH:mm") LocalDateTime dataFim
    ) {
        List<Pedido> pedidos = pedidoService.buscarPedidosPorFechamentoEntreDatas(dataInicio, dataFim);
        return ResponseEntity.ok(pedidos);
    }
}
