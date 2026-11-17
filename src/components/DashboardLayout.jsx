import { useEffect, useState } from "react";
import { Outlet, useLocation, useMatch } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import { PAGE_TITLES } from "../lib/nav.js";

// Mise en page commune : barre latérale + en-tête + contenu défilant
export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { pathname } = useLocation();
  const isEdit = useMatch("/eleves/:id/modifier");
  const page = isEdit ? PAGE_TITLES.edit : PAGE_TITLES[pathname] || PAGE_TITLES["/accueil"];

  useEffect(() => {
    setOpen(false);
    setSearch("");
    document.title = `Scholar - ${page.title}`;
  }, [pathname, page.title]);

  return (
    <div className="bg-[#f0f2f5] font-sans antialiased text-gray-800 flex h-screen overflow-hidden">
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setOpen(false)} />
      )}
      <Sidebar open={open} />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header
          page={page}
          onMenu={() => setOpen((o) => !o)}
          search={search}
          setSearch={setSearch}
          showBack={Boolean(isEdit)}
        />
        <Outlet context={{ search }} />
      </div>
    </div>
  );
}
