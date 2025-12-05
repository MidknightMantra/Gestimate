'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { startKickSession, addKick, isGoalReached, formatDuration, getKickProgress } from '@gestimate/core';
import { Icon } from '@iconify/react';

export default function KickCounterPage() {
    const [session, setSession] = useState<ReturnType<typeof startKickSession> | null>(null);
    const [isActive, setIsActive] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const [history, setHistory] = useState<Array<{ kicks: number; duration: number; date: string }>>([]);

    // Timer effect
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive && session) {
            interval = setInterval(() => {
                setElapsed(Math.floor((Date.now() - session.startTime.getTime()) / 1000));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive, session]);

    const handleStart = () => {
        const newSession = startKickSession('user-1');
        setSession(newSession);
        setIsActive(true);
        setElapsed(0);
    };

    const handleKick = () => {
        if (!session) return;
        const updated = addKick(session);
        setSession(updated);

        if (isGoalReached(updated)) {
            handleFinish(updated);
        }
    };

    const handleFinish = (finalSession = session) => {
        if (!finalSession) return;
        setIsActive(false);
        setHistory(prev => [{
            kicks: finalSession.kickCount,
            duration: elapsed,
            date: new Date().toLocaleString(),
        }, ...prev.slice(0, 9)]);
        setSession(null);
    };

    const progress = session ? getKickProgress(session) : 0;

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-lg mx-auto">
                <Link href="/app" className="text-purple-600 hover:underline mb-4 inline-block">← Back</Link>

                <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="text-6xl mb-4 text-pink-500 flex justify-center">
                        <Icon icon="solar:walking-round-bold-duotone" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Kick Counter</h1>
                    <p className="text-gray-600 mb-8">Track baby movements - goal: 10 kicks</p>

                    {!isActive ? (
                        <button
                            onClick={handleStart}
                            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-4 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg text-lg"
                        >
                            Start Session
                        </button>
                    ) : (
                        <>
                            {/* Progress Ring */}
                            <div className="relative w-48 h-48 mx-auto mb-6">
                                <svg className="w-48 h-48 transform -rotate-90">
                                    <circle cx="96" cy="96" r="88" stroke="#e5e7eb" strokeWidth="12" fill="none" />
                                    <circle
                                        cx="96" cy="96" r="88"
                                        stroke="url(#kickGradient)"
                                        strokeWidth="12"
                                        fill="none"
                                        strokeDasharray={`${progress * 5.53} 553`}
                                        strokeLinecap="round"
                                    />
                                    <defs>
                                        <linearGradient id="kickGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#ec4899" />
                                            <stop offset="100%" stopColor="#8b5cf6" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-5xl font-bold text-gray-900">{session?.kickCount || 0}</span>
                                    <span className="text-gray-500">/ 10 kicks</span>
                                </div>
                            </div>

                            <div className="text-2xl font-mono text-gray-700 mb-6">{formatDuration(elapsed)}</div>

                            <button
                                onClick={handleKick}
                                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-6 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg text-2xl mb-4 active:scale-95"
                            >
                                👶 KICK!
                            </button>

                            <button
                                onClick={() => handleFinish()}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                Finish Early
                            </button>
                        </>
                    )}
                </div>

                {/* History */}
                {history.length > 0 && (
                    <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
                        <h2 className="font-bold text-gray-900 mb-4">Recent Sessions</h2>
                        <div className="space-y-3">
                            {history.map((h, i) => (
                                <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-600">{h.date}</span>
                                    <div className="text-right">
                                        <span className="font-bold text-purple-600">{h.kicks} kicks</span>
                                        <span className="text-gray-400 ml-2">{formatDuration(h.duration)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
