import { Link } from "react-router-dom";

export default function Header() {
    return (
      <nav>
        <div className="historial">
          <Link to="historial">
            <span title="Ver Historial" id="botonEmoji">📋</span>
          </Link>
        </div>
        <h1 className="center separador">Pólizas para el hogar 🏡</h1>
      </nav>
    );
}
