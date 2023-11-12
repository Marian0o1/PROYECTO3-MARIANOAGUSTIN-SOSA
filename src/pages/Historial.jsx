import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function Historial() {
  const navigate = useNavigate();
  const [historialData, setHistorialData] = useState([]);

  useEffect(() => {
    const searchData = localStorage.getItem("dataPoliza");
    if (searchData) {
      const parseData = JSON.parse(searchData);
      setHistorialData(parseData);
    }
  }, []);

  const handleBorrarCotizacion = (index) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la cotización permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrar",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedData = [...historialData];
        updatedData.splice(index, 1);
        setHistorialData(updatedData);
        localStorage.setItem("dataPoliza", JSON.stringify(updatedData));
        Swal.fire(
          "Borrado",
          "La cotización ha sido eliminada exitosamente.",
          "success"
        );
      }
    });
  };

  return (
    <div>
      <h1 className="center separador">Tus cotizaciones 😊</h1>
      <div className=" center div-cotizador">
        <table>
          <thead>
            <tr>
              <th>Fecha de cotización</th>
              <th>Propiedad</th>
              <th>Ubicación</th>
              <th>Metros cuadrados</th>
              <th>Póliza mensual</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {historialData.map((item, index) => (
              <tr key={index}>
                <td>{item.fechaCotizacion}</td>
                <td>{item.propiedad}</td>
                <td>{item.ubicacion}</td>
                <td>{item.metroCuadrado}</td>
                <td>{item.calcPoliza}</td>
                <td>
                  <button
                    onClick={() => handleBorrarCotizacion(index)}
                    className="button button-outline"
                  >
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="center separador">
          <button
            onClick={() => navigate(-1)}
            className="button button-outline"
          >
            VOLVER
          </button>
        </div>
      </div>
    </div>
  );
}
