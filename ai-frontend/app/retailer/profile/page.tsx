"use client";

import React from "react";
import { useDemo } from "@/providers/DemoProvider";
import { Button } from "@/components/ui/button";
import { User, MapPin, BadgeCheck, Mail } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ProfilePage() {
    const { user, updateUser } = useDemo();
    const [isEditOpen, setIsEditOpen] = React.useState(false);
    const [editData, setEditData] = React.useState({ ...user });

    const [isPasswordOpen, setIsPasswordOpen] = React.useState(false);

    const handleSaveProfile = () => {
        updateUser(editData);
        setIsEditOpen(false);
        toast.success("Profile updated successfully");
    };

    const handleChangePassword = () => {
        setIsPasswordOpen(false);
        toast.success("Password changed successfully");
    };

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Profile</h1>

            {/* Profile Card */}
            <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="w-32 h-32 rounded-full bg-cover bg-center border-4 border-white dark:border-slate-900 shadow-md" style={{ backgroundImage: `url('${user.avatar}')` }}></div>

                <div className="flex-1 text-center md:text-left space-y-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{user.name}</h2>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-2">
                            <BadgeCheck size={14} />
                            {user.role}
                        </span>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 text-slate-500 text-sm">
                        <div className="flex items-center justify-center md:justify-start gap-2">
                            <MapPin size={16} />
                            {user.branch}
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-2">
                            <Mail size={16} />
                            alex.morgan@swiftcart.ai
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3 justify-center md:justify-start">
                        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" onClick={() => setEditData({ ...user })}>Edit Profile</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit Profile</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your profile here. Click save when you're done.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Name
                                        </Label>
                                        <Input
                                            id="name"
                                            value={editData.name}
                                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="role" className="text-right">
                                            Role
                                        </Label>
                                        <Input
                                            id="role"
                                            value={editData.role}
                                            onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="branch" className="text-right">
                                            Branch
                                        </Label>
                                        <Input
                                            id="branch"
                                            value={editData.branch}
                                            onChange={(e) => setEditData({ ...editData, branch: e.target.value })}
                                            className="col-span-3"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={handleSaveProfile}>Save changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <Dialog open={isPasswordOpen} onOpenChange={setIsPasswordOpen}>
                            <DialogTrigger asChild>
                                <Button variant="default" className="bg-blue-600 hover:bg-blue-700">Change Password</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Change Password</DialogTitle>
                                    <DialogDescription>
                                        Enter your current password and a new password to update your credentials.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="current-password" className="text-right">
                                            Current
                                        </Label>
                                        <Input id="current-password" type="password" className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="new-password" className="text-right">
                                            New
                                        </Label>
                                        <Input id="new-password" type="password" className="col-span-3" />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={handleChangePassword}>Update Password</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>

            {/* Account Settings Placeholder */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                    <h3 className="font-semibold text-lg mb-4">Account Settings</h3>
                    <p className="text-slate-500 text-sm">Manage your notification preferences and language settings.</p>
                </div>
                <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                    <h3 className="font-semibold text-lg mb-4">Security</h3>
                    <p className="text-slate-500 text-sm">Two-factor authentication is currently enabled.</p>
                </div>
            </div>
        </div>
    );
}
