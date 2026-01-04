import { IdCard } from "lucide-react";
import { FileText } from "lucide-react";
import { useState } from "react";
import invoices from "../assets/invoices.json";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ id: "", invoice: "" });

  const startTest = (e) => {
    e.preventDefault();

    const currentUser = invoices.filter((invoice) => invoice.id === user.id);

    if (currentUser.length > 0) {
      // if (currentUser[0].invoice === user.invoice) {
      console.log("Usuario y recibo correcto");
      setUser({ id: "", invoice: "" });
      navigate("test");
      // }
    }
  };

  return (
    <section className="bg-[linear-gradient(135deg,#4facfe_0%,#00f2fe_100%)] min-h-screen font-sans">
      <div className="bg-[rgba(255,255,255,0.9)] px-3.75 py-1.25 text-[12px] text-[#333] border-b border-[#ccc]">
        <span>Simulador de Examen Teorico</span>
      </div>
      <div className="w-4xl h-150 flex flex-col overflow-hidden">
        <div className="flex flex-1 p-10">
          <div className="flex-1 flex flex-col justify-center text-white pr-5">
            <div className="instructions">
              <h3 className="mb-3.75 text-[1.5rem] shadow-[1px_1px_2px_rgba(0,0,0,0.3)]">
                Bienvenido al Sistema
              </h3>
              <p className="text-[0.9rem] mb-3.75 leading-[1.4] text-justify">
                Para iniciar el examen teórico, por favor asegúrese de leer las
                instrucciones detalladas en la pizarra.
              </p>
              <p className="text-[0.9rem] mb-3.75 leading-[1.4] text-justify">
                Introduzca sus credenciales tal como aparecen en su documento de
                identidad.
              </p>
            </div>

            <form
              className="mt-7.5 bg-[rgba(255,255,255,0.1)] p-5 rounded-[5px]"
              onSubmit={startTest}
            >
              <label
                for="identification"
                className="block mb-1.25 text-[0.8rem] font-bold"
              >
                Número de Identificación
              </label>
              <input
                type="text"
                id="identification"
                placeholder="Ej. 101110222"
                value={user.id}
                onChange={(e) => setUser({ ...user, id: e.target.value })}
                className="w-full p-2 mb-3.75 rounded-xs outline-none border-0 bg-white text-black"
              />

              <label
                for="invoice"
                className="block mb-1.25 text-[0.8rem] font-bold"
              >
                Número de Recibo
              </label>
              <input
                type="text"
                id="invoice"
                placeholder="Ej. 1516939610"
                value={user.invoice}
                onChange={(e) => setUser({ ...user, invoice: e.target.value })}
                className="w-full p-2 mb-3.75 rounded-xs outline-none border-0 bg-white text-black"
              />

              <button
                type="submit"
                className="bg-[#ffcc00] text-[#333] px-5 py-2.5 font-bold cursor-pointer shadow-[2px_2px_5px_rgba(0,0,0,0.2)] hover:bg-[#e6b800]"
              >
                INGRESAR
              </button>
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
