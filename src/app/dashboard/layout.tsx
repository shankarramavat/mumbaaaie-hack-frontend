import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-950">
            <Sidebar />
            <div className="lg:ml-64">
                <Header />
                <main className="p-4 lg:p-8">{children}</main>
            </div>
        </div>
    );
}
