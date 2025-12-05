import Link from 'next/link';
import { Icon } from '@iconify/react';

export default function HomePage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-24 px-4 overflow-hidden">
                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-white/50 border border-white/50 text-purple-600 text-sm font-semibold mb-6 animate-fade-in shadow-sm backdrop-blur-sm">
                        ✨ The #1 Free Pregnancy Tracker
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-6 animate-slide-up tracking-tight">
                        Your Smart Pregnancy<br />Companion
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        Track every precious moment with beautiful, intelligent tools designed for modern expecting parents.
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <Link
                            href="/app"
                            className="btn-primary text-lg px-8 py-4"
                        >
                            Start Tracking Free →
                        </Link>
                        <Link
                            href="#features"
                            className="btn-secondary text-lg px-8 py-4"
                        >
                            Explore Features
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-12">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="glass-panel p-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center bg-white/40">
                        <div><div className="text-4xl font-bold text-purple-600 mb-1">13+</div><div className="text-slate-500 font-medium">Smart Tools</div></div>
                        <div><div className="text-4xl font-bold text-pink-600 mb-1">5</div><div className="text-slate-500 font-medium">Calc Methods</div></div>
                        <div><div className="text-4xl font-bold text-indigo-600 mb-1">40w</div><div className="text-slate-500 font-medium">Weekly Updates</div></div>
                        <div><div className="text-4xl font-bold text-teal-600 mb-1">100%</div><div className="text-slate-500 font-medium">Free Forever</div></div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-24 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">Everything You Need</h2>
                        <p className="text-xl text-slate-500">From the first kick to the hospital bag, we've got you covered.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: 'solar:calculator-bold-duotone', title: 'Pregnancy Calculator', desc: '5 methods including IVF support', color: 'text-purple-500', bg: 'bg-purple-50' },
                            { icon: 'solar:walking-round-bold-duotone', title: 'Kick Counter', desc: 'Track movements with analytics', color: 'text-pink-500', bg: 'bg-pink-50' },
                            { icon: 'solar:scale-bold-duotone', title: 'Weight Tracker', desc: 'CDC/WHO recommendations + charts', color: 'text-blue-500', bg: 'bg-blue-50' },
                            { icon: 'solar:thermometer-bold-duotone', title: 'Symptom Logger', desc: 'Log and visualize patterns', color: 'text-orange-500', bg: 'bg-orange-50' },
                            { icon: 'solar:stopwatch-bold-duotone', title: 'Contraction Timer', desc: '5-1-1 rule monitoring', color: 'text-red-500', bg: 'bg-red-50' },
                            { icon: 'solar:camera-bold-duotone', title: 'Bump Gallery', desc: 'Photo timeline storage', color: 'text-cyan-500', bg: 'bg-cyan-50' },
                            { icon: 'solar:calendar-bold-duotone', title: 'Appointments', desc: 'Prenatal visit tracking', color: 'text-indigo-500', bg: 'bg-indigo-50' },
                            { icon: 'solar:bag-bold-duotone', title: 'Hospital Bag', desc: '40+ item checklist', color: 'text-purple-500', bg: 'bg-purple-50' },
                            { icon: 'solar:export-bold-duotone', title: 'Data Export', desc: 'CSV and summary exports', color: 'text-slate-500', bg: 'bg-slate-50' },
                        ].map(({ icon, title, desc, color, bg }) => (
                            <div key={title} className="glass-card p-8 group hover:border-purple-200">
                                <div className={`w-16 h-16 rounded-2xl ${bg} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                                    <Icon icon={icon} className={`text-4xl ${color}`} />
                                </div>
                                <h3 className="font-bold text-slate-900 text-xl mb-3 group-hover:text-purple-600 transition-colors">{title}</h3>
                                <p className="text-slate-500 leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="glass-card p-12 bg-gradient-to-br from-purple-600 to-pink-600 border-none text-white shadow-2xl shadow-purple-500/30 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                        <div className="relative z-10">
                            <h2 className="text-4xl font-bold mb-6">Ready to Start Tracking?</h2>
                            <p className="text-xl mb-10 text-purple-100">Join thousands of parents tracking their journey today.</p>
                            <Link
                                href="/app"
                                className="inline-block bg-white text-purple-600 font-bold py-4 px-10 rounded-xl hover:bg-purple-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg"
                            >
                                Get Started Free →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white/50 border-t border-slate-200 py-12 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-4 opacity-80">
                        <Icon icon="solar:heart-bold" className="text-pink-500" />
                        <span className="font-bold text-slate-700">Gestimate</span>
                    </div>
                    <p className="text-slate-500 mb-6">© {new Date().getFullYear()} Gestimate. Built with love for expecting parents.</p>
                    <div className="flex gap-6 justify-center">
                        <Link href="/privacy" className="text-slate-400 hover:text-purple-600 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="text-slate-400 hover:text-purple-600 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
