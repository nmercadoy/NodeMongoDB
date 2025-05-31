const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

const app = express();

// Conexión a MongoDB
mongoose.connect('mongodb://localhost/inventario', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Motor de vistas
app.set('view engine', 'ejs');

// Modelo
const Product = require('./models/Product');

// Rutas
app.get('/', async(req, res) => {
    const productos = await Product.find();
    res.render('list', { productos });
});

app.get('/create', (req, res) => {
    res.render('create');
});

app.post('/create', async(req, res) => {
    const { nombre, descripcion, stock } = req.body;
    try {
        await Product.create({ nombre, descripcion, stock });
        res.redirect('/');
    } catch (err) {
        res.send('Error al crear producto: ' + err.message);
    }
});

app.get('/edit/:id', async(req, res) => {
    const producto = await Product.findById(req.params.id);
    res.render('edit', { producto });
});

app.put('/edit/:id', async(req, res) => {
    const { nombre, descripcion, stock } = req.body;
    await Product.findByIdAndUpdate(req.params.id, { nombre, descripcion, stock });
    res.redirect('/');
});

app.delete('/delete/:id', async(req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.send('Producto eliminado exitosamente');
});

// Servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});