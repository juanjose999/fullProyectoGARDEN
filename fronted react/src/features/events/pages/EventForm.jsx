import { useEffect, useState } from "react";
import './EventForm.css'

export const EventForm = () => {
  const [imagen, setImagen] = useState(null);
  const [isViewMsj, setIsViewMsj] = useState(false)
  const [msg, setMsg] = useState('')

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImagen(file);
    }
  };

  const initialFormData = {
    nombre: "",
    descripcion: "",
    categoria: "",
    lugar: "",
    cuidad: "",
    direccion: "",
    fechaEvento: "",
    capacidad: "",
    precioBase: 0,
  };

  const [formData, setFormData] = useState({
    initialFormData
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      fechaEvento: new Date(formData.fechaEvento).toISOString(),
    };

    console.log(payload);

    createEvent(payload)

  };

  const createEvent = async (data) => {
    let token = localStorage.getItem('token')
    console.log('tokenCreateEvent:',token)

      const multipartData = new FormData();

      multipartData.append(
        "evento",
        new Blob(
          [JSON.stringify(data)],
          { type: "application/json" }
        )
      );

      multipartData.append("imagen", imagen);


    let req = await fetch('http://localhost:8080/eventos', {
      method:"POST",
      headers:{
        'Authorization':`Bearer ${token}`
      },
      body: multipartData
    })
    if(!req.ok){
      throw new Error('error')
    }
    let resp = await req.json()
    console.log(resp)
    setIsViewMsj(true)
    if(resp.success){
      setMsg(" ✅ Se he creado el evento correctamente")
      setFormData(initialFormData)
      setImagen(null)

    }else{
       setMsg("Error al intentar crear el evento")
    }
    setTimeout(() => {
      setMsg("")
      setIsViewMsj(false)
    },2000)
  }

  useEffect(() => {
    console.log('hoola')
  },[])

  return (
    <>
      
      <div className="container">

        {isViewMsj && (
        <div className="msjStatus">
          <span>{msg}</span>
        </div>)}

        <form className="card" onSubmit={handleSubmit}>


          <h1 className="title">Crear Evento</h1>

          <div className="grid">
            <div className="field">
              <label>Imagen del Evento</label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            {imagen && (
              <div className="field">
                <img
                  src={URL.createObjectURL(imagen)}
                  alt="Preview"
                  style={{
                    width: "60%",
                    maxWidth: "200px",
                    borderRadius: "12px",
                    border: "1px solid #334155",
                  }}
                />
              </div>
            )}
            <div className="field">
              <label>Nombre</label>
              <input
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label>Categoría</label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
              >
                <option value="CONCIERTO">CONCIERTO</option>
                <option value="FESTIVAL">FESTIVAL</option>
                <option value="TEATRO">TEATRO</option>
                <option value="DEPORTIVO">DEPORTIVO</option>
              </select>
            </div>

            <div className="field field-full">
              <label>Descripción</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label>Lugar</label>
              <input
                name="lugar"
                value={formData.lugar}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label>Ciudad</label>
              <input
                name="cuidad"
                value={formData.cuidad}
                onChange={handleChange}
              />
            </div>

            <div className="field field-full">
              <label>Dirección</label>
              <input
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label>Fecha Evento</label>
              <input
                type="datetime-local"
                name="fechaEvento"
                value={formData.fechaEvento}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label>Capacidad</label>
              <input
                type="number"
                name="capacidad"
                value={formData.capacidad}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label>Precio Base</label>
              <input
                type="number"
                name="precioBase"
                value={formData.precioBase}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="button-container">
            <button type="submit">
              Crear Evento
            </button>
          </div>
        </form>
      </div>
    </>
  );
}