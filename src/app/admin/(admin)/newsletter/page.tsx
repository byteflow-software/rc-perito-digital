import { listSubscribers, deleteSubscriber } from "@/lib/actions/newsletter";
import { formatDate } from "@/lib/utils";
import { DeleteSubscriberButton } from "./DeleteSubscriberButton";

export default async function AdminNewsletterPage() {
  const subscribers = await listSubscribers();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-mono text-xl font-bold text-text-primary"><span className="text-neon">&gt;</span> Newsletter</h1>
        <p className="text-text-muted text-xs font-mono mt-1">{subscribers.length} inscritos</p>
      </div>

      <div className="border border-border">
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="border-b border-border bg-bg-card">
              <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal">Email</th>
              <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal w-24">Status</th>
              <th className="text-left px-4 py-3 text-text-muted uppercase tracking-widest font-normal w-32">Inscrito em</th>
              <th className="px-4 py-3 w-16" />
            </tr>
          </thead>
          <tbody>
            {subscribers.length === 0 ? (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-text-muted">Nenhum inscrito ainda.</td></tr>
            ) : (
              subscribers.map((s) => (
                <tr key={s.id} className="border-b border-border hover:bg-bg-card/50 transition-colors">
                  <td className="px-4 py-3 text-text-primary">{s.email}</td>
                  <td className="px-4 py-3">
                    <span className={`px-1.5 py-0.5 border font-mono text-[10px] ${s.status === "ACTIVE" ? "border-green-500/40 text-green-400" : "border-border text-text-muted"}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-muted">{formatDate(s.subscribedAt)}</td>
                  <td className="px-4 py-3 text-right">
                    <DeleteSubscriberButton id={s.id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
