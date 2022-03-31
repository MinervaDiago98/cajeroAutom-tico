//Variables
var cuentas = [
    { nombre: 'Mali', clave: '123',saldo: 200 },
    { nombre: 'Gera', clave: '345' , saldo: 290 },
    { nombre: 'Maui', clave: '567', saldo: 67 }
]

let boton = document.getElementById('btnDepositar')
boton.addEventListener('click', Depositar)

let boton2 = document.getElementById('btnRetirar')
boton2.addEventListener('click', Retirar)

var saldoMali = cuentas[0].saldo

function pagCuenta(){
    location.href = 'cuenta.html'
}

function Mali(){
    document.getElementById('saldo').innerHTML = ("Saldo: " +saldoMali)   
}

function Depositar(){
    var deposito = document.getElementById('depositar').value
    document.getElementById('depositar').value = (" ")
    saldoMali = parseInt(deposito) + saldoMali
    document.getElementById('saldo').innerHTML = ("Saldo: " +saldoMali)   
}
function Retirar(){
    var retiro = document.getElementById('retirar').value
    document.getElementById('retirar').innerHTML = (" ")
    document.getElementById('retirar').value = (" ")
    saldoMali =  saldoMali - parseInt(retiro) 
    document.getElementById('saldo').innerHTML = ("Saldo: " +saldoMali)   
}

function ingresar(){
    let usuario = document.getElementById('usuario').value
    let contraseña = document.getElementById('contraseña').value
    const credencial = usuario+contraseña
    const arreglo = []

    for(let i=0; i<cuentas.length; i++){
        arreglo.push(cuentas[i].nombre + cuentas[i].clave)   
    }
    if(arreglo [0] == credencial){
        pagCuenta()
    }
    else if(arreglo [1] == credencial){
        
    }
    else if(arreglo [2] == credencial){
        
    }
    else{
        document.getElementById('alerta').innerHTML = ("Usuario o contraseña incorrectos")
    }   
}

