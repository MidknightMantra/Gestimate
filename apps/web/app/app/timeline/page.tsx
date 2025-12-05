'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MILESTONES, getFruitEmoji } from '@gestimate/core';
import { Icon } from '@iconify/react';

export default function TimelinePage() {
    const [currentWeek, setCurrentWeek] = useState(20);

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <Link href="/app" className="text-purple-600 hover:underline mb-4 inline-block">← Back</Link>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-6xl text-center mb-4 text-violet-500 flex justify-center">
                        <Icon icon="solar:calendar-date-bold-duotone" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Pregnancy Timeline</h1>
                    <p className="text-gray-600 text-center mb-6">Week-by-week development guide</p>

                    {/* Week selector */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Jump to week:</label>
                        <input
                            type="range"
                            min="1"
                            max="40"
                            value={currentWeek}
                            onChange={(e) => setCurrentWeek(parseInt(e.target.value))}
                            className="w-full accent-purple-500"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Week 1</span>
                            <span className="font-bold text-purple-600">Week {currentWeek}</span>
                            <span>Week 40</span>
                        </div>
                    </div>

                    {/* Trimesters */}
                    <div className="flex gap-2 mb-6">
                        <button
                            onClick={() => setCurrentWeek(6)}
                            className="flex-1 py-2 px-3 rounded-lg bg-pink-100 text-pink-700 font-medium text-sm"
                        >
                            1st Tri
                        </button>
                        <button
                            onClick={() => setCurrentWeek(20)}
                            className="flex-1 py-2 px-3 rounded-lg bg-purple-100 text-purple-700 font-medium text-sm"
                        >
                            2nd Tri
                        </button>
                        <button
                            onClick={() => setCurrentWeek(32)}
                            className="flex-1 py-2 px-3 rounded-lg bg-indigo-100 text-indigo-700 font-medium text-sm"
                        >
                            3rd Tri
                        </button>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                        {MILESTONES.slice(0, 40).map((milestone) => (
                            <div
                                key={milestone.week}
                                className={`p-4 rounded-xl transition-all ${milestone.week === currentWeek
                                    ? 'bg-gradient-to-r from-pink-100 to-purple-100 ring-2 ring-purple-400 scale-[1.02]'
                                    : milestone.week < currentWeek
                                        ? 'bg-green-50 opacity-75'
                                        : 'bg-gray-50'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="text-4xl">{getFruitEmoji(milestone.fruit)}</div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className={`font-bold ${milestone.week === currentWeek ? 'text-purple-700' : 'text-gray-900'}`}>
                                                Week {milestone.week}
                                            </span>
                                            {milestone.week < currentWeek && (
                                                <span className="text-green-600 text-sm">✓ Complete</span>
                                            )}
                                            {milestone.week === currentWeek && (
                                                <span className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">NOW</span>
                                            )}
                                        </div>
                                        <div className="text-gray-700">{milestone.fruit} • {milestone.size}</div>
                                        <div className="text-sm text-gray-600 mt-1">{milestone.development}</div>
                                    </div>
                                </div>

                                {milestone.week === currentWeek && (
                                    <div className="mt-3 pt-3 border-t border-purple-200">
                                        <div className="text-sm font-medium text-purple-800 mb-1">💡 Tips for this week:</div>
                                        <ul className="text-sm text-purple-700 space-y-1">
                                            {milestone.tips.map((tip, i) => (
                                                <li key={i}>• {tip}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
