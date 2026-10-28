// =========================================================
// 1. VALIDACIÓN DE CONTRASEÑA EN INICIO DE SESIÓN
// Conceptos: Evento Submit, Promise, .then() y .catch()
// =========================================================

const formLogin = document.getElementById("form-login");
const loginPassInput = document.getElementById("login-pass");

// Función que retorna una Promesa para validar longitud de contraseña
function validarContrasena(password) {
    return new Promise((resolve, reject) => {
        if (password.length >= 8) {
            resolve("Autenticación exitosa: Contraseña válida.");
        } else {
            reject("Error: La contraseña debe tener al menos 8 caracteres.");
        }
    });
}


formLogin.addEventListener("submit", (e) => {
    e.preventDefault(); 
    const passValue = loginPassInput.value;
    validarContrasena(passValue)
        .then((mensajeExito) => {
            console.log(mensajeExito);
            alert(mensajeExito);
        })
        .catch((mensajeError) => {
            console.log(mensajeError);
            alert(mensajeError);
        });
});


// =========================================================
// 2. REGISTRO DE USUARIO Y CONFIRMACIÓN DE CONTRASEÑA
// Conceptos: Evento Submit, Promise, Async / Await, Switch
// =========================================================

const formRegistro = document.getElementById("form-registro");
const regPass = document.getElementById("reg-pass");
const regConfirmPass = document.getElementById("reg-confirm-pass");

// Función asíncrona simulada para procesar el registro con una Promesa
function procesarRegistro(pass1, pass2) {
    return new Promise((resolve, reject) => {
        if (pass1 !== pass2) {
            reject("error_coincidencia");
        } else if (pass1.length < 8) {
            reject("error_longitud");
        } else {
            resolve("exito");
        }
    });
}

// Evento utilizando Async / Await y sentencia Switch para manejar respuestas
formRegistro.addEventListener("submit", async (e) => {
    e.preventDefault();

    const p1 = regPass.value;
    const p2 = regConfirmPass.value;

    try {

        const resultado = await procesarRegistro(p1, p2);

        if (resultado === "exito") {
            alert("¡Cuenta creada con éxito en Bruma & Esencia!");
            formRegistro.reset();
        }
    } catch (codigoError) {
       
        switch (codigoError) {
            case "error_coincidencia":
                alert("Las contraseñas no coinciden. Por favor, verifica.");
                console.log("Fallo de registro: Contraseñas no coinciden.");
                break;
            case "error_longitud":
                alert("La contraseña debe tener al menos 8 caracteres.");
                console.log("Fallo de registro: Longitud insuficiente.");
                break;
            default:
                alert("Ocurrió un error inesperado al registrar la cuenta.");
                console.log("Error desconocido.");
                break;
        }
    }
});