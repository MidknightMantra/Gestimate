import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy - Gestimate',
    description: 'How Gestimate protects your pregnancy data',
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen py-16 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
                <p className="text-gray-600 mb-4">Last updated: December 2024</p>

                <div className="space-y-6 text-gray-700">
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Your Privacy Matters</h2>
                        <p>Gestimate is committed to protecting your pregnancy data. We use industry-standard security measures including encryption and Row Level Security (RLS) to ensure only you can access your information.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Data We Collect</h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Email address for authentication</li>
                            <li>Pregnancy-related data you choose to track</li>
                            <li>Photos you upload to bump gallery</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Data Storage</h2>
                        <p>Your data is stored securely on Supabase servers with encryption at rest and in transit. We do not sell or share your personal information with third parties.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Your Rights</h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Export all your data at any time</li>
                            <li>Request deletion of your account</li>
                            <li>Access and modify your information</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Contact</h2>
                        <p>Questions? Email us at privacy@gestimate.app</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
