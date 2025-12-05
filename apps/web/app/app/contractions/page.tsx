'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    startContractionSession,
    startContraction,
    endContraction,
    addContractionToSession,
    getAverageFrequency,
    getAverageDuration,
    formatContractionDuration,
    check511Rule
} from '@gestimate/core';
import { Icon } from '@iconify/react';

export default function ContractionsPage() {
    const [session, setSession] = useState(startContractionSession('user-1'));
    const [activeContraction, setActiveContraction] = useState<ReturnType<typeof startContraction> | null>(null);
    const [elapsed, setElapsed] = useState(0);
    const [show511Alert, setShow511Alert] = useState(false);

    // Timer for active contraction
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (activeContraction) {
            interval = setInterval(() => {
                setElapsed(Math.floor((Date.now() - activeContraction.startTime.getTime()) / 1000));
            }, 100);
        }
        return () => clearInterval(interval);
    }, [activeContraction]);

    const handleStart = () => {
        setActiveContraction(startContraction());
        setElapsed(0);
    };

    const handleEnd = () => {
        if (!activeContraction) return;

        const completed = endContraction(activeContraction);
        const updatedSession = addContractionToSession(session, completed);
        setSession(updatedSession);
        setActiveContraction(null);

        if (updatedSession.is511Alert && !show511Alert) {
            setShow511Alert(true);
        }
    };

    const avgFreq = getAverageFrequency(session.contractions);
    const avgDur = getAverageDuration(session.contractions);

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-lg mx-auto">
                <Link href="/app" className="text-purple-600 hover:underline mb-4 inline-block">← Back</Link>

                {/* 5-1-1 Alert */}
                {show511Alert && (
                    <div className="bg-red-500 text-white p-6 rounded-2xl mb-6 animate-pulse">
                        <div className="text-3xl text-center mb-2">🚨 5-1-1 ALERT!</div>
                        <p className="text-center font-bold">Time to call your doctor or head to the hospital!</p>
                        <p className="text-center text-sm opacity-90 mt-2">Contractions are 5 minutes apart, lasting 1 minute, for 1 hour</p>
                        <button
                            onClick={() => setShow511Alert(false)}
                            className="w-full mt-4 bg-white text-red-500 font-bold py-2 rounded-lg"
                        >
                            Dismiss
                        </button>
                    </div>
                )}

                <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="text-6xl mb-4 text-red-500 flex justify-center">
                        <Icon icon="solar:stopwatch-bold-duotone" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Contraction Timer</h1>
                    <p className="text-gray-600 mb-8">Track labor contractions with 5-1-1 rule</p>

                    {/* Main Button */}
                    {!activeContraction ? (
                        <button
                            onClick={handleStart}
                            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-6 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all shadow-lg text-xl"
                        >
                            🔴 Start Contraction
                        </button>
                    ) : (
                        <div>
                            <div className="text-6xl font-mono font-bold text-red-500 mb-4 animate-pulse">
                                {elapsed}s
                            </div>
                            <button
                                onClick={handleEnd}
                                className="w-full bg-gray-800 text-white font-bold py-6 rounded-xl hover:bg-gray-900 transition-all shadow-lg text-xl"
                            >
                                ⬜ End Contraction
                            </button>
                        </div>
                    )}

                    {/* Stats */}
                    {session.contractions.length > 0 && (
                        <div className="grid grid-cols-3 gap-4 mt-8">
                            <div className="bg-purple-50 p-4 rounded-xl">
                                <div className="text-2xl font-bold text-purple-700">{session.contractions.length}</div>
                                <div className="text-xs text-gray-600">Total</div>
                            </div>
                            <div className="bg-pink-50 p-4 rounded-xl">
                                <div className="text-2xl font-bold text-pink-700">
                                    {avgFreq ? `${avgFreq.toFixed(1)}m` : '-'}
                                </div>
                                <div className="text-xs text-gray-600">Avg Freq</div>
                            </div>
                            <div className="bg-orange-50 p-4 rounded-xl">
                                <div className="text-2xl font-bold text-orange-700">
                                    {avgDur ? `${Math.round(avgDur)}s` : '-'}
                                </div>
                                <div className="text-xs text-gray-600">Avg Dur</div>
                            </div>
                        </div>
                    )}

                    {/* 5-1-1 Info */}
                    <div className="mt-8 p-4 bg-gray-50 rounded-xl text-left">
                        <h3 className="font-bold text-gray-800 mb-2">5-1-1 Rule</h3>
                        <p className="text-sm text-gray-600">
                            Call your doctor when contractions are: <strong>5 minutes</strong> apart,
                            lasting <strong>1 minute</strong>, for at least <strong>1 hour</strong>
                        </p>
                    </div>
                </div>

                {/* History */}
                {session.contractions.length > 0 && (
                    <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
                        <h2 className="font-bold text-gray-900 mb-4">Recent Contractions</h2>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                            {[...session.contractions].reverse().slice(0, 12).map((c, i) => (
                                <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-600">
                                        {c.startTime.toLocaleTimeString()}
                                    </span>
                                    <span className="font-bold text-orange-600">
                                        {formatContractionDuration(c.durationSeconds)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
