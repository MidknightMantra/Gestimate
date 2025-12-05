'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    initializeHospitalBag,
    toggleItemPacked,
    getPackingProgress,
    CATEGORY_LABELS,
    type HospitalBagItem
} from '@gestimate/core';
import { Icon } from '@iconify/react';

export default function HospitalBagPage() {
    const [items, setItems] = useState<HospitalBagItem[]>(initializeHospitalBag());
    const [activeCategory, setActiveCategory] = useState<HospitalBagItem['category']>('mom');

    const handleToggle = (id: string) => {
        setItems(prev => toggleItemPacked(prev, id));
    };

    const progress = getPackingProgress(items);
    const categoryItems = items.filter(item => item.category === activeCategory);
    const categoryProgress = getPackingProgress(categoryItems);

    const categories: HospitalBagItem['category'][] = ['mom', 'baby', 'partner', 'documents'];

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-lg mx-auto">
                <Link href="/app" className="text-purple-600 hover:underline mb-4 inline-block">← Back</Link>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-6xl text-center mb-4 text-purple-500 flex justify-center">
                        <Icon icon="solar:bag-bold-duotone" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Hospital Bag</h1>

                    {/* Overall Progress */}
                    <div className="mb-6">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Overall Progress</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all flex items-center gap-2 ${activeCategory === cat
                                        ? 'bg-purple-500 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <Icon icon={
                                    cat === 'mom' ? 'solar:user-bold-duotone' :
                                        cat === 'baby' ? 'solar:user-heart-bold-duotone' :
                                            cat === 'partner' ? 'solar:users-group-two-rounded-bold-duotone' :
                                                'solar:document-bold-duotone'
                                } />
                                {CATEGORY_LABELS[cat].label}
                            </button>
                        ))}
                    </div>

                    {/* Category Progress */}
                    <div className="mb-4 text-sm text-gray-600">
                        {categoryProgress}% packed
                    </div>

                    {/* Items */}
                    <div className="space-y-2">
                        {categoryItems.map(item => (
                            <label
                                key={item.id}
                                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${item.packed ? 'bg-green-50' : 'bg-gray-50 hover:bg-gray-100'
                                    }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={item.packed}
                                    onChange={() => handleToggle(item.id)}
                                    className="w-5 h-5 rounded text-purple-500 focus:ring-purple-500"
                                />
                                <span className={item.packed ? 'line-through text-gray-400' : 'text-gray-700'}>
                                    {item.name}
                                </span>
                                {item.packed && <span className="ml-auto text-green-500">✓</span>}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Tips */}
                <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
                    <h2 className="font-bold text-gray-900 mb-3">💡 Packing Tips</h2>
                    <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Pack around week 36</li>
                        <li>• Keep bag in an easy-to-grab spot</li>
                        <li>• Include entertainment for long waits</li>
                        <li>• Don't forget phone chargers!</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
