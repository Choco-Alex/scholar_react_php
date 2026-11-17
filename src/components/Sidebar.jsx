import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { NAV_ITEMS } from "../lib/nav.js";
import { clearProfile } from "../lib/storage.js";

export default function Sidebar({ open }) {
  const navigate = useNavigate();
  const logout = () => {
    clearProfile();
    navigate("/connexion");
  };

  return (
    <aside
      id="sidebar"
      className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0D0E6D] text-white flex flex-col justify-between transition-transform duration-300 transform md:translate-x-0 md:static shadow-xl overflow-hidden ${open ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="overflow-y-auto no-scrollbar">
        <div className="h-24 flex items-center justify-center w-full pt-4">
          <img src={logo} alt="Logo" className="h-16 object-contain" />
        </div>
        <nav className="mt-2 pl-3 space-y-1 flex-1 flex flex-col justify-around">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center space-x-3 pl-4 pr-3 py-2.5 rounded-l-2xl bg-[#f0f2f5] text-[#18184A] font-semibold shadow-md transition relative -mr-px"
                  : "flex items-center space-x-3 px-4 py-2.5 mr-3 rounded-xl text-indigo-200 hover:bg-[#232363] hover:text-white transition"
              }
            >
              <i className={`fa-solid ${item.icon} text-lg`} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-indigo-900/50">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-indigo-300 hover:bg-red-600/20 hover:text-red-400 transition"
        >
          <i className="fa-solid fa-right-from-bracket text-lg" />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}
