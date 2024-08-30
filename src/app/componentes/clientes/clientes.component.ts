import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClienteServicio } from '../../servicios/cliente.service';
import { Cliente } from '../../modelo/cliente.modelo';
import { NgForm } from '@angular/forms';
import { AlertMessagesService } from 'jjwins-angular-alert-messages'

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  // Lo inicializamos para evitar problemas al acceder a .length en el componente
  clientes: Cliente[] = [];
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: undefined,
  };

  @ViewChild("clienteForm") clienteForm: NgForm; //Asi se conecta a la referencia local del Form
  @ViewChild("botonCerrar") botonCerrar: ElementRef; //Asi se conecta a la referencia local del boton

  constructor(
    private clientesServicio: ClienteServicio,
    private alertMessageService: AlertMessagesService
  ) {}

  ngOnInit() {
    this.clientesServicio.getClientes().subscribe((clientes) => {
      this.clientes = clientes;
    });
  }

  getSaldoTotal() {
    let saldoTotal: number = 0;
    if (this.clientes) {
      this.clientes.forEach((cliente) => {
        if (cliente.saldo !== undefined) {
          saldoTotal += cliente.saldo;
        }
      });
    }
    return saldoTotal;
  }

  agregar(clienteForm: NgForm) {
    const { value, valid } = clienteForm;

    if (!valid) {
      this.alertMessageService.show('Por favor llena el formulario correctamente', 
        { cssClass: 'alerts-error', timeOut: 4000 }
      );
    } else {
      // Aquí agregarías el cliente, por ejemplo:
      this.clientesServicio.agregarCliente(value);
      this.clienteForm.resetForm();
      this.cerrarModal();
      this.alertMessageService.show('Cliente agregado exitosamente', 
        {cssClass: 'alerts-success', timeout: 4000}
      );
    } 
  }

  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }
}
