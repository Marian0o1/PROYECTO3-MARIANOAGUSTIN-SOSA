import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Form() {
  const [propiedad, setPropiedad] = useState([]);
  const [propiedadSelec, setPropiedadSelec] = useState("");
  const [ubicacionSelec, setUbicacionSelec] = useState("");
  const [fechaCotizacion, setFechaCotizacion] = useState("");
  const [metroCuadrado, setMetroCuadrado] = useState("");
  const costoM2 = 35.86;
  const [resultado, setResultado] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("./src/components/datos.json");
        const propiedadData = response.data.map((item, index) => ({
          ...item,
          id: index,
        }));
        setPropiedad(propiedadData);
        console.log(response.data);
      } catch (error) {
        console.error("error fetch", error);
      }
    };
    fetchData();
  }, []);

  const saveToLocalStorage = (data, key) => {
    // Obtén el historial existente del localStorage
    const existingData = JSON.parse(localStorage.getItem(key)) || [];

    // Agrega la nueva cotización al historial existente
    const updatedData = [...existingData, ...data];

    // Guarda el historial actualizado en el localStorage
    localStorage.setItem(key, JSON.stringify(updatedData));
  };

  const getCurrentDateTime = () => {
    const today = new Date();
    const date = today.toLocaleDateString();
    const time = today.toLocaleTimeString();
    return `${date} ${time}`;
  };

  const alerta = (titulo, mensaje, icono) => {
    Swal.fire({
      icon: icono || "",
      title: titulo || "",
      text: mensaje,
      showConfirmButton: false,
      timer: 3500,
      width: "240px",
    });
  };

  const CotizarPoliza = () => {
    const confirmarCotizacion = async () => {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Se realizará la cotización con los datos ingresados.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, cotizar",
      });

      if (result.isConfirmed) {
        // Lógica de cotización
        const currentDateTime = getCurrentDateTime();
        setFechaCotizacion(currentDateTime);

        const seleccionarPropiedad = propiedad.find(
          (item) =>
            item.factor === parseFloat(propiedadSelec) &&
            item.categoria === "propiedad"
        );
        const seleccionarUbicacion = propiedad.find(
          (item) =>
            item.factor === parseFloat(ubicacionSelec) &&
            item.categoria === "ubicacion"
        );

        // Calculo de poliza mensual:
        const calcularPoliza =
          costoM2 * metroCuadrado * propiedadSelec * ubicacionSelec;

        // Guardamos los datos en el historial:
        const updatedResultado = [
          ...resultado,
          {
            propiedad: propiedadSelec ? seleccionarPropiedad.tipo : "",
            ubicacion: ubicacionSelec ? seleccionarUbicacion.tipo : "",
            fechaCotizacion: currentDateTime,
            costoM2,
            propiedadSelec,
            ubicacionSelec,
            metroCuadrado,
            calcPoliza: calcularPoliza.toFixed(2),
          },
        ];

        // Actualizamos el estado
        setResultado(updatedResultado);

        // Guardamos en localStorage
        saveToLocalStorage(updatedResultado, "dataPoliza");
        alerta("", "Cotización guardada con éxito.", "success");
      }
    };

    if (metroCuadrado === "" || !propiedadSelec || !ubicacionSelec) {
      return alerta(
        "Falta información",
        "Por favor, complete los datos que faltan."
      );
    } else if (metroCuadrado < 20 || metroCuadrado > 500) {
      return alerta(
        "Corroborar la información",
        "Por favor, ingrese un valor entre 20 y 500"
      );
    } else {
      confirmarCotizacion();
    }
  };

  return (
    <div className="center div-cotizador">
      <div>
        <label>Selecciona el tipo de propiedad</label>
        <select
          name="Propiedad"
          value={propiedadSelec}
          onChange={(e) => setPropiedadSelec(e.target.value)}
        >
          <option value="">...</option>
          {propiedad
            .filter((item) => item.categoria === "propiedad")
            .map((item) => (
              <option key={item.id} value={item.factor}>
                {" "}
                {item.tipo}
              </option>
            ))}
        </select>
        <label>Selecciona la ubicacion</label>
        <select
          name="Ubicacion"
          value={ubicacionSelec}
          onChange={(e) => setUbicacionSelec(e.target.value)}
        >
          <option value="">...</option>
          {propiedad
            .filter((item) => item.categoria === "ubicacion")
            .map((item) => (
              <option key={item.id} id={item.tipo} value={item.factor}>
                {item.tipo}
              </option>
            ))}
        </select>
        <div>
          <label>Metros cuadrados</label>
          <input
            type="number"
            name="metroCuadrado"
            value={metroCuadrado}
            onChange={(e) => setMetroCuadrado(e.target.value)}
            min={20}
            max={500}
            required
          />
        </div>
        <div className="center separador">
          <button className="button button-outline" onClick={CotizarPoliza}>
            Cotizar
          </button>
          <div className="center separador">
            <p className="importe">
              Precio estimado: $
              <span id="calcPoliza">
                {resultado.length > 0
                  ? resultado[resultado.length - 1].calcPoliza
                  : ""}
              </span>
            </p>
            {fechaCotizacion && (
              <p>Última cotización realizada el {fechaCotizacion}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
