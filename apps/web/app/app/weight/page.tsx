'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calculateBMI, getRecommendedGain, isWeightHealthy, formatWeightChange } from '@gestimate/core';
import { Icon } from '@iconify/react';

export default function WeightTrackerPage() {
    const [config, setConfig] = useState({ height: 165, prePregnancyWeight: 60 });
    const [currentWeight, setCurrentWeight] = useState('');
    const [week, setWeek] = useState(20);
    const [logs, setLogs] = useState<Array<{ weight: number; week: number; date: string; status: string }>>([]);
    const [setupDone, setSetupDone] = useState(false);

    const bmi = calculateBMI(config.height, config.prePregnancyWeight);
    const recommended = getRecommendedGain(config);

    const handleLog = () => {
        if (!currentWeight) return;
        const weight = parseFloat(currentWeight);
        const status = isWeightHealthy(config, weight, week);

        setLogs(prev => [{
            weight,
            week,
            date: new Date().toLocaleDateString(),
            status,
        }, ...prev]);
        setCurrentWeight('');
    };

    const getStatusColor = (status: string) => {
        if (status === 'healthy') return 'text-green-600 bg-green-50';
        if (status === 'low') return 'text-yellow-600 bg-yellow-50';
        return 'text-red-600 bg-red-50';
    };

    if (!setupDone) {
        return (
            <div className="min-h-screen py-12 px-4">
                <div className="max-w-lg mx-auto">
                    <Link href="/app" className="text-purple-600 hover:underline mb-4 inline-block">← Back</Link>

                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="text-5xl text-center mb-4">⚖️</div>
                        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">Weight Tracker Setup</h1>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                                <input
                                    type="number"
                                    value={config.height}
                                    onChange={(e) => setConfig(c => ({ ...c, height: parseInt(e.target.value) || 0 }))}
                                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pre-pregnancy Weight (kg)</label>
                                <input
                                    type="number"
                                    value={config.prePregnancyWeight}
                                    onChange={(e) => setConfig(c => ({ ...c, prePregnancyWeight: parseInt(e.target.value) || 0 }))}
                                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                                />
                            </div>

                            <div className="bg-purple-50 p-4 rounded-xl">
                                <div className="text-sm text-gray-600">Your BMI: <span className="font-bold text-purple-700">{bmi.toFixed(1)}</span></div>
                                <div className="text-sm text-gray-600">Category: <span className="font-bold">{recommended.category}</span></div>
                                <div className="text-sm text-gray-600">Recommended gain: <span className="font-bold text-green-600">{recommended.min}-{recommended.max} kg</span></div>
                            </div>

                            <button
                                onClick={() => setSetupDone(true)}
                                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-4 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg"
                            >
                                Continue →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-lg mx-auto">
                <Link href="/app" className="text-purple-600 hover:underline mb-4 inline-block">← Back</Link>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-6xl text-center mb-4 text-blue-500 flex justify-center">
                        <Icon icon="solar:scale-bold-duotone" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Weight Tracker</h1>
                    <p className="text-gray-600 text-center mb-6">Recommended: {recommended.min}-{recommended.max} kg gain</p>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Week</label>
                            <input
                                type="number"
                                min="1"
                                max="42"
                                value={week}
                                onChange={(e) => setWeek(parseInt(e.target.value) || 1)}
                                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Weight (kg)</label>
                            <input
                                type="number"
                                step="0.1"
                                value={currentWeight}
                                onChange={(e) => setCurrentWeight(e.target.value)}
                                placeholder="e.g. 65.5"
                                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                            />
                        </div>

                        <button
                            onClick={handleLog}
                            disabled={!currentWeight}
                            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-4 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg disabled:opacity-50"
                        >
                            Log Weight
                        </button>
                    </div>
                </div>

                {/* Logs */}
                {logs.length > 0 && (
                    <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
                        <h2 className="font-bold text-gray-900 mb-4">Weight History</h2>
                        <div className="space-y-3">
                            {logs.map((log, i) => (
                                <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <span className="font-bold text-gray-900">{log.weight} kg</span>
                                        <span className="text-gray-500 ml-2">Week {log.week}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-400">{log.date}</span>
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(log.status)}`}>
                                            {log.status === 'healthy' ? '✓ On Track' : log.status === 'low' ? '↓ Low' : '↑ High'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                            <div className="text-sm text-gray-600">
                                Total change: <span className="font-bold text-purple-700">
                                    {formatWeightChange(logs[0]?.weight - config.prePregnancyWeight || 0)}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
