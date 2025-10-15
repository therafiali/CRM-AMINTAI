import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export function AppLayout() {
    return (
        <div className="h-screen w-full grid grid-cols-[15rem_1fr]">
            <Sidebar />
            <main className="h-full overflow-auto">
                <Outlet />
            </main>
        </div>
    );
}


