import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Login = () => {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ id: "", invoice: "" });

  const startTest = async (e) => {
    e.preventDefault();

    await signIn(userData);

    if (user) {
      setUserData({ id: "", invoice: "" });
      navigate("test");
    }
  };

  const handleNoDeleteChange = (field) => (e) => {
    const newValue = e.target.value;

    if (newValue.length >= userData[field].length) {
      setUserData({ ...userData, [field]: newValue });
    }
  };

  return (
    <section
      className="min-h-screen font-sans text-slate-800"
      style={{
        backgroundImage: "url('/bg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div className="max-w-4xl pt-4 px-4 font-bold">
        <h3 className="text-[1.2rem] shadow-[1px_1px_2px_rgba(0,0,0,0.3)] py-6 px-0">
          Bienvenido al examen teórico, requisito para la respectiva
          acreditación del conductor
        </h3>
      </div>
      <div className="w-6xl h-150 flex flex-col overflow-hidden">
        <div className="flex flex-1 p-10 ml-4">
          <div className="flex-1 flex flex-col justify-center font-bold pr-5 max-w-102.5">
            <div>
              <p className="mb-3.75 leading-[1.4] text-justify">
                Lea cuidadosamente las indicaciones que se incluyen a lo largo
                del examen, las mismas facilitarán el seguimiento de su prueba.
              </p>
              <p className="mb-3.75 leading-[1.4] text-justify">
                Para iniciar con su examen debe ingresar su número de documento
                de identidad y el número de su comprobante de pago.
              </p>
              <p className="mb-3.75 leading-[1.4] text-justify">
                Posteriormente oprima el botón 'Ingresar' para iniciar el
                examen.
              </p>
            </div>

            <form className="p-5" onSubmit={startTest}>
              <label for="user" className="block mb-1.25 font-bold">
                Usuario
              </label>
              <input
                type="text"
                id="user"
                placeholder="Ej. 101110222"
                autoComplete="off"
                value={userData.id}
                onChange={handleNoDeleteChange("id")}
                className="w-full p-2 mb-3.75 rounded-xs outline-none border-0 bg-white text-black"
              />

              <label for="password" className="block mb-1.25 font-bold">
                Contraseña
              </label>
              <input
                type="text"
                id="password"
                placeholder="Ej. 1516939610"
                autoComplete="off"
                value={userData.invoice}
                onChange={handleNoDeleteChange("id")}
                className="w-full p-2 mb-3.75 rounded-xs outline-none border-0 bg-white text-black"
              />

              <div className="w-full text-right mt-3.75">
                <button
                  type="submit"
                  className="px-8 py-1.5 bg-gray-200 hover:bg-gray-200/90 border border-gray-400 shadow-sm text-base font-bold cursor-pointer"
                >
                  INGRESAR
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
