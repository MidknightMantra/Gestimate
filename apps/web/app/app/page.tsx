'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import {
    calculatePregnancy,
    getCalculationMethods,
    getMilestone,
    getFruitEmoji,
    type CalculationMethod,
    type PregnancyResult
} from '@gestimate/core';

export default function AppPage() {
    const [method, setMethod] = useState<CalculationMethod>('lmp');
    const [date, setDate] = useState('');
    const [result, setResult] = useState<PregnancyResult | null>(null);
    const [showDisclaimer, setShowDisclaimer] = useState(true);

    const methods = getCalculationMethods();

    const handleCalculate = () => {
        if (!date) return;
        const pregnancy = calculatePregnancy({ method, date: new Date(date) });
        setResult(pregnancy);
    };

    const milestone = result ? getMilestone(result.currentWeek) : null;

    // Medical Disclaimer
    if (showDisclaimer) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8">
                    <div className="text-center mb-6">
                        <div className="text-6xl mb-4">⚕️</div>
                        <h1 className="text-2xl font-bold text-gray-900">Medical Disclaimer</h1>
                    </div>
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                        <p className="text-red-800 font-semibold mb-2">⚠️ Important</p>
                        <ul className="text-red-700 text-sm space-y-2">
                            <li>This app is for <strong>informational purposes only</strong></li>
                            <li>All calculations are <strong>estimates</strong></li>
                            <li><strong>Always consult your healthcare provider</strong></li>
                            <li>For emergencies, call 911 immediately</li>
                        </ul>
                    </div>
                    <button
                        onClick={() => setShowDisclaimer(false)}
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-4 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg"
                    >
                        I Understand, Continue →
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 py-12">
            <div className="max-w-4xl mx-auto">
                {/* Calculator Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-2">
                        Pregnancy Calculator
                    </h1>
                    <p className="text-gray-600 mb-6">Select your method and enter the date</p>

                    {/* Method Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
                        {methods.map((m) => (
                            <button
                                key={m.id}
                                onClick={() => setMethod(m.id)}
                                className={`p-4 rounded-xl border-2 transition-all text-sm ${method === m.id
                                    ? 'border-purple-500 bg-purple-50 shadow-lg'
                                    : 'border-gray-200 hover:border-purple-300'
                                    }`}
                            >
                                <div className="font-bold text-gray-900">{m.name}</div>
                            </button>
                        ))}
                    </div>

                    {/* Date Input */}
                    <div className="flex gap-4 mb-6">
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="flex-1 p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                        />
                        <button
                            onClick={handleCalculate}
                            disabled={!date}
                            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold px-8 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg disabled:opacity-50"
                        >
                            Calculate
                        </button>
                    </div>

                    {/* Results */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 flex flex-col justify-center items-center text-center border border-purple-100/50">
                        {!result ? (
                            <div className="text-slate-400">
                                <Icon icon="solar:calendar-add-bold-duotone" className="text-5xl mb-3 mx-auto opacity-50" />
                                <p>Enter a date to see your timeline</p>
                            </div>
                        ) : (
                            <div className="animate-scale-in w-full">
                                <div className="text-sm font-bold text-purple-600 uppercase tracking-wider mb-1">Estimated Due Date</div>
                                <div className="text-4xl font-bold text-slate-800 mb-6">{result.dueDate.toLocaleDateString(undefined, { dateStyle: 'long' })}</div>

                                <div className="grid grid-cols-2 gap-4 text-left">
                                    <div className="bg-white/60 p-4 rounded-xl">
                                        <div className="text-xs text-slate-500 mb-1">Current Progress</div>
                                        <div className="font-bold text-slate-800">{result.currentWeek} weeks, {result.currentDay} days</div>
                                    </div>
                                    <div className="bg-white/60 p-4 rounded-xl">
                                        <div className="text-xs text-slate-500 mb-1">Trimester</div>
                                        <div className="font-bold text-slate-800">{result.trimester}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {result && (
                    <div className="mt-8 pt-8 border-t border-slate-100">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="text-center md:text-left">
                                <div className="text-6xl mb-2 animate-bounce">{getFruitEmoji(getMilestone(result.currentWeek)?.fruit || '')}</div>
                                <div className="text-sm text-slate-500">Baby Size</div>
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-lg font-bold text-slate-800 mb-1">
                                    Baby is the size of a {getMilestone(result.currentWeek)?.fruit}!
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {getMilestone(result.currentWeek)?.development}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Features Grid */}
            {result && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    {[
                        { icon: 'solar:walking-round-bold-duotone', label: 'Kick Counter', link: '/app/kicks', color: 'text-pink-500', bg: 'bg-pink-50' },
                        { icon: 'solar:scale-bold-duotone', label: 'Weight', link: '/app/weight', color: 'text-blue-500', bg: 'bg-blue-50' },
                        { icon: 'solar:thermometer-bold-duotone', label: 'Symptoms', link: '/app/symptoms', color: 'text-orange-500', bg: 'bg-orange-50' },
                        { icon: 'solar:stopwatch-bold-duotone', label: 'Contractions', link: '/app/contractions', color: 'text-red-500', bg: 'bg-red-50' },
                        { icon: 'solar:bag-bold-duotone', label: 'Hospital Bag', link: '/app/hospital-bag', color: 'text-purple-500', bg: 'bg-purple-50' },
                        { icon: 'solar:calendar-bold-duotone', label: 'Appointments', link: '/app/appointments', color: 'text-indigo-500', bg: 'bg-indigo-50' },
                        { icon: 'solar:heart-bold-duotone', label: 'Baby Names', link: '/app/names', color: 'text-rose-500', bg: 'bg-rose-50' },
                        { icon: 'solar:camera-bold-duotone', label: 'Bump Gallery', link: '/app/gallery', color: 'text-cyan-500', bg: 'bg-cyan-50' },
                        { icon: 'solar:clipboard-list-bold-duotone', label: 'Birth Plan', link: '/app/birth-plan', color: 'text-teal-500', bg: 'bg-teal-50' },
                        { icon: 'solar:star-bold-duotone', label: 'Milestone Cards', link: '/app/milestone-cards', color: 'text-yellow-500', bg: 'bg-yellow-50' },
                        { icon: 'solar:calendar-date-bold-duotone', label: 'Timeline', link: '/app/timeline', color: 'text-violet-500', bg: 'bg-violet-50' },
                        { icon: 'solar:export-bold-duotone', label: 'Export', link: '/app/export', color: 'text-slate-500', bg: 'bg-slate-50' },
                    ].map(({ icon, label, link, color, bg }) => (
                        <a
                            key={label}
                            href={link}
                            className="glass-card p-6 flex flex-col items-center justify-center text-center group hover:border-purple-200"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                                <Icon icon={icon} className={`text-3xl ${color}`} />
                            </div>
                            <div className="font-bold text-slate-700 text-sm group-hover:text-purple-600 transition-colors">{label}</div>
                        </a>
                    ))}
                </div>
            )}

            {/* Disclaimer */}
            {showDisclaimer && (
                <div className="mt-12 glass-panel p-4 flex items-start gap-3 bg-amber-50/50 border-amber-100">
                    <Icon icon="solar:info-circle-bold-duotone" className="text-xl text-amber-500 mt-0.5 shrink-0" />
                    <div className="flex-1">
                        <p className="text-xs text-amber-800/80 leading-relaxed">
                            <strong>Medical Disclaimer:</strong> This tool is for informational purposes only and does not constitute medical advice.
                            Always consult with your healthcare provider for professional medical advice, diagnosis, or treatment.
                        </p>
                    </div>
                    <button onClick={() => setShowDisclaimer(false)} className="text-amber-400 hover:text-amber-600">
                        <Icon icon="solar:close-circle-bold-duotone" />
                    </button>
                </div>
            )}
        </div>
    );
}
