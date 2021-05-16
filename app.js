const form = document.getElementById('formulario')
const btn = document.getElementById('btn')
const lista = document.getElementById('lista')
const saldoIng = document.getElementById('saldoIng')
const saldo = document.getElementById('saldo')
const gasto = document.getElementById('gasto')
const inputs = document.querySelectorAll('#formulario input')

var submit = 0

let cont = 0
let total = 0

// let Imp = prompt('Ingrese un importe inicial', 0)
let Imp = 5000;
saldoIng.textContent = `$${Imp}`
saldo.textContent = `$${Imp}`
gasto.textContent = `$${total}`

const reImp = /^[0-9]{1,15}$/
const reDes = /^[a-zA-ZñóíáéúÑÁÉÍÓÚ]+$/

const validarFormulario = e => {
    switch(e.target.name){
        case "importe":
            var returnImporte = validarCampo(reImp, e.target, "importe")
            // validar campo devuelve true o false y se guarda en returnImporte
            if(returnImporte){
                submit++
            }else{
                submit = 0
            }
        break
        case "descripcion":
            var returnDescripcion = validarCampo(reDes, e.target, "descripcion")
            if(returnDescripcion){
                submit++
            }else{
                submit = 0
            }
        break
        }    
    if(submit!=0){
        btn.disabled = false //deshabilitar boton submit
    }else{
        btn.disabled = true //habilitar boton submit
    }
}

//___________________ valida el campo, si esta mal marca el label en rojo y muestra el mensaje de error ________________________

const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)){
        input.classList.remove("is-invalid")
        const label = document.getElementById(`label_${campo}`)
        label.style.color = "rgb(42, 90, 179)" //azul
        const error = document.getElementById(`error_${campo}`)
        error.style.display = 'none'
        return true
    }else{
        error(input, campo)
        return false
    }
}

//_________________agreaga la clase invalid al form control, label en rojo y muestra el mensaje de error_____________________

const error = (input, campo) => {
    input.focus()
    input.classList.add("is-invalid")
    const label = document.getElementById(`label_${campo}`)
    label.style.color = "red"
    const error = document.getElementById(`error_${campo}`)
    error.style.display = 'block'
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario) //se valida el formulario cunado se presiona y suelta una tecla
    input.addEventListener('blur', validarFormulario)  //y cuando el input pierde el foco
})

form.addEventListener('submit', (event) => {

    event.preventDefault();
    const cardSaldo= Imp - cont

    if(importe.value === ""){
        error(importe, "importe");
    }else if(descripcion.value ===""){
        error(descripcion, "descripcion")
    }else if(importe.value>cardSaldo){
        divAlert()
    }else{
        cont += parseInt(importe.value)
        gasto.textContent = `$${cont}`
        
        addItem()
        form.reset()        
        btn.disabled = true
        
        saldo.textContent = `$${Imp - cont}` //al saldo se le resta el gasto
        ChangeCard()
    }
})

function addItem() {
    const newItem = document.createElement('li')
    newItem.className = 'list-group-item d-flex justify-content-between align-items-center'
    newItem.textContent = descripcion.value
    newItem.style.fontWeight = "bold"
    
    const span = document.createElement('span')
    span.textContent = '$' + Number(importe.value)
    span.style.fontWeight ="bold"
    
    newItem.appendChild(span)
    lista.appendChild(newItem)
}

//___________________________ change card color ______________________________________

function ChangeCard(){
    const card = document.getElementById('card_currentAmount')
    const text = document.getElementById('text_currentAmount')

    let result = Imp/4
    const cardSaldo = Imp - cont

    if(cardSaldo<=0){
        card.classList.replace('border-warning', 'border-danger')
        text.classList.replace('text-warning', 'text-danger')
        //-----------si salta a cero sin pasar por el color warning--------------- 
        card.classList.replace('border-success', 'border-danger')
        text.classList.replace('text-success', 'text-danger')
    }else if(cardSaldo<=result){    
        card.classList.replace('border-success', 'border-warning')
        text.classList.replace('text-success', 'text-warning')
    }
}

function divAlert() {
    const alertMessage = document.createElement('div')
    alertMessage.textContent = "Usted no posee el saldo suficiente para realizar la operacion"
    alertMessage.style.fontWeight = "bold"
    alertMessage.style.padding = "13px"
    alertMessage.style.borderRadius = "2%"

    alertMessage.className = "alert-danger"
    const cardBox = document.getElementById('card-box')

    cardBox.appendChild(alertMessage)

    //___________________ eliminar el alerta despues de cuatro segundos y medio __________________
    window.setTimeout(() => {
        cardBox.removeChild(alertMessage)
        importe.classList.remove("is-invalid")
        descripcion.classList.remove("is-invalid")
        const p = document.getElementsByTagName("p")
        p[0].style.display = "none"
        p[1].style.display = "none"
    }, 4500)
}
