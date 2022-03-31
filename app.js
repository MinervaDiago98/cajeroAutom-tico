
var cuentas = [
    { nombre: 'Mali', clave: '123',saldo: 200 },
    { nombre: 'Gera', clave: '345' , saldo: 290 },
    { nombre: 'Maui', clave: '567', saldo: 67 }
]

let nombre, saldoInicial, saldoActual

let consultar = document.getElementById('btnConsultar')
let depositar = document.getElementById('btnDepositar')
let boton = document.getElementById('botonIngresar')

//var retirar = document.getElementById('btnRetirar')
//depositar.addEventListener('click', depositarMonto)
// retirar.addEventListener('click', retirarMonto)

if(consultar) consultar.addEventListener('click', consultarSaldo) 

if(depositar) depositar.addEventListener('click', depositarMonto)

if(boton) boton.addEventListener('click', ingresar)

if(!boton) saludoUsuario()

function pagCuenta() { location.href = 'cuenta.html' }

function pagIndex() { location.href='index.html' }


function saludoUsuario(){
    let nombreUsuario = localStorage.getItem('saludo')
    document.getElementById('saludo').innerHTML = ('¡Hola '+nombreUsuario+'!')
}

function ingresar(e){
    e.preventDefault()


    let usuario = document.getElementById('usuario').value
    let contraseña = document.getElementById('contraseña').value

    //concateno el valor de las variables 'usuario' y 'contraseña', y se lo asigno a 'credencial'
    const credencial = usuario+contraseña

    //declaro un arreglo vacío en donde ingresaré los datos de nombre y contraseña de los objetos de 'cuentas'
    const arreglo = []

    //itero sobre el arreglo de objetos 'cuenta'
    for(let i=0; i<cuentas.length; i++){
        //agrego al arreglo vacío, y concatenando, el valor de las propiedades 'nombre' y 'clave' de cada objeto
        arreglo.push(cuentas[i].nombre + cuentas[i].clave)   
    }

    //en las condicionales siguientes comparo si algún indice de mi arreglo es igual al valor de 'credencial'
    if(arreglo [0] == credencial){
        pagCuenta()
        nombre = cuentas[0].nombre
        localStorage.setItem('saludo', nombre)
        saldoInicial = cuentas[0].saldo
        localStorage.setItem('saldo',saldoInicial)
    }
    else if(arreglo [1] == credencial){
        pagCuenta()
        nombre = cuentas[1].nombre
        localStorage.setItem('saludo', nombre)
        saldoInicial = cuentas[1].saldo
        localStorage.setItem('saldo',saldoInicial)
    }
    else if(arreglo [2] == credencial){
        pagCuenta()
        nombre = cuentas[2].nombre
        localStorage.setItem('saludo', nombre)
        saldoInicial = cuentas[2].saldo
        localStorage.setItem('saldo',saldoInicial)
    }
    else{
        document.getElementById('alerta').innerHTML = ("Usuario o contraseña incorrectos")
    }   
}

saldoActual = localStorage.getItem('saldo')


//Funciones para vaciar campos y textos asignados a los span
function vaciarSaldo() { document.getElementById('saldo').innerHTML = ('') }

function vaciarTransaccion(){ document.getElementById('transaccion').innerHTML = ('') }

function vaciarInputDepositar() { document.getElementById('depositar').value = ('') }

function vaciarInputRetirar() { document.getElementById('retirar').value = ('') }

function vaciarAlertas(){
    document.getElementById('alerta').innerHTML = ('')
    document.getElementById('alertaSaldo').innerHTML = ('')
    document.getElementById('alertaTransaccion').innerHTML = ('')
}

function vaciarAlerta2y3(){
    document.getElementById('alertaSaldo').innerHTML = ('')
    document.getElementById('alertaTransaccion').innerHTML = ('')
}


//Funciones para consultar, depositar y retirar
function consultarSaldo(e){
    e.preventDefault()
    document.getElementById('saldo').innerHTML = ("Saldo: $" +saldoActual) 
    vaciarAlertas()
    vaciarTransaccion()
} 

function depositarMonto(){
    let monto = document.getElementById('depositar').value
    let deposito = parseFloat(monto)
    let saldoMasDeposito = deposito + parseFloat(saldoActual)

    vaciarInputRetirar()

    if(monto === ''){
        document.getElementById('alerta').innerHTML = ('Ingrese un monto antes de depositar')
        vaciarAlerta2y3()
        vaciarSaldo()
        vaciarTransaccion()
    }
    else if(deposito < 0){
        document.getElementById('alerta').innerHTML = ('Por favor, ingrese una cantidad válida')
        vaciarSaldo()
        vaciarTransaccion()
    }
    else if(saldoMasDeposito > 990){
        document.getElementById('alerta').innerHTML = ('¡No puede tener más de $990 en cuenta!')
        document.getElementById('alertaSaldo').innerHTML = ('Saldo actual: $'+saldoActual)
        document.getElementById('alertaTransaccion').innerHTML = (' Transacción rechazada: deposito de $'+deposito)
        vaciarInputDepositar()
        vaciarSaldo()
        vaciarTransaccion()
    }
    else{
        vaciarAlertas()
        saldoActual = saldoMasDeposito
        document.getElementById('transaccion').innerHTML = ("Deposito de: $" +deposito)
        document.getElementById('saldo').innerHTML = ("Nuevo saldo: $ " +saldoActual)
        vaciarInputDepositar()  
    }
}

function retirarMonto(){
    let cantidad = document.getElementById('retirar').value
    let retiro = parseFloat(cantidad)
    let saldoMenosRetiro = saldoActual - retiro

    vaciarInputDepositar()

    if(cantidad === ''){
        document.getElementById('alerta').innerHTML = ('Ingrese un monto antes de retirar')
        vaciarSaldo()
        vaciarTransaccion()
        vaciarAlerta2y3()
    }
    else if(retiro < 0){
        document.getElementById('alerta').innerHTML = ('Por favor, ingrese una cantidad válida')
        vaciarSaldo()
        vaciarTransaccion()
    }
    else if(saldoActual < retiro){
        document.getElementById('alerta').innerHTML = ('No cuenta con esa cantidad para retirar')
        vaciarSaldo()
        vaciarTransaccion()
    }
    else if(saldoMenosRetiro < 10){
        vaciarInputRetirar()
        document.getElementById('alerta').innerHTML = ('¡No puede tener menos de $10 en cuenta!')
        document.getElementById('alertaSaldo').innerHTML = ('Saldo actual: $'+saldoActual)
        document.getElementById('alertaTransaccion').innerHTML = (' Transacción rechazada: retiro de $'+retiro)
        vaciarSaldo()
        vaciarTransaccion()
    }
    else{
        vaciarInputRetirar()
        saldoActual = saldoMenosRetiro
        document.getElementById('transaccion').innerHTML = ("Retiro de: $" +retiro)
        document.getElementById('saldo').innerHTML = ("Nuevo saldo: $ " +saldoActual) 
        vaciarAlertas()
    }
}