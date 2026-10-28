const formulario = document.getElementById("form")
const resultado = document.getElementById("resultado")

function enviarMensaje(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Mensaje enviado correctamente")
        }, 1500);
    });
}

formulario.addEventListener("submit", async function(event){
    event.preventDefault();

    const nombre = document.getElementById("nombre").value()
    const correo = document.getElementById("correo").value()
    const mensaje = document.getElementById("mensaje").value()

    if(nombre !== "" && correo !== "" && mensaje !== ""){
        resultado.textContent = "Enviando mensaje...";
        console.log("El formulario está siendo enviado")

        const respuesta = await enviarMensaje()

        resultado.textContent = respuesta

        console.log(respuesta);
        console.log("Nombre: " + nombre)
        console.log("Correo: " + correo)
        console.log("Mensaje: " + mensaje)

        formulario.reset();
    }else{
        resultado.textContent = "Por favor, completá todos los campos."
        console.log("Faltan completar campos")
    }
});