const formulario = document.getElementById("form-nota");
const campoTitulo = document.getElementById("titulo");
const campoContenido = document.getElementById("contenido");
const campoCategoria = document.getElementById("categoria");
const filtro = document.getElementById("filtro");
const lista = document.getElementById("lista-notas");
const mensaje = document.getElementById("mensaje");

let notas = [];
let notaEliminada = null;

function mostrarMensaje(texto, tipo = "") {
  mensaje.textContent = texto;
  mensaje.className = "mensaje" + (tipo ? " " + tipo : "");
}

function renderizarNotas() {
  lista.replaceChildren();
  const visibles = notas.filter(
    (nota) => filtro.value === "Todas" || nota.categoria === filtro.value,
  );
  if (visibles.length === 0) {
    const vacio = document.createElement("p");
    vacio.className = "vacio";
    vacio.textContent = notas.length
      ? "No hay notas en esta categoría."
      : "Todavía no tienes notas. ¡Agrega la primera!";
    lista.appendChild(vacio);
    return;
  }
  visibles.forEach((nota) => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "nota";
    const titulo = document.createElement("h3");
    titulo.textContent = nota.titulo;
    const etiqueta = document.createElement("span");
    etiqueta.className = "etiqueta";
    etiqueta.textContent = nota.categoria;
    const contenido = document.createElement("p");
    contenido.textContent = nota.contenido;
    const acciones = document.createElement("div");
    acciones.className = "acciones-nota";
    const eliminar = document.createElement("button");
    eliminar.className = "boton-eliminar";
    eliminar.type = "button";
    eliminar.textContent = "Eliminar nota";
    eliminar.setAttribute("aria-label", `Eliminar nota: ${nota.titulo}`);
    eliminar.addEventListener("click", () => eliminarNota(nota.id));
    acciones.appendChild(eliminar);
    tarjeta.append(titulo, etiqueta, contenido, acciones);
    lista.appendChild(tarjeta);
  });
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const titulo = campoTitulo.value.trim();
  const contenido = campoContenido.value.trim();

  if (!titulo || !contenido) {
    mostrarMensaje(
      "Completa el título y el contenido antes de agregar la nota.",
      "error",
    );
    (!titulo ? campoTitulo : campoContenido).focus();
    return;
  }

  notas.unshift({
    id: Date.now(),
    titulo,
    contenido,
    categoria: campoCategoria.value,
  });
  formulario.reset();
  renderizarNotas();
  mostrarMensaje("Nota agregada correctamente.", "exito");
  campoTitulo.focus();
});

function eliminarNota(id) {
  const indice = notas.findIndex((nota) => nota.id === id);
  if (indice < 0) return;
  const confirmacion = confirm(
    "¿Seguro que deseas eliminar esta nota? Pulsa Cancelar para conservarla.",
  );
  if (!confirmacion) {
    mostrarMensaje("No se eliminó la nota. Tus datos siguen intactos.");
    return;
  }
  notaEliminada = { nota: notas[indice], indice };
  notas.splice(indice, 1);
  renderizarNotas();
  mostrarMensaje(
    "Nota eliminada. Si fue un error, puedes deshacerlo.",
    "exito",
  );
  const deshacer = document.createElement("button");
  deshacer.type = "button";
  deshacer.className = "boton boton-secundario";
  deshacer.textContent = "Deshacer eliminación";
  deshacer.addEventListener("click", () => {
    if (!notaEliminada) return;
    notas.splice(
      Math.min(notaEliminada.indice, notas.length),
      0,
      notaEliminada.nota,
    );
    notaEliminada = null;
    renderizarNotas();
    mostrarMensaje("Eliminación deshecha. La nota fue recuperada.", "exito");
  });
  mensaje.append(" ");
  mensaje.appendChild(deshacer);
}

filtro.addEventListener("change", () => {
  renderizarNotas();
  mostrarMensaje(`Filtro aplicado: ${filtro.value}.`);
});

renderizarNotas();
