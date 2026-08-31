'use client';

import React, { useState } from 'react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Button } from '@/components/ui/Button';
import { Users, UserPlus, Mail, Shield, Trash2, CheckCircle2, Crown } from 'lucide-react';

export default function TeamCollaborationPage() {
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('EDITOR');
  const [inviteSuccess, setInviteSuccess] = useState(false);

  const [members, setMembers] = useState([
    { id: 'usr_founder', name: 'Mohammad Hassan Raza', email: 'mdhassanraza0879@gmail.com', role: 'OWNER', avatar: 'HR', status: 'ACTIVE' },
    { id: 'usr_editor1', name: 'Sarah Jenkins', email: 'sarah@agency.com', role: 'EDITOR', avatar: 'SJ', status: 'ACTIVE' },
    { id: 'usr_viewer1', name: 'David Kim', email: 'david@brand.com', role: 'VIEWER', avatar: 'DK', status: 'ACTIVE' },
  ]);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    const newMember = {
      id: `usr_${Date.now()}`,
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole,
      avatar: inviteEmail.slice(0, 2).toUpperCase(),
      status: 'INVITED',
    };

    setMembers([...members, newMember]);
    setInviteEmail('');
    setInviteSuccess(true);
    setTimeout(() => setInviteSuccess(false), 3000);
  };

  return (
    <div className="flex h-screen bg-[#07090e] text-slate-100 font-sans overflow-hidden">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardHeader title="Team Collaboration Suite" subtitle="Workspace Roles, Shared Asset Libraries & Multi-User Governance" />

        <main className="flex-1 p-6 sm:p-8 max-w-5xl w-full mx-auto space-y-8">
          {/* Invite Form */}
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/[0.08] shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <UserPlus className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Invite Team Member</h2>
                  <p className="text-xs text-slate-400">Grant role-based access to projects and brand assets</p>
                </div>
              </div>

              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                Seats: 3 / 5 Used
              </span>
            </div>

            <form onSubmit={handleInvite} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colleague@agency.com"
                  className="w-full bg-[#07090e] border border-white/[0.1] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value)}
                className="bg-[#07090e] border border-white/[0.1] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none font-mono"
              >
                <option value="ADMIN">Admin (Full Control)</option>
                <option value="EDITOR">Editor (Create & Edit)</option>
                <option value="VIEWER">Viewer (Review Only)</option>
              </select>

              <Button variant="primary" size="md" type="submit" className="text-xs font-bold glow-indigo bg-emerald-600 hover:bg-emerald-500">
                Send Invite
              </Button>
            </form>

            {inviteSuccess && (
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" />
                <span>Invitation email dispatched successfully!</span>
              </span>
            )}
          </div>

          {/* Members Table */}
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/[0.08] shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-white">Active Workspace Members ({members.length})</h3>

            <div className="divide-y divide-white/[0.06] text-xs">
              {members.map((m) => (
                <div key={m.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl border border-white/20 shrink-0 bg-indigo-600/30 flex items-center justify-center font-bold text-white text-xs">
                      {m.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 font-bold text-white">
                        <span>{m.name}</span>
                        {m.role === 'OWNER' && <Crown className="w-3.5 h-3.5 text-amber-400 fill-current" />}
                      </div>
                      <p className="text-[11px] text-slate-400 font-mono">{m.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded font-mono text-[10px] font-bold bg-white/[0.04] text-slate-300 border border-white/[0.08]">
                      {m.role}
                    </span>

                    {m.role !== 'OWNER' && (
                      <button
                        onClick={() => setMembers(members.filter((x) => x.id !== m.id))}
                        className="p-1.5 text-slate-500 hover:text-rose-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
