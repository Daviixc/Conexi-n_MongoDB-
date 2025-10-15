const API = "http://localhost:3000/gatos";

let editando = false;
let gatoEditandoId = null;

// Cargar gatos
async function cargarGatos() {
  try {
    const res = await fetch(API);
    const gatos = await res.json();
    
    document.getElementById("gatos").innerHTML = gatos.map(g => `
      <div class="card">
        <h3>${g.nombre}</h3>
        <p><b>Color:</b> ${g.color}</p>
        <p><b>Raza:</b> ${g.raza}</p>
        <p><b>Edad:</b> ${g.edad} años</p>
        <p><b>Descripción:</b> ${g.descripcion || "Sin descripción"}</p>
        <div class="botones">
          <button class="btn-editar" onclick="editarGato('${g._id}')">✏️ Editar</button>
          <button class="btn-eliminar" onclick="eliminarGato('${g._id}')">🗑️ Eliminar</button>
        </div>
      </div>
    `).join("");
  } catch (error) {
    console.error("Error cargando gatos:", error);
  }
}

// Editar gato
async function editarGato(id) {
  try {
    console.log("Intentando editar gato ID:", id);
    
    const res = await fetch(`${API}/${id}`);
    if (!res.ok) throw new Error('Error al cargar gato');
    
    const gato = await res.json();
    
    // Llenar formulario
    document.getElementById("nombre").value = gato.nombre;
    document.getElementById("color").value = gato.color;
    document.getElementById("raza").value = gato.raza;
    document.getElementById("edad").value = gato.edad;
    document.getElementById("descripcion").value = gato.descripcion || "";
    
    // Cambiar a modo edición
    editando = true;
    gatoEditandoId = id;
    document.getElementById("btnSubmit").textContent = "Actualizar Gato";
    document.getElementById("btnCancelar").style.display = "inline-block";
    
  } catch (error) {
    console.error("Error editando:", error);
    alert("Error al cargar gato para editar");
  }
}

// Form submit
document.getElementById("form").addEventListener("submit", async e => {
  e.preventDefault();
  
  const gatoData = {
    nombre: document.getElementById("nombre").value,
    color: document.getElementById("color").value,
    raza: document.getElementById("raza").value,
    edad: parseInt(document.getElementById("edad").value),
    descripcion: document.getElementById("descripcion").value
  };

  try {
    if (editando) {
      // Actualizar
      await fetch(`${API}/${gatoEditandoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gatoData)
      });
      cancelarEdicion();
    } else {
      // Crear
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gatoData)
      });
    }
    
    document.getElementById("form").reset();
    await cargarGatos();
    
  } catch (error) {
    console.error("Error guardando:", error);
    alert("Error al guardar gato");
  }
});

// Cancelar edición
function cancelarEdicion() {
  editando = false;
  gatoEditandoId = null;
  document.getElementById("form").reset();
  document.getElementById("btnSubmit").textContent = "Agregar Gato";
  document.getElementById("btnCancelar").style.display = "none";
}

// Eliminar gato
async function eliminarGato(id) {
  if (confirm("¿Estás seguro de eliminar este gato?")) {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      await cargarGatos();
    } catch (error) {
      console.error("Error eliminando:", error);
      alert("Error al eliminar gato");
    }
  }
}

// Botón cancelar
document.getElementById("btnCancelar").addEventListener("click", cancelarEdicion);

// Inicializar
cargarGatos();