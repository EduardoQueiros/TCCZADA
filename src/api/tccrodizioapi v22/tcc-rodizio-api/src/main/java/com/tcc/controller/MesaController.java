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
import com.tcc.entity.Mesa;
import com.tcc.service.MesaService;

@RestController
@RequestMapping("api/v1/mesa")
public class MesaController {
    
    @Autowired
    private MesaService mesaService;
    
    @Autowired
    private MapConverter mapConverter;
    
    // Inserir uma lista de ItemPedidos
    @PostMapping
    public ResponseEntity<?> inserir(@RequestBody List<Mesa> mesas){
        List<Mesa> ItemPedidosInseridos = mesaService.inserir(mesas);
        return ResponseEntity.created(URI.create("/id/" + ItemPedidosInseridos.get(0).getId())).build();
    }
    
    // Buscar um Mesa por código
    @GetMapping("/id/{id}")
    public ResponseEntity<?> buscarPor(@PathVariable(name = "id") Integer id){
        return ResponseEntity.ok(mapConverter.toJsonMap(mesaService.buscarPor(id)));
    }
    
    // Alterar um Mesa
    @PutMapping
    public ResponseEntity<?> alterar(@RequestBody Mesa mesa){
        return ResponseEntity.ok(mapConverter.toJsonMap(mesaService.alterar(mesa)));
    }
    
    // Remover uma lista de ItemPedidos pelo ID
    @DeleteMapping
    public ResponseEntity<?> removerPor(@RequestBody List<Integer> ids){
        this.mesaService.remover(ids);
        return ResponseEntity.ok().build();
    }
    
    // Listar todos os ItemPedidos
    @GetMapping
    public ResponseEntity<?> listarTodos(){
        return ResponseEntity.ok(mapConverter.toJsonList(mesaService.listarTodos()));
    }
    
    @PostMapping("/criteria")
    public ResponseEntity<List<Mesa>> buscarComFiltros(@RequestBody Mesa mesaFiltro) {
        List<Mesa> mesas = mesaService.buscarComFiltros(mesaFiltro);
        return ResponseEntity.ok(mesas);
    }
}
