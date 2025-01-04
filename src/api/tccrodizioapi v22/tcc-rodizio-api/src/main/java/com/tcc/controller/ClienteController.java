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
import com.tcc.entity.Cliente;
import com.tcc.service.ClienteService;

@RestController
@RequestMapping("api/v1/cliente")
public class ClienteController {
    
    @Autowired
    private ClienteService clienteService;
    
    @Autowired
    private MapConverter mapConverter;
    
    // Inserir uma lista de clientes
    @PostMapping
    public ResponseEntity<List<Cliente>> inserir(@RequestBody List<Cliente> clientes) {
        List<Cliente> clientesInseridos = clienteService.inserir(clientes);

    // Retorna os clientes inseridos no corpo da resposta
    return ResponseEntity
            .created(URI.create("/id/" + clientesInseridos.get(0).getId())) // Cabeçalho Location
            .body(clientesInseridos); // Corpo da resposta com os clientes
    }

    
    // Buscar um cliente por código
    @GetMapping("/id/{id}")
    public ResponseEntity<?> buscarPor(@PathVariable(name = "id") Integer id){
        return ResponseEntity.ok(mapConverter.toJsonMap(clienteService.buscarPor(id)));
    }
    
    // Alterar um cliente
    @PutMapping
    public ResponseEntity<?> alterar(@RequestBody Cliente cliente){
        return ResponseEntity.ok(mapConverter.toJsonMap(clienteService.alterar(cliente)));
    }
    
    // Remover uma lista de clientes pelo ID
    @DeleteMapping
    public ResponseEntity<?> removerPor(@RequestBody List<Integer> ids){
        this.clienteService.remover(ids);
        return ResponseEntity.ok().build();
    }
    
    // Listar todos os clientes
    @GetMapping
    public ResponseEntity<?> listarTodos(){
        return ResponseEntity.ok(mapConverter.toJsonList(clienteService.listarTodos()));
    }
    
    @PostMapping("/criteria")
    public ResponseEntity<List<Cliente>> buscarComFiltros(@RequestBody Cliente clienteFiltro) {
        List<Cliente> clientes = clienteService.buscarComFiltros(clienteFiltro);
        return ResponseEntity.ok(clientes);
    }
}
