const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        match: [/^[A-Za-z\s]+$/, 'Solo se permiten letras'],
    },
    descripcion: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 10,
    },
    stock: {
        type: Number,
        required: true,
        min: [0, 'No se permiten valores negativos'],
    },
});

module.exports = mongoose.model('Product', productSchema);