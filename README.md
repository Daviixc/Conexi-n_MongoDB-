# 🐱 Proyecto Gatos

Aplicación web conectada a una base de datos en **MongoDB Atlas**, que permite realizar consultas básicas (`find`, `insert`) desde una interfaz web construida con **HTML, CSS y JavaScript**, y un servidor **Node.js con Express**.

---

## 🚀 Descripción general

Este proyecto demuestra la conexión entre una **aplicación web** y una **base de datos en la nube (MongoDB Atlas)**.  
A través del backend con **Node.js**, los usuarios pueden interactuar con los datos almacenados (por ejemplo, agregar o visualizar registros de gatos 🐾).

---

## 🧰 Tecnologías utilizadas

**Frontend**
- HTML5  
- CSS3  
- JavaScript  

**Backend**
- Node.js  
- Express.js  
- MongoDB Atlas  

**Herramientas**
- Visual Studio Code  
- Postman (para pruebas de la API)

---

## ⚙️ Estructura del proyecto

Gatos/
│
├── index.html # Interfaz principal de la aplicación
├── style.css # Estilos del sitio
├── script.js # Lógica del lado del cliente
├── server.js # Servidor Node.js con Express y conexión a MongoDB
├── package.json # Dependencias del proyecto

---

## 🔌 Conexión con MongoDB Atlas

La conexión se realiza mediante una cadena de conexión que incluye:
```js
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://<usuario>:<contraseña>@cluster0.mongodb.net/gatos', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

Creditos:
Leonel Eduardo Salazar Perez XD
