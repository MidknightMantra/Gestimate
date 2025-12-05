'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { getMilestone, getFruitEmoji } from '@gestimate/core';
import { Icon } from '@iconify/react';

export default function MilestoneCardsPage() {
    const [week, setWeek] = useState(20);
    const [dueDate, setDueDate] = useState('');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [cardReady, setCardReady] = useState(false);

    const milestone = getMilestone(week);

    const generateCard = () => {
        const canvas = canvasRef.current;
        if (!canvas || !milestone) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Canvas size (1080x1080 for Instagram)
        canvas.width = 1080;
        canvas.height = 1080;

        // Background gradient
        const gradient = ctx.createLinearGradient(0, 0, 1080, 1080);
        gradient.addColorStop(0, '#fdf4ff');
        gradient.addColorStop(0.5, '#f5d0fe');
        gradient.addColorStop(1, '#e9d5ff');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1080, 1080);

        // Decorative circles
        ctx.fillStyle = 'rgba(192, 132, 252, 0.2)';
        ctx.beginPath();
        ctx.arc(100, 100, 150, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(236, 72, 153, 0.15)';
        ctx.beginPath();
        ctx.arc(980, 980, 200, 0, Math.PI * 2);
        ctx.fill();

        // Week number - large and prominent
        ctx.fillStyle = '#9333ea';
        ctx.font = 'bold 180px system-ui, -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`WEEK ${week}`, 540, 280);

        // Fruit emoji (render as text)
        ctx.font = '200px serif';
        ctx.fillText(getFruitEmoji(milestone.fruit), 540, 520);

        // Fruit comparison
        ctx.fillStyle = '#374151';
        ctx.font = 'bold 48px system-ui';
        ctx.fillText(`Baby is the size of a ${milestone.fruit}!`, 540, 640);

        // Size info
        ctx.fillStyle = '#6b7280';
        ctx.font = '36px system-ui';
        ctx.fillText(`${milestone.size} • ${milestone.weight}`, 540, 710);

        // Development highlight
        ctx.fillStyle = '#4b5563';
        ctx.font = '32px system-ui';
        const devText = milestone.development.length > 50
            ? milestone.development.substring(0, 50) + '...'
            : milestone.development;
        ctx.fillText(devText, 540, 800);

        // Due date countdown (if provided)
        if (dueDate) {
            const due = new Date(dueDate);
            const now = new Date();
            const daysLeft = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

            ctx.fillStyle = '#ec4899';
            ctx.font = 'bold 42px system-ui';
            ctx.fillText(`${daysLeft} days until we meet! 💕`, 540, 900);
        }

        // Branding
        ctx.fillStyle = '#9ca3af';
        ctx.font = '28px system-ui';
        ctx.fillText('Made with Gestimate 💜', 540, 1030);

        setCardReady(true);
    };

    const downloadCard = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const link = document.createElement('a');
        link.download = `gestimate-week-${week}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    useEffect(() => {
        generateCard();
    }, [week, dueDate]);

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <Link href="/app" className="text-purple-600 hover:underline mb-4 inline-block">← Back</Link>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-6xl text-center mb-4 text-yellow-500 flex justify-center">
                        <Icon icon="solar:star-bold-duotone" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Milestone Cards</h1>
                    <p className="text-gray-600 text-center mb-6">Create shareable pregnancy milestone cards</p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Week</label>
                            <input
                                type="number"
                                min="1"
                                max="42"
                                value={week}
                                onChange={(e) => setWeek(parseInt(e.target.value) || 1)}
                                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date (optional)</label>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="bg-gray-100 rounded-xl p-4 mb-6">
                        <canvas
                            ref={canvasRef}
                            className="w-full rounded-lg shadow-lg"
                            style={{ maxHeight: '400px', objectFit: 'contain' }}
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={generateCard}
                            className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-300 transition-all"
                        >
                            🔄 Refresh
                        </button>
                        <button
                            onClick={downloadCard}
                            disabled={!cardReady}
                            className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg disabled:opacity-50"
                        >
                            📥 Download
                        </button>
                    </div>

                    {/* Tips */}
                    <div className="mt-6 p-4 bg-purple-50 rounded-xl">
                        <h3 className="font-bold text-purple-800 mb-2">💡 Share Tips</h3>
                        <ul className="text-sm text-purple-700 space-y-1">
                            <li>• Perfect for Instagram, Facebook, WhatsApp</li>
                            <li>• 1080x1080px optimal for social media</li>
                            <li>• Create one each week to track your journey!</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
