
var cuentas = [
    { nombre: 'Mali', clave: '123', saldo: 200 },
    { nombre: 'Gera', clave: '345', saldo: 290 },
    { nombre: 'Maui', clave: '567', saldo: 67 },
    { nombre: 'Flor', clave: '789', saldo: 0 }
]

//variables para utilizar con localStorage
let nombre, saldoInicial, saldoActual

//variables para guardar los botones
let consultar = document.getElementById('btnConsultar')
let depositar = document.getElementById('btnDepositar')
let boton = document.getElementById('botonIngresar')

//condicionando la existencia de las variables
if (boton) boton.addEventListener('click', ingresar)
if (!boton) saludoUsuario()

if (consultar) consultar.addEventListener('click', consultarSaldo)
if (depositar) depositar.addEventListener('click', depositarMonto)


//Funciones para redirigir a la página principal y la del usuario
function pagCuenta() { 
    location.href = 'cuenta.html' 
}

function pagIndex() { 
    location.href = 'index.html' 
}

//Funciones para vaciar campos y textos asignados a los span
function vaciarSaldo() { 
    document.getElementById('saldo').innerHTML = ('') 
}

function vaciarInputDepositar() { 
    document.getElementById('depositar').value = ('') 
}

function vaciarInputRetirar() { 
    document.getElementById('retirar').value = ('') 
}

function vaciarTransaccion() {
    document.getElementById('transaccion').innerHTML = ('')
    document.getElementById('nuevoSaldo').innerHTML = ('')
}

function vaciarAlertas() {
    document.getElementById('alerta').innerHTML = ('')
    document.getElementById('alertaSaldo').innerHTML = ('')
    document.getElementById('alertaTransaccion').innerHTML = ('')
}

function vaciarAlerta2y3() {
    document.getElementById('alertaSaldo').innerHTML = ('')
    document.getElementById('alertaTransaccion').innerHTML = ('')
}
function vaciarSaldoAlertaTransaccion(){
    vaciarAlerta2y3()
    vaciarSaldo()
    vaciarTransaccion()
}

//Función para ingresar a la página del usuario
function ingresar() {

    const usuario = document.getElementById('usuario').value
    const contraseña = document.getElementById('contraseña').value

    for (let i = 0; i < cuentas.length; i++) {

        if(usuario == cuentas[i].nombre && contraseña == cuentas[i].clave){
            pagCuenta()
            nombre = usuario
            localStorage.setItem('saludo', nombre)
            saldoInicial = cuentas[i].saldo
            localStorage.setItem('saldo', saldoInicial)
        }
        else{
            document.getElementById('alerta').innerHTML = ('Usuario o contraseña incorrectoss')
        }
    } 
}

//Almacenando el valor del saldo  en la variable 'saldoActual'
saldoActual = localStorage.getItem('saldo')

//Funcion para iniciar el saludo del usuario en la página del usuario
function saludoUsuario() {
    let nombreUsuario = localStorage.getItem('saludo')
    document.getElementById('saludo').innerHTML = ('¡Hola ' + nombreUsuario + '!')
}
//Funciones para consultar, depositar y retirar
function consultarSaldo() {
    document.getElementById('saldo').innerHTML = ("Saldo: $" + saldoActual)
    vaciarInputDepositar()
    vaciarInputRetirar()
    vaciarAlertas()
    vaciarTransaccion()
}

function depositarMonto() {
    let monto = document.getElementById('depositar').value
    let deposito = parseFloat(monto)
    let saldoMasDeposito = deposito + parseFloat(saldoActual)

    vaciarInputRetirar()

    if (monto === '') {
        document.getElementById('alerta').innerHTML = ('Escriba el monto a depositar')
       vaciarSaldoAlertaTransaccion()
    }
    else if (deposito <= 0) {
        document.getElementById('alerta').innerHTML = ('Ingrese una cantidad válida')
        vaciarSaldo()
        vaciarTransaccion()
    }
    else if (saldoMasDeposito > 990) {
        document.getElementById('alerta').innerHTML = ('¡No puede tener más de $990 en cuenta!')
        document.getElementById('alertaSaldo').innerHTML = ('Saldo actual: $' + saldoActual)
        document.getElementById('alertaTransaccion').innerHTML = (' Transacción rechazada: depósito de $' + deposito)
        vaciarInputDepositar()
        vaciarSaldo()
        vaciarTransaccion()
    }
    else {
        vaciarAlertas()
        saldoActual = saldoMasDeposito
        document.getElementById('transaccion').innerHTML = ("Depósito de: $" + deposito)
        document.getElementById('nuevoSaldo').innerHTML = ("Nuevo saldo: $" + saldoActual)
        vaciarInputDepositar()
        vaciarSaldo()
    }
}
function retirarMonto() {
    let cantidad = document.getElementById('retirar').value
    let retiro = parseFloat(cantidad)
    let saldoMenosRetiro = saldoActual - retiro

    vaciarInputDepositar()

    if (cantidad === '') {
        document.getElementById('alerta').innerHTML = ('Escriba el monto a retirar')
        vaciarSaldoAlertaTransaccion()
    }
    else if (retiro <= 0) {
        vaciarSaldoAlertaTransaccion()
        document.getElementById('alerta').innerHTML = ('Ingrese una cantidad válida')
    }
    else if (saldoActual < retiro) {
        document.getElementById('alerta').innerHTML = ('No cuenta con esa cantidad para retirar')
        vaciarSaldoAlertaTransaccion()
    }
    else if (saldoMenosRetiro < 10) {
        vaciarInputRetirar()
        document.getElementById('alerta').innerHTML = ('¡No puede tener menos de $10 en cuenta!')
        document.getElementById('alertaSaldo').innerHTML = ('Saldo actual: $' + saldoActual)
        document.getElementById('alertaTransaccion').innerHTML = (' Transacción rechazada: retiro de $' + retiro)
        vaciarSaldo()
        vaciarTransaccion()
    }
    else {
        vaciarInputRetirar()
        saldoActual = saldoMenosRetiro
        document.getElementById('transaccion').innerHTML = ("Retiro de: $" + retiro)
        document.getElementById('nuevoSaldo').innerHTML = ("Nuevo saldo: $" + saldoActual)
        vaciarAlertas()
        vaciarSaldo()
    }
}