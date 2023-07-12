import {Outlet} from "react-router-dom";

export function Layout() {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-slate-400 bg-slate-900">
      <Outlet />
    </div>
  )
}
