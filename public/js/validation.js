function soloLetras(e) {
    const key = e.keyCode || e.which;
    const tecla = String.fromCharCode(key).toLowerCase();
    const letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";

    if (letras.indexOf(tecla) === -1) {
        alert("Solo se permiten letras en el nombre.");
        return false;
    }
}

function bloquearNegativos(e) {

    if (e.key === '-' || e.key === 'e' || e.key === 'E') {
        e.preventDefault();
        return false;
    }
}

function validarFormulario() {
    const nombre = document.getElementById('nombre').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();
    const stockInput = document.getElementById('stock').value.trim();

    const errores = [];


    if (!nombre) {
        errores.push("El campo nombre es obligatorio.");
    }

    if (!descripcion) {
        errores.push("El campo descripción es obligatorio.");
    } else if (descripcion.length < 5 || descripcion.length > 10) {
        errores.push("La descripción debe tener entre 5 y 10 caracteres.");
    }

    if (!stockInput) {
        errores.push("El campo stock es obligatorio.");
    } else {
        const stock = parseInt(stockInput);
        if (isNaN(stock)) {
            errores.push("El stock debe ser un número.");
        } else if (stock < 0) {
            errores.push("El stock no puede ser negativo.");
        }
    }


    if (errores.length > 0) {
        alert(errores.join("\n"));
        return false;
    }

    return true;
}