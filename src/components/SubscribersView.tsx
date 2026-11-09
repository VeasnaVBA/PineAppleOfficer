import React, { useState } from 'react';
import { Subscriber } from '../types';
import { UserPlus, Download, Search, Mail, Phone, Trash2, CheckCircle2 } from 'lucide-react';

interface SubscribersViewProps {
  subscribers: Subscriber[];
  onAddSubscriber: (sub: Subscriber) => void;
  onDeleteSubscriber: (id: string) => void;
  onShowToast: (title: string, message: string) => void;
}

export const SubscribersView: React.FC<SubscribersViewProps> = ({
  subscribers,
  onAddSubscriber,
  onDeleteSubscriber,
  onShowToast
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState('All');
  const [isAdding, setIsAdding] = useState(false);
  const [newSub, setNewSub] = useState({
    name: '',
    email: '',
    mobile: '',
    tier: 'Curator' as const
  });

  const filtered = subscribers.filter(sub => {
    const matchSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        sub.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTier = tierFilter === 'All' || sub.tier === tierFilter;
    return matchSearch && matchTier;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSub.name || !newSub.email) return;

    onAddSubscriber({
      id: `sub-${Date.now()}`,
      name: newSub.name,
      email: newSub.email,
      mobile: newSub.mobile || '+1 (555) 012-3456',
      tier: newSub.tier,
      joinedDate: '09.11.2026',
      status: 'Active'
    });

    setIsAdding(false);
    setNewSub({ name: '', email: '', mobile: '', tier: 'Curator' });
    onShowToast('SUBSCRIBER ENROLLED', `${newSub.name} added to the curatorial register.`);
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Name,Email,Mobile,Tier,Status,JoinedDate"]
      .concat(subscribers.map(s => `"${s.name}","${s.email}","${s.mobile}","${s.tier}","${s.status}","${s.joinedDate}"`))
      .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `tetrad_subscribers_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast('EXPORT COMPLETED', 'Subscriber ledger exported as CSV.');
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-ink gap-4">
        <div>
          <h2 className="font-serif text-2xl lg:text-3xl font-bold uppercase tracking-tight text-ink">
            SUBSCRIBER & COLLECTOR REGISTER
          </h2>
          <p className="font-mono text-xs text-ink/70 mt-1 uppercase tracking-wider">
            {subscribers.length} Registered patrons across global distribution
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 border border-ink text-xs font-mono uppercase tracking-widest hover:bg-black/5 flex items-center gap-1.5"
          >
            <Download size={13} />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="px-4 py-1.5 bg-ink text-[#ded5be] text-xs font-mono uppercase tracking-widest font-bold hover:bg-ink/85 flex items-center gap-1.5"
          >
            <UserPlus size={13} />
            <span>Add Patron</span>
          </button>
        </div>
      </div>

      {/* Quick Add Form Drawer */}
      {isAdding && (
        <form onSubmit={handleCreate} className="p-5 border-2 border-ink bg-[#ede5cf] shadow-brutal space-y-4">
          <h4 className="font-serif font-bold text-base text-ink">Register New Archival Subscriber</h4>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <input
              type="text"
              required
              placeholder="Full Name"
              value={newSub.name}
              onChange={(e) => setNewSub({ ...newSub, name: e.target.value })}
              className="px-3 py-1.5 bg-transparent border border-ink text-xs font-mono outline-none"
            />
            <input
              type="email"
              required
              placeholder="Email Address"
              value={newSub.email}
              onChange={(e) => setNewSub({ ...newSub, email: e.target.value })}
              className="px-3 py-1.5 bg-transparent border border-ink text-xs font-mono outline-none"
            />
            <input
              type="text"
              placeholder="Mobile Phone"
              value={newSub.mobile}
              onChange={(e) => setNewSub({ ...newSub, mobile: e.target.value })}
              className="px-3 py-1.5 bg-transparent border border-ink text-xs font-mono outline-none"
            />
            <select
              value={newSub.tier}
              onChange={(e) => setNewSub({ ...newSub, tier: e.target.value as any })}
              className="px-3 py-1.5 bg-[#ded5be] border border-ink text-xs font-mono outline-none"
            >
              <option value="Curator">Tier: Curator</option>
              <option value="VIP">Tier: VIP</option>
              <option value="Collector">Tier: Collector</option>
              <option value="Standard">Tier: Standard</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1 border border-ink text-xs font-mono uppercase"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1 bg-ink text-[#ded5be] text-xs font-mono uppercase font-bold"
            >
              Confirm Registration
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/60" />
          <input
            type="text"
            placeholder="Search patrons by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-transparent border border-ink text-xs font-mono outline-none"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto text-xs font-mono">
          {['All', 'VIP', 'Curator', 'Collector', 'Standard'].map(tier => (
            <button
              key={tier}
              onClick={() => setTierFilter(tier)}
              className={`px-2.5 py-1 border uppercase tracking-wider text-[11px] ${
                tierFilter === tier ? 'bg-ink text-[#ded5be] border-ink font-bold' : 'border-ink/40 text-ink'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="border-2 border-ink bg-[#ded5be] overflow-x-auto shadow-brutal">
        <table className="w-full text-left font-mono text-xs">
          <thead className="bg-[#111111] text-[#ded5be] border-b border-ink uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-3">Patron Name</th>
              <th className="p-3">Email Address</th>
              <th className="p-3">Mobile Contact</th>
              <th className="p-3">Tier</th>
              <th className="p-3">Joined Date</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink">
            {filtered.map(sub => (
              <tr key={sub.id} className="hover:bg-black/5 transition-colors">
                <td className="p-3 font-serif font-bold text-sm text-ink">{sub.name}</td>
                <td className="p-3 text-ink/80">{sub.email}</td>
                <td className="p-3 text-ink/70">{sub.mobile}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 border border-ink bg-[#ede5cf] text-[10px] font-bold">
                    {sub.tier}
                  </span>
                </td>
                <td className="p-3 text-ink/70">{sub.joinedDate}</td>
                <td className="p-3">
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-700"></span>
                    {sub.status}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => {
                      onDeleteSubscriber(sub.id);
                      onShowToast('PATRON REMOVED', `${sub.name} removed from active register`);
                    }}
                    className="p-1 hover:text-red-700 transition-colors"
                    title="Remove"
                  >
                    <Trash2 size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
