'use client';

import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Settings, User, Shield, Sliders, AlertTriangle, Save, Lock } from 'lucide-react';

export default function SettingsPage() {
  const { data: session, update } = useSession();
  const toast = useToast();

  const [name, setName] = useState(session?.user?.name || '');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  // Update Profile Name
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsUpdatingProfile(true);
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error('Error', data.error || 'Failed to update profile.');
      } else {
        toast.success('Profile Updated', 'Name updated successfully.');
        await update({ name });
      }
    } catch (e) {
      toast.error('Error', 'An error occurred updating profile.');
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  // Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) return;

    if (newPassword.length < 6) {
      toast.error('Validation Error', 'New password must be at least 6 characters.');
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const res = await fetch('/api/user/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error('Password Update Failed', data.error);
      } else {
        toast.success('Password Updated', 'Your password has been changed.');
        setCurrentPassword('');
        setNewPassword('');
      }
    } catch (e) {
      toast.error('Error', 'An error occurred updating password.');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  // Delete Account
  const handleDeleteAccount = async () => {
    setIsDeletingAccount(true);
    try {
      const res = await fetch('/api/user/account', { method: 'DELETE' });
      if (res.ok) {
        toast.success('Account Deleted', 'Your account has been deleted.');
        signOut({ callbackUrl: '/' });
      } else {
        toast.error('Deletion Failed');
      }
    } catch (e) {
      toast.error('Error', 'Failed to delete account.');
    } finally {
      setIsDeletingAccount(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#090d16] text-slate-100">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 max-w-4xl mx-auto space-y-8 overflow-y-auto">
        <div className="border-b border-slate-800/80 pb-4">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <span>Account & Workspace Settings</span>
            <Settings className="w-5 h-5 text-cyan-400" />
          </h1>
          <p className="text-xs text-slate-400">Manage your profile, security preferences, and account configuration.</p>
        </div>

        <div className="space-y-6">
          {/* Profile Section */}
          <Card className="space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <User className="w-4 h-4 text-cyan-400" />
              <span>Profile Details</span>
            </h3>

            <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-md">
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                label="Email Address"
                value={session?.user?.email || ''}
                disabled
                helperText="Email address cannot be changed."
              />
              <Button type="submit" variant="primary" size="sm" isLoading={isUpdatingProfile} leftIcon={<Save className="w-4 h-4" />}>
                Save Profile
              </Button>
            </form>
          </Card>

          {/* Preferences Section */}
          <Card className="space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Sliders className="w-4 h-4 text-indigo-400" />
              <span>Workspace Preferences</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Theme Mode</label>
                <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 font-medium">
                  Dark Premium AI (Default)
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Default AI Model</label>
                <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 font-medium">
                  OpenAI GPT-4o-mini
                </div>
              </div>
            </div>
          </Card>

          {/* Security Section */}
          <Card className="space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Security & Password</span>
            </h3>

            <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
              <Input
                label="Current Password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <Input
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
                required
              />
              <Button type="submit" variant="secondary" size="sm" isLoading={isUpdatingPassword} leftIcon={<Lock className="w-4 h-4" />}>
                Update Password
              </Button>
            </form>
          </Card>

          {/* Destructive Zone */}
          <Card className="space-y-4 border-rose-500/20 bg-rose-500/5">
            <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2 border-b border-rose-500/20 pb-3">
              <AlertTriangle className="w-4 h-4" />
              <span>Danger Zone</span>
            </h3>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold text-white">Delete Account</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Permanently delete your account, conversations, and all saved items.
                </p>
              </div>
              <Button variant="danger" size="sm" onClick={() => setDeleteModalOpen(true)}>
                Delete Account
              </Button>
            </div>
          </Card>
        </div>
      </main>

      <ConfirmDialog
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteAccount}
        isLoading={isDeletingAccount}
        title="Permanently Delete Account?"
        description="Are you sure you want to delete your Kynoviq AI account? This action is irreversible and all your data will be destroyed."
      />
    </div>
  );
}
