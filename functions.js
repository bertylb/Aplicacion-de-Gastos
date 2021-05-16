
// function divAlert() {

//     const alertMessage = document.createElement('div')
//     alertMessage.textContent = "Usted no posee el saldo suficiente para realizar la operacion"
//     alertMessage.style.fontWeight = "bold"
//     alertMessage.style.padding = "13px"
//     alertMessage.style.borderRadius = "2%"

//     alertMessage.className = "alert-danger"
//     const cardBox = document.getElementById('card-box')

//     cardBox.appendChild(alertMessage)

//     //___________________ eliminar el alerta despues de cuatro segundos y medio __________________
//     window.setTimeout(() => {
//         cardBox.removeChild(alertMessage)
//         importe.classList.remove("is-invalid")
//         descripcion.classList.remove("is-invalid")
//         const p = document.getElementsByTagName("p")
//         p[0].style.display = "none"
//         p[1].style.display = "none"
//     }, 4500)
// }
// export { divAlert }