console.log('Hola DIOS REY 🎃');

const formulario = document.getElementById('formulario')
const input = document.getElementById('input')
const listaTareas = document.getElementById('lista-tareas')
const template = document.getElementById('template').content
const fragment = document.createDocumentFragment()
// let tareas = {
//     1637449835149: {
//         id: 1637449835149,
//         texto: 'Tarea #1',
//         estado: false
//     },
//     1637449983815: {
//         id: 1637449983815,
//         texto: 'Tarea #2',
//         estado: false
//     }
// }
let tareas = {}

document.addEventListener('DOMContentLoaded', () => {
    
    if (localStorage.getItem('tareas')) {
        tareas = JSON.parse(localStorage.getItem('tareas'))
    }

    pintarTareas()
})

listaTareas.addEventListener('click', e => {
    btnAccion(e)
})

formulario.addEventListener('submit', e => {
    e.preventDefault()
    // console.log(input.value);


    setTareas(e)
})

const setTareas = e => {
  if (input.value.trim() === '') {
      console.log('esta vacio');
      return
  }

  const tarea = {
      id: Date.now(),
      texto: input.value,
      estado: false
  }
  
  tareas[tarea.id] = tarea
//    console.log(tareas);
   formulario.reset()
   input.focus()

   pintarTareas()
}

const pintarTareas = () => {

    localStorage.setItem('tareas', JSON.stringify(tareas))

    if (Object.values(tareas).length === 0) {
        
        listaTareas.innerHTML = `<div class="alert alert-dark text-center">
        No hay tareas pendientes 😎
        </div>`
        
        return
    }

    listaTareas.innerHTML = ''
    Object.values(tareas).forEach(tarea => {
    //  console.log(tarea);     
     const clone = template.cloneNode(true)
     clone.querySelector('p').textContent = tarea.texto

     if (tarea.estado) {
         clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary')
         clone.querySelectorAll('.fas')[0].classList.replace('fa-check-circle', 'fa-undo-alt')
         clone.querySelector('p').style.textDecoration = 'line-through'
     }

     clone.querySelectorAll('.fas')[0].dataset.id = tarea.id
     clone.querySelectorAll('.fas')[1].dataset.id = tarea.id
     fragment.appendChild(clone)
  })
  listaTareas.appendChild(fragment)
}

const btnAccion = e => {
//    console.log(e.target.classList.contains('fa-check-circle'))
   if (e.target.classList.contains('fa-check-circle')) {
    //    console.log(e.target.dataset.id)
       tareas[e.target.dataset.id].estado = true
       pintarTareas()
    //    console.log(tareas);
   }

   if (e.target.classList.contains('fa-minus-circle')) {
    //    console.log(e.target.dataset.id)
       delete tareas[e.target.dataset.id]
       pintarTareas()
    //    console.log(tareas);
   }

   if (e.target.classList.contains('fa-undo-alt')) {
       tareas[e.target.dataset.id].estado = false
       pintarTareas()
    //    console.log(tareas);
   }


   
   e.stopPropagation()
}





















