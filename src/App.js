import React, { Fragment, useState,useEffect } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";


function App() {

  // Citas en el localstorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) citasIniciales=[];
  // Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);
  // Use effect para realizar ciertas operaciones cuando el state cambia.
  useEffect(()=>{
    localStorage.setItem('citas',JSON.stringify(citas));
  },[citas]);

  // Función que tome las citas actuales y agrege la nueva.
  function crearCita(cita) {
    guardarCitas([...citas, cita]);
  }
  // Función que elimina una cita por id
  function eliminarCita(id) {
    guardarCitas(citas.filter((cita) => cita.id !== id));
  }
  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>
              {citas.length > 0
                ? "Administra tus citas."
                : "No hay citas."}
            </h2>
            {citas.map((cita) => (
              <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
