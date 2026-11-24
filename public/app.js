const form = document.getElementById('form-tarea');
const lista = document.getElementById('lista-tareas');

async function cargarTareas() {
  const res = await fetch('/api/tareas');
  const tareas = await res.json();
  if (Array.isArray(tareas)) {
    lista.innerHTML = tareas.map(t => `<li>${t.titulo}</li>`).join('');
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const titulo = document.getElementById('titulo').value;
  await fetch('/api/tareas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo })
  });
  form.reset();
  cargarTareas();
});

cargarTareas();
