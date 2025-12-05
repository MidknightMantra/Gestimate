'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';

interface BabyName {
    id: string;
    name: string;
    category: 'boy' | 'girl' | 'neutral';
    origin: string;
    meaning: string;
    notes: string;
    isFavorite: boolean;
}

const CATEGORY_INFO = {
    boy: { icon: 'solar:men-bold-duotone', color: 'bg-blue-100 text-blue-700' },
    girl: { icon: 'solar:women-bold-duotone', color: 'bg-pink-100 text-pink-700' },
    neutral: { icon: 'solar:user-heart-bold-duotone', color: 'bg-purple-100 text-purple-700' },
};

export default function BabyNamesPage() {
    const [names, setNames] = useState<BabyName[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [filter, setFilter] = useState<'all' | 'boy' | 'girl' | 'neutral' | 'favorites'>('all');
    const [form, setForm] = useState({
        name: '', category: 'neutral' as BabyName['category'],
        origin: '', meaning: '', notes: ''
    });

    const handleAdd = () => {
        if (!form.name) return;

        setNames(prev => [...prev, {
            id: Date.now().toString(),
            ...form,
            isFavorite: false,
        }]);

        setForm({ name: '', category: 'neutral', origin: '', meaning: '', notes: '' });
        setShowForm(false);
    };

    const toggleFavorite = (id: string) => {
        setNames(prev => prev.map(n =>
            n.id === id ? { ...n, isFavorite: !n.isFavorite } : n
        ));
    };

    const deleteName = (id: string) => {
        setNames(prev => prev.filter(n => n.id !== id));
    };

    const filtered = names.filter(n => {
        if (filter === 'all') return true;
        if (filter === 'favorites') return n.isFavorite;
        return n.category === filter;
    });

    const favorites = names.filter(n => n.isFavorite);

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-lg mx-auto">
                <Link href="/app" className="text-purple-600 hover:underline mb-4 inline-block">← Back</Link>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-6xl text-center mb-4 text-rose-500 flex justify-center">
                        <Icon icon="solar:heart-bold-duotone" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Baby Names</h1>
                    <p className="text-gray-600 text-center mb-6">Organize your name ideas</p>

                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg mb-6"
                    >
                        + Add Name
                    </button>

                    {showForm && (
                        <div className="border-2 border-purple-200 rounded-xl p-4 mb-6 space-y-3">
                            <input
                                type="text"
                                placeholder="Name"
                                value={form.name}
                                onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                                className="w-full p-3 border-2 border-gray-200 rounded-lg"
                            />
                            <select
                                value={form.category}
                                onChange={(e) => setForm(f => ({ ...f, category: e.target.value as BabyName['category'] }))}
                                className="w-full p-3 border-2 border-gray-200 rounded-lg"
                            >
                                <option value="boy">Boy</option>
                                <option value="girl">Girl</option>
                                <option value="neutral">Neutral</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Origin (e.g., Greek, Hebrew)"
                                value={form.origin}
                                onChange={(e) => setForm(f => ({ ...f, origin: e.target.value }))}
                                className="w-full p-3 border-2 border-gray-200 rounded-lg"
                            />
                            <input
                                type="text"
                                placeholder="Meaning"
                                value={form.meaning}
                                onChange={(e) => setForm(f => ({ ...f, meaning: e.target.value }))}
                                className="w-full p-3 border-2 border-gray-200 rounded-lg"
                            />
                            <button
                                onClick={handleAdd}
                                className="w-full bg-purple-500 text-white font-bold py-3 rounded-lg"
                            >
                                Save Name
                            </button>
                        </div>
                    )}

                    {/* Filters */}
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                        {(['all', 'favorites', 'boy', 'girl', 'neutral'] as const).map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all flex items-center gap-2 ${filter === f
                                    ? 'bg-purple-500 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {f === 'all' && <Icon icon="solar:clipboard-list-bold-duotone" />}
                                {f === 'favorites' && <Icon icon="solar:star-bold-duotone" />}
                                {f === 'boy' && <Icon icon="solar:men-bold-duotone" />}
                                {f === 'girl' && <Icon icon="solar:women-bold-duotone" />}
                                {f === 'neutral' && <Icon icon="solar:user-heart-bold-duotone" />}
                                <span>
                                    {f === 'all' ? 'All' : f === 'favorites' ? 'Favorites' :
                                        f === 'boy' ? 'Boy' : f === 'girl' ? 'Girl' : 'Neutral'}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Names List */}
                    {filtered.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            No names yet. Add your first idea!
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filtered.map(n => (
                                <div key={n.id} className="p-4 bg-gray-50 rounded-xl">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className={`p-2 rounded-full text-sm ${CATEGORY_INFO[n.category].color}`}>
                                                <Icon icon={CATEGORY_INFO[n.category].icon} className="text-lg" />
                                            </span>
                                            <span className="font-bold text-gray-900 text-lg">{n.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => toggleFavorite(n.id)}
                                                className={`text-2xl ${n.isFavorite ? 'text-yellow-500' : 'text-gray-300'}`}
                                            >
                                                <Icon icon={n.isFavorite ? "solar:star-bold" : "solar:star-linear"} />
                                            </button>
                                            <button
                                                onClick={() => deleteName(n.id)}
                                                className="text-gray-400 hover:text-red-500"
                                            >
                                                <Icon icon="solar:trash-bin-trash-bold-duotone" />
                                            </button>
                                        </div>
                                    </div>
                                    {(n.origin || n.meaning) && (
                                        <div className="mt-2 text-sm text-gray-600">
                                            {n.origin && <span className="mr-3">🌍 {n.origin}</span>}
                                            {n.meaning && <span>💭 {n.meaning}</span>}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Favorites Summary */}
                    {favorites.length > 0 && (
                        <div className="mt-6 p-4 bg-yellow-50 rounded-xl">
                            <h3 className="font-bold text-gray-800 mb-2">⭐ Your Favorites ({favorites.length})</h3>
                            <div className="flex flex-wrap gap-2">
                                {favorites.map(n => (
                                    <span key={n.id} className="px-3 py-1 bg-yellow-200 rounded-full text-sm font-medium">
                                        {n.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
