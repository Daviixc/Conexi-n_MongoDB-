import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
const usuario = "admin";
const contraseña = encodeURIComponent("admin1234");
const uri = `mongodb+srv://${usuario}:${contraseña}@cluster0.e3honaj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri);
let db;

async function conectar() {
  try {
    await client.connect();
    db = client.db("gatosDB");
    console.log("✅ Conectado a MongoDB Atlas");

    app.listen(3000, () => console.log("🐾 Servidor corriendo en puerto 3000"));
  } catch (err) {
    console.error("❌ Error conectando a MongoDB:", err);
  }
}

conectar();

// GET todos los gatos
app.get("/gatos", async (req, res) => {
  try {
    const gatos = await db.collection("gatos").find().toArray();
    res.json(gatos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET un gato por ID
app.get("/gatos/:id", async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const gato = await db.collection("gatos").findOne({ _id: id });
    
    if (!gato) {
      return res.status(404).json({ error: "Gato no encontrado" });
    }
    
    res.json(gato);
  } catch (err) {
    res.status(400).json({ error: "ID inválido" });
  }
});

// POST nuevo gato
app.post("/gatos", async (req, res) => {
  try {
    const result = await db.collection("gatos").insertOne({
      ...req.body,
      fechaCreacion: new Date()
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT actualizar gato
app.put("/gatos/:id", async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const result = await db.collection("gatos").updateOne(
      { _id: id }, 
      { $set: req.body }
    );
    
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE gato
app.delete("/gatos/:id", async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const result = await db.collection("gatos").deleteOne({ _id: id });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});