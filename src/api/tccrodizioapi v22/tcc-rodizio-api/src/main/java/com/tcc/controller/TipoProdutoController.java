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
import com.tcc.entity.TipoProduto;
import com.tcc.service.TipoProdutoService;

@RestController
@RequestMapping("api/v1/tipo-produto")
public class TipoProdutoController {
    
    @Autowired
    private TipoProdutoService tipoProdutoService;
    
    @Autowired
    private MapConverter mapConverter;
    
    // Inserir uma lista de ItemPedidos
    @PostMapping
    public ResponseEntity<?> inserir(@RequestBody List<TipoProduto> tipoProdutos){
        List<TipoProduto> ItemPedidosInseridos = tipoProdutoService.inserir(tipoProdutos);
        return ResponseEntity.created(URI.create("/id/" + ItemPedidosInseridos.get(0).getId())).build();
    }
    
    // Buscar um TipoProduto por código
    @GetMapping("/id/{id}")
    public ResponseEntity<?> buscarPor(@PathVariable(name = "id") Integer id){
        return ResponseEntity.ok(mapConverter.toJsonMap(tipoProdutoService.buscarPor(id)));
    }
    
    // Alterar um TipoProduto
    @PutMapping
    public ResponseEntity<?> alterar(@RequestBody TipoProduto tipoProduto){
        return ResponseEntity.ok(mapConverter.toJsonMap(tipoProdutoService.alterar(tipoProduto)));
    }
    
    // Remover uma lista de ItemPedidos pelo ID
    @DeleteMapping
    public ResponseEntity<?> removerPor(@RequestBody List<Integer> ids){
        this.tipoProdutoService.remover(ids);
        return ResponseEntity.ok().build();
    }
    
    // Listar todos os ItemPedidos
    @GetMapping
    public ResponseEntity<?> listarTodos(){
        return ResponseEntity.ok(mapConverter.toJsonList(tipoProdutoService.listarTodos()));
    }
    
    @PostMapping("/criteria")
    public ResponseEntity<List<TipoProduto>> buscarComFiltros(@RequestBody TipoProduto tipoProdutoFiltro) {
        List<TipoProduto> tipoProdutos = tipoProdutoService.buscarComFiltros(tipoProdutoFiltro);
        return ResponseEntity.ok(tipoProdutos);
    }
}
