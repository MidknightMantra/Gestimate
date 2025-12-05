'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';

interface BumpPhoto {
    id: string;
    preview: string;
    week: number;
    caption: string;
    date: string;
}

export default function BumpGalleryPage() {
    const [photos, setPhotos] = useState<BumpPhoto[]>([]);
    const [showUpload, setShowUpload] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState<BumpPhoto | null>(null);
    const [currentWeek, setCurrentWeek] = useState(20);
    const [caption, setCaption] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const preview = event.target?.result as string;

            setPhotos(prev => [...prev, {
                id: Date.now().toString(),
                preview,
                week: currentWeek,
                caption,
                date: new Date().toLocaleDateString(),
            }].sort((a, b) => a.week - b.week));

            setCaption('');
            setShowUpload(false);
        };
        reader.readAsDataURL(file);
    };

    const deletePhoto = (id: string) => {
        setPhotos(prev => prev.filter(p => p.id !== id));
        setSelectedPhoto(null);
    };

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <Link href="/app" className="text-purple-600 hover:underline mb-4 inline-block">← Back</Link>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-6xl text-center mb-4 text-cyan-500 flex justify-center">
                        <Icon icon="solar:camera-bold-duotone" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Bump Gallery</h1>
                    <p className="text-gray-600 text-center mb-6">Document your pregnancy journey</p>

                    <button
                        onClick={() => setShowUpload(!showUpload)}
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg mb-6"
                    >
                        📷 Add Photo
                    </button>

                    {showUpload && (
                        <div className="border-2 border-purple-200 rounded-xl p-4 mb-6 space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Week</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="42"
                                    value={currentWeek}
                                    onChange={(e) => setCurrentWeek(parseInt(e.target.value) || 1)}
                                    className="w-full p-3 border-2 border-gray-200 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Caption (optional)</label>
                                <input
                                    type="text"
                                    placeholder="How are you feeling?"
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                    className="w-full p-3 border-2 border-gray-200 rounded-lg"
                                />
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full bg-purple-500 text-white font-bold py-3 rounded-lg"
                            >
                                Choose Photo
                            </button>
                        </div>
                    )}

                    {/* Timeline */}
                    {photos.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <div className="text-6xl mb-4">🤰</div>
                            <p>No photos yet. Add your first bump photo!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {photos.map((photo) => (
                                <div
                                    key={photo.id}
                                    onClick={() => setSelectedPhoto(photo)}
                                    className="flex gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-all"
                                >
                                    <img
                                        src={photo.preview}
                                        alt={`Week ${photo.week}`}
                                        className="w-20 h-20 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                        <div className="font-bold text-purple-700">Week {photo.week}</div>
                                        <div className="text-gray-600">{photo.caption || 'No caption'}</div>
                                        <div className="text-sm text-gray-400">{photo.date}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Stats */}
                    {photos.length > 0 && (
                        <div className="mt-6 p-4 bg-purple-50 rounded-xl text-center">
                            <span className="font-bold text-purple-700">{photos.length}</span>
                            <span className="text-gray-600"> photos documenting your journey</span>
                        </div>
                    )}
                </div>

                {/* Lightbox */}
                {selectedPhoto && (
                    <div
                        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden" onClick={e => e.stopPropagation()}>
                            <img
                                src={selectedPhoto.preview}
                                alt={`Week ${selectedPhoto.week}`}
                                className="w-full h-auto"
                            />
                            <div className="p-4">
                                <div className="font-bold text-xl text-purple-700 mb-1">Week {selectedPhoto.week}</div>
                                <div className="text-gray-600 mb-2">{selectedPhoto.caption || 'No caption'}</div>
                                <div className="flex justify-between items-center">
                                    <div className="text-sm text-gray-400">{selectedPhoto.date}</div>
                                    <button
                                        onClick={() => deletePhoto(selectedPhoto.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
