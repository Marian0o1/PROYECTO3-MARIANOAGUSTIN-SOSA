import { Link } from "react-router-dom";
import historial from "../assets/historial.png";

export default function Header() {
  return (
    <nav>
      <div className="historial">
        <Link to="historial">
          <img
            className="img-historial"
            src={historial}
            alt="historial"
            title="Historial"
          />
        </Link>
      </div>
      <h1 className="center separador">Guardian Seguros</h1>
      <h3 className="center separador">
        Cotizador de seguros online, preciso y simple
      </h3>
    </nav>
  );
}
