export default function Form() {
  return (
    <div className=" center div-cotizador">
      <h2 className="center separador">Completa los datos solicitados</h2>
      <label htmlFor="propiedad">Selecciona el tipo de propiedad</label>
      <select id="propiedad">
        <option selected disabled>
          ...
        </option>
      </select>
      <label htmlFor="ubicacion">Selecciona su ubicación</label>
      <select id="ubicacion">
        <option selected disabled>
          ...
        </option>
      </select>
      <label htmlFor="metros2">Ingresa los Metros cuadrados:</label>
      <input
        type="number"
        id="metros2"
        value="20"
        min="20"
        max="500"
        required
      />
      <div className="center separador">
        <button className="button button-outline">Cotizar</button>
      </div>
      <div className="center separador">
        <p className="importe">
          Precio estimado: $ <span id="valorPoliza">0.00</span>
          <span className="guardar ocultar" title="Guardar en historial">
            💾
          </span>
        </p>
      </div>
    </div>
  );
}
