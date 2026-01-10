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
    <section className="bg-[linear-gradient(135deg,rgba(52,146,220,1),rgba(48,155,223,1))] min-h-screen font-sans">
      <div className="max-w-3xl pt-4 px-4 text-white">
        <h3 className="text-[1.2rem] shadow-[1px_1px_2px_rgba(0,0,0,0.3)] py-6 px-0">
          Bienvenido al examen teórico, requisito para la respectiva
          acreditación del conductor
        </h3>
      </div>
      <div className="w-4xl h-150 flex flex-col overflow-hidden">
        <div className="flex flex-1 p-10 ml-4">
          <div className="flex-1 flex flex-col justify-center text-white pr-5">
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
                  className="bg-[#d2d2d2] text-[#333] px-12 py-2 font-bold cursor-pointer shadow-[2px_2px_5px_rgba(0,0,0,0.2)] hover:bg-[#d2d2d2cd]"
                >
                  INGRESAR
                </button>
              </div>
            </form>
          </div>

          <div className="flex-1 flex justify-center items-center relative">
            <div className="">
              <div className="w-50 h-50 z-2 rotate-6">
                <svg viewBox="0 0 100 100" className="warning-sign">
                  <path
                    d="M50 5 L95 90 L5 90 Z"
                    fill="#FFCC00"
                    stroke="black"
                    stroke-width="3"
                  />
                  <path
                    d="M50 30 L50 60"
                    stroke="black"
                    stroke-width="5"
                    stroke-linecap="round"
                  />
                  <circle cx="50" cy="75" r="3" fill="black" />
                </svg>
              </div>
            </div>
            <div className="absolute w-75 h-75 bg-[rgba(255,255,255,0.1)] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[20px]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
