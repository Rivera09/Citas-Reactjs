import React, { Fragment, useState } from "react";
import shortid from 'shortid';

const Formulario = ({crearCita}) => {
  // Crear state de citas
  const [cita, actualizarCita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });
  const [error,actualizarError] = useState(false);
  //   Función que se ejecuta cada vez que el usuario escribe en un input
  const actualizarState = (e) => {
    actualizarCita({
      ...cita,
      [e.target.name]: e.target.value,
    });
  };

  //   Extraer los valoreas
  const { mascota, propietario, fecha, hora, sintomas } = cita;
  // Cuando el usuario presiona el botón de submit
  function submitCita(e){
    e.preventDefault();
    // Validar
    if(mascota.trim()===""||propietario.trim()===""||fecha.trim()===""||hora.trim()===""||sintomas.trim()===""){
      actualizarError(true);
      return;
    }
    // Asignar un ID
    cita.id = shortid.generate();
    // Eliminar el mensaje de error
    actualizarError(false);
    // Crear la cita
    crearCita(cita);
    // Reiniciar el form
    actualizarCita({
      mascota: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: "",
    });
  }
  return (
    <Fragment>
      <h2>Crear cita</h2>
      {error ? <p className="alerta-error">Todos los campos son obligatorios.</p>:null};
      <form onSubmit={submitCita} autoComplete="off">
        <label>Nombre mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre de la mascota"
          onChange={actualizarState}
          value={mascota}
        />
        <label>Nombre dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre del dueño"
          onChange={actualizarState}
          value={propietario}
        />
        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={actualizarState}
          value={fecha}
        />
        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={actualizarState}
          value={hora}
        />
        <label>Síntomas</label>
        <textarea
          name="sintomas"
          className="u-full-width"
          onChange={actualizarState}
          value={sintomas}
        ></textarea>
        <button className="u-full-width button-primary">Agregar cita</button>
      </form>
    </Fragment>
  );
};

export default Formulario;
