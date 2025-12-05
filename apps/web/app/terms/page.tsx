import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service - Gestimate',
    description: 'Terms of service for using Gestimate',
};

export default function TermsPage() {
    return (
        <div className="min-h-screen py-16 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
                <p className="text-gray-600 mb-4">Last updated: December 2024</p>

                <div className="space-y-6 text-gray-700">
                    <section className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                        <h2 className="text-xl font-bold text-red-800 mb-2">⚠️ Medical Disclaimer</h2>
                        <p className="text-red-700">Gestimate is NOT a medical device. All calculations are estimates for informational purposes only. Always consult your healthcare provider for medical advice. Do not make medical decisions based solely on this app.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Use of Service</h2>
                        <p>By using Gestimate, you agree to use the service responsibly and understand that all pregnancy calculations are estimates based on standard formulas.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">User Responsibilities</h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Provide accurate information</li>
                            <li>Keep your account secure</li>
                            <li>Use the app for its intended purpose</li>
                            <li>Consult healthcare providers for medical decisions</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Limitation of Liability</h2>
                        <p>Gestimate is provided "as is" without warranties. We are not liable for any decisions made based on the app's calculations or content.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Contact</h2>
                        <p>Questions? Email us at legal@gestimate.app</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
