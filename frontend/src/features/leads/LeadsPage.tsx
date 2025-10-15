import LeadForm from "./LeadForm";
import { LeadsList } from "./LeadList";


export default function LeadsPage() {
    return (
        <section className="p-6 space-y-4">
            <h1 className="text-2xl font-semibold">Leads</h1>
            <LeadForm />
            <LeadsList />
        </section>
    );
}
