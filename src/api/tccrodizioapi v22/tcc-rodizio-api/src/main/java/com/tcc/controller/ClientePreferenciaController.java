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
import com.tcc.entity.ClientePreferencia;
import com.tcc.service.ClientePreferenciaService;
import com.tcc.service.ClientePreferenciaService.ProdutoPopular;

@RestController
@RequestMapping("api/v1/cliente-preferencia")
public class ClientePreferenciaController {
    
    @Autowired
    private ClientePreferenciaService clientePreferenciaService;
    
    @Autowired
    private MapConverter mapConverter;
    
    // Inserir uma lista de clientePreferencias
    @PostMapping
    public ResponseEntity<?> inserir(@RequestBody List<ClientePreferencia> clientePreferencias){
        List<ClientePreferencia> clientePreferenciasInseridos = clientePreferenciaService.inserir(clientePreferencias);
        return ResponseEntity.created(URI.create("/id/" + clientePreferenciasInseridos.get(0).getId())).build();
    }
    
    // Buscar um cliente por código
    @GetMapping("/id/{id}")
    public ResponseEntity<?> buscarPor(@PathVariable(name = "id") Integer id){
        return ResponseEntity.ok(mapConverter.toJsonMap(clientePreferenciaService.buscarPor(id)));
    }
    
    // Alterar um cliente
    @PutMapping
    public ResponseEntity<?> alterar(@RequestBody ClientePreferencia cliente){
        return ResponseEntity.ok(mapConverter.toJsonMap(clientePreferenciaService.alterar(cliente)));
    }
    
    // Remover uma lista de clientePreferencias pelo ID
    @DeleteMapping
    public ResponseEntity<?> removerPor(@RequestBody List<Integer> ids){
        this.clientePreferenciaService.remover(ids);
        return ResponseEntity.ok().build();
    }
    
    // Listar todos os clientePreferencias
    @GetMapping
    public ResponseEntity<?> listarTodos(){
        return ResponseEntity.ok(mapConverter.toJsonList(clientePreferenciaService.listarTodos()));
    }
    
    @PostMapping("/criteria")
    public ResponseEntity<List<ClientePreferencia>> buscarComFiltros(@RequestBody ClientePreferencia preferenciaFiltro) {
        List<ClientePreferencia> preferencias = clientePreferenciaService.buscarComFiltros(preferenciaFiltro);
        return ResponseEntity.ok(preferencias);
    }

    @GetMapping("/custom/sem-adicionais/{id}")
    public ResponseEntity<?> listarSemAdicionais(@PathVariable("id") Integer clienteId) {
        List<ClientePreferencia> preferenciasSemAdicionais = clientePreferenciaService.listarSemAdicionais(clienteId);
        return ResponseEntity.ok(mapConverter.toJsonList(preferenciasSemAdicionais));
    }

    @GetMapping("/custom/com-adicionais/{id}")
    public ResponseEntity<?> listarComAdicionais(@PathVariable("id") Integer clienteId) {
        List<ClientePreferencia> preferenciasComAdicionais = clientePreferenciaService.listarComAdicionais(clienteId);
        return ResponseEntity.ok(mapConverter.toJsonList(preferenciasComAdicionais));
    }

    @GetMapping("/custom/mais-pedidos")
    public List<ProdutoPopular> listarProdutosMaisPedidos() {
    return clientePreferenciaService.listarProdutosMaisPedidos();
}

}
