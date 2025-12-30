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
      if (currentUser[0].invoice === user.invoice) {
        console.log("Usuario y recibo correcto");
        setUser({ id: "", invoice: "" });
        navigate("test");
      }
    }
  };

  return (
    <section className="bg-gray-300 min-h-screen p-4 font-sans">
      <div className="w-2/4">
        <h1 className="text-2xl font-bold uppercase">
          Simulador de Examen Teórico
        </h1>

        <form onSubmit={startTest} className="py-8 space-y-6">
          <div>
            <label className="block font-medium text-black mb-1">
              Número de Identificación
            </label>
            <div className="relative">
              <IdCard className="absolute left-3 top-3 w-5 h-5 text-gray-800" />
              <input
                type="text"
                required
                className="pl-10 w-full border border-black  py-2.5 px-3 focus:ring-2 focus:ring-gray-500 focus:outline-none transition"
                placeholder="Ej. 101110222"
                value={user.id}
                onChange={(e) => setUser({ ...user, id: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-black mb-1">
              Número de Recibo
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-800" />
              <input
                type="text"
                required
                className="pl-10 w-full border border-black  py-2.5 px-3 focus:ring-2 focus:ring-gray-500 focus:outline-none transition"
                placeholder="Ej. 1516939610"
                value={user.invoice}
                onChange={(e) => setUser({ ...user, invoice: e.target.value })}
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className=" bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 shadow flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              Iniciar Prueba
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
