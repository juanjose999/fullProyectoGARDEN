import "./AccountSummary.css";

export const AccountSummary = ({ user }) => {
    return (
        <div className="account-card">

            <h2 className="account-title">
                Mi Cuenta
            </h2>

            <div className="account-info">
                <p>
                    <strong>Nombre:</strong> {user.nombre}
                </p>

                <p>
                    <strong>Apellido:</strong> {user.apellido}
                </p>

                <p>
                    <strong>Email:</strong> {user.email}
                </p>

                <p>
                    <strong>Teléfono:</strong> {user.telefono}
                </p>

                <p>
                    <strong>Documento:</strong> {user.documento}
                </p>

                <p>
                    <strong>Estado:</strong>{" "}
                    {user.activo ? "Activo" : "Inactivo"}
                </p>
            </div>

        </div>
    );
};