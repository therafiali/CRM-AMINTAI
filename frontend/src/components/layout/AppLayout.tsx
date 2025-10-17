import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export function AppLayout() {
    return (
        <div className="h-screen w-full flex flex-col md:flex-row">
            {/* Sidebar component handles its own visibility */}
            <Sidebar />
            
            {/* Main content with proper spacing */}
            <main className="flex-1 h-full overflow-auto md:ml-0 pt-16 md:pt-0">
                <Outlet />
            </main>
        </div>
    );
}