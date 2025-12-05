'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';

const SYMPTOMS = [
    { id: 'nausea', name: 'Nausea', icon: 'solar:emoji-funny-circle-bold-duotone' }, // Using funny circle as placeholder for nausea/sick
    { id: 'fatigue', name: 'Fatigue', icon: 'solar:sleeping-bold-duotone' },
    { id: 'backpain', name: 'Back Pain', icon: 'solar:bone-bold-duotone' },
    { id: 'headache', name: 'Headache', icon: 'solar:danger-circle-bold-duotone' },
    { id: 'heartburn', name: 'Heartburn', icon: 'solar:fire-bold-duotone' },
    { id: 'swelling', name: 'Swelling', icon: 'solar:maximize-square-minimalistic-bold-duotone' },
    { id: 'cramps', name: 'Cramps', icon: 'solar:bolt-bold-duotone' },
    { id: 'mood', name: 'Mood Swings', icon: 'solar:masks-bold-duotone' },
];

interface SymptomLog {
    symptom: string;
    icon: string;
    severity: number;
    notes: string;
    date: string;
}

export default function SymptomsPage() {
    const [selectedSymptom, setSelectedSymptom] = useState<typeof SYMPTOMS[0] | null>(null);
    const [severity, setSeverity] = useState(3);
    const [notes, setNotes] = useState('');
    const [logs, setLogs] = useState<SymptomLog[]>([]);

    const handleLog = () => {
        if (!selectedSymptom) return;

        setLogs(prev => [{
            symptom: selectedSymptom.name,
            icon: selectedSymptom.icon,
            severity,
            notes,
            date: new Date().toLocaleString(),
        }, ...prev]);

        setSelectedSymptom(null);
        setSeverity(3);
        setNotes('');
    };

    const getSeverityColor = (s: number) => {
        if (s <= 2) return 'bg-green-500';
        if (s <= 3) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-lg mx-auto">
                <Link href="/app" className="text-purple-600 hover:underline mb-4 inline-block">← Back</Link>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-6xl text-center mb-4 text-orange-500 flex justify-center">
                        <Icon icon="solar:thermometer-bold-duotone" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Symptom Logger</h1>
                    <p className="text-gray-600 text-center mb-6">Track how you're feeling</p>

                    {/* Symptom Grid */}
                    <div className="grid grid-cols-4 gap-3 mb-6">
                        {SYMPTOMS.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => setSelectedSymptom(s)}
                                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${selectedSymptom?.id === s.id
                                        ? 'border-orange-500 bg-orange-50'
                                        : 'border-gray-100 hover:border-orange-200'
                                    }`}
                            >
                                <div className="text-3xl text-orange-500">
                                    <Icon icon={s.icon} />
                                </div>
                                <span className="font-medium text-gray-700">{s.name}</span>
                            </button>
                        ))}
                    </div>

                    {selectedSymptom && (
                        <div className="bg-orange-50 rounded-xl p-6 mb-6 animate-fade-in">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="text-3xl text-orange-600">
                                    <Icon icon={selectedSymptom.icon} />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">{selectedSymptom.name}</h2>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Severity: {severity}/5</label>
                                <input
                                    type="range"
                                    min="1"
                                    max="5"
                                    value={severity}
                                    onChange={(e) => setSeverity(parseInt(e.target.value))}
                                    className="w-full accent-purple-500"
                                />
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>Mild</span>
                                    <span>Severe</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Any additional details..."
                                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none"
                                    rows={2}
                                />
                            </div>

                            <button
                                onClick={handleLog}
                                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-4 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg"
                            >
                                Log Symptom
                            </button>
                        </div>
                    )}
                </div>

                {/* History */}
                {logs.length > 0 && (
                    <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
                        <h2 className="font-bold text-gray-900 mb-4">Symptom History</h2>
                        <div className="space-y-3">
                            {logs.map((log, i) => (
                                <div key={i} className="p-4 bg-gray-50 rounded-xl">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="text-2xl text-orange-500">
                                                <Icon icon={log.icon} />
                                            </div>
                                            <span className="font-bold text-gray-900">{log.symptom}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex gap-0.5">
                                                {[1, 2, 3, 4, 5].map(n => (
                                                    <div
                                                        key={n}
                                                        className={`w-2 h-2 rounded-full ${n <= log.severity ? getSeverityColor(log.severity) : 'bg-gray-200'}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    {log.notes && <p className="text-gray-600 text-sm mt-1">{log.notes}</p>}
                                    <p className="text-gray-400 text-xs mt-1">{log.date}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
