import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Gestimate - Your Smart Pregnancy Companion',
    description: 'Track your pregnancy journey with smart tools - due date calculator, kick counter, weight tracker, and more.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-[#f8fafc] text-slate-900 antialiased selection:bg-purple-200 selection:text-purple-900 font-sans">
                <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-100 via-pink-50 to-transparent opacity-60 blur-3xl"></div>
                <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-100 via-cyan-50 to-transparent opacity-60 blur-3xl"></div>
                {children}
            </body>
        </html>
    );
}
