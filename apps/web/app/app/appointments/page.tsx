'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';

interface Appointment {
    id: string;
    date: string;
    time: string;
    type: 'visit' | 'ultrasound' | 'test' | 'class' | 'other';
    title: string;
    location: string;
    notes: string;
    completed: boolean;
}

const TYPE_INFO: Record<Appointment['type'], { icon: string; color: string }> = {
    visit: { icon: 'solar:stethoscope-bold-duotone', color: 'bg-blue-100 text-blue-700' },
    ultrasound: { icon: 'solar:camera-bold-duotone', color: 'bg-purple-100 text-purple-700' },
    test: { icon: 'solar:test-tube-bold-duotone', color: 'bg-pink-100 text-pink-700' },
    class: { icon: 'solar:book-2-bold-duotone', color: 'bg-green-100 text-green-700' },
    other: { icon: 'solar:clipboard-list-bold-duotone', color: 'bg-gray-100 text-gray-700' },
};

const STANDARD_SCHEDULE = [
    { week: 8, title: 'First Prenatal Visit', type: 'visit' as const },
    { week: 12, title: 'NT Ultrasound Scan', type: 'ultrasound' as const },
    { week: 16, title: 'Second Trimester Checkup', type: 'visit' as const },
    { week: 20, title: 'Anatomy Ultrasound', type: 'ultrasound' as const },
    { week: 24, title: 'Glucose Screening', type: 'test' as const },
    { week: 28, title: 'Third Trimester Starts', type: 'visit' as const },
    { week: 32, title: 'Growth Ultrasound', type: 'ultrasound' as const },
    { week: 36, title: 'Weekly Checkups Begin', type: 'visit' as const },
];

export default function AppointmentsPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        date: '', time: '', type: 'visit' as Appointment['type'],
        title: '', location: '', notes: ''
    });

    const handleAdd = () => {
        if (!form.date || !form.title) return;

        setAppointments(prev => [...prev, {
            id: Date.now().toString(),
            ...form,
            completed: false,
        }].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));

        setForm({ date: '', time: '', type: 'visit', title: '', location: '', notes: '' });
        setShowForm(false);
    };

    const toggleComplete = (id: string) => {
        setAppointments(prev => prev.map(a =>
            a.id === id ? { ...a, completed: !a.completed } : a
        ));
    };

    const getDaysUntil = (date: string) => {
        const days = Math.ceil((new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        if (days < 0) return 'Past';
        if (days === 0) return 'Today!';
        if (days === 1) return 'Tomorrow';
        return `${days} days`;
    };

    const upcoming = appointments.filter(a => !a.completed && new Date(a.date) >= new Date());
    const past = appointments.filter(a => a.completed || new Date(a.date) < new Date());

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-lg mx-auto">
                <Link href="/app" className="text-purple-600 hover:underline mb-4 inline-block">← Back</Link>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-6xl text-center mb-4 text-indigo-500 flex justify-center">
                        <Icon icon="solar:calendar-bold-duotone" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Appointments</h1>
                    <p className="text-gray-600 text-center mb-6">Track prenatal visits and tests</p>

                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg mb-6"
                    >
                        + Add Appointment
                    </button>

                    {showForm && (
                        <div className="border-2 border-purple-200 rounded-xl p-4 mb-6 space-y-3">
                            <input
                                type="date"
                                value={form.date}
                                onChange={(e) => setForm(f => ({ ...f, date: e.target.value }))}
                                className="w-full p-3 border-2 border-gray-200 rounded-lg"
                            />
                            <input
                                type="time"
                                value={form.time}
                                onChange={(e) => setForm(f => ({ ...f, time: e.target.value }))}
                                className="w-full p-3 border-2 border-gray-200 rounded-lg"
                            />
                            <select
                                value={form.type}
                                onChange={(e) => setForm(f => ({ ...f, type: e.target.value as Appointment['type'] }))}
                                className="w-full p-3 border-2 border-gray-200 rounded-lg"
                            >
                                <option value="visit">Doctor Visit</option>
                                <option value="ultrasound">Ultrasound</option>
                                <option value="test">Test</option>
                                <option value="class">Class</option>
                                <option value="other">Other</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Title (e.g., 20-week scan)"
                                value={form.title}
                                onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
                                className="w-full p-3 border-2 border-gray-200 rounded-lg"
                            />
                            <input
                                type="text"
                                placeholder="Location (optional)"
                                value={form.location}
                                onChange={(e) => setForm(f => ({ ...f, location: e.target.value }))}
                                className="w-full p-3 border-2 border-gray-200 rounded-lg"
                            />
                            <button
                                onClick={handleAdd}
                                className="w-full bg-purple-500 text-white font-bold py-3 rounded-lg"
                            >
                                Save Appointment
                            </button>
                        </div>
                    )}

                    {/* Upcoming */}
                    {upcoming.length > 0 && (
                        <div className="mb-6">
                            <h2 className="font-bold text-gray-800 mb-3">Upcoming</h2>
                            <div className="space-y-2">
                                {upcoming.map(apt => (
                                    <div key={apt.id} className="p-4 bg-gray-50 rounded-xl">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <span className={`p-2 rounded-full ${TYPE_INFO[apt.type].color}`}>
                                                    <Icon icon={TYPE_INFO[apt.type].icon} className="text-xl" />
                                                </span>
                                                <div>
                                                    <div className="font-bold text-gray-900">{apt.title}</div>
                                                    <div className="text-sm text-gray-500">
                                                        {new Date(apt.date).toLocaleDateString()} {apt.time && `at ${apt.time}`}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-bold text-purple-600">{getDaysUntil(apt.date)}</div>
                                                <button
                                                    onClick={() => toggleComplete(apt.id)}
                                                    className="text-xs text-green-600 hover:underline"
                                                >
                                                    Mark done
                                                </button>
                                            </div>
                                        </div>
                                        {apt.location && <div className="text-sm text-gray-500 mt-2">📍 {apt.location}</div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Standard Schedule */}
                    <div className="border-t pt-6">
                        <h2 className="font-bold text-gray-800 mb-3">📋 Standard Schedule</h2>
                        <div className="space-y-2">
                            {STANDARD_SCHEDULE.map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                                    <span className={`p-1.5 rounded-full bg-white ${TYPE_INFO[item.type].color.replace('bg-', 'text-')}`}>
                                        <Icon icon={TYPE_INFO[item.type].icon} />
                                    </span>
                                    <div>
                                        <span className="font-medium text-gray-800">Week {item.week}:</span>
                                        <span className="text-gray-600 ml-2">{item.title}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
