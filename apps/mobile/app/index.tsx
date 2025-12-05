import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
    calculatePregnancy,
    getCalculationMethods,
    getMilestone,
    getFruitEmoji,
    type CalculationMethod
} from '@gestimate/core';

export default function Home() {
    const [method, setMethod] = useState<CalculationMethod>('lmp');
    const [date, setDate] = useState('');
    const [result, setResult] = useState<ReturnType<typeof calculatePregnancy> | null>(null);

    const methods = getCalculationMethods();

    const handleCalculate = () => {
        if (!date) return;
        const [year, month, day] = date.split('-').map(Number);
        const pregnancy = calculatePregnancy({ method, date: new Date(year, month - 1, day) });
        setResult(pregnancy);
    };

    const milestone = result ? getMilestone(result.currentWeek) : null;

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.greeting}>Good Morning,</Text>
                    <Text style={styles.title}>Mama! 🌸</Text>
                    <Text style={styles.subtitle}>Ready to track your journey?</Text>
                </View>

                {/* Calculator Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardIcon}>🧮</Text>
                        <View>
                            <Text style={styles.cardTitle}>Pregnancy Calculator</Text>
                            <Text style={styles.cardSubtitle}>Calculate your due date</Text>
                        </View>
                    </View>

                    {/* Method Selection */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.methodScroll}>
                        {methods.map((m) => (
                            <TouchableOpacity
                                key={m.id}
                                onPress={() => setMethod(m.id)}
                                style={[styles.methodButton, method === m.id && styles.methodButtonActive]}
                            >
                                <Text style={[styles.methodText, method === m.id && styles.methodTextActive]}>
                                    {m.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Date Input */}
                    <Text style={styles.inputLabel}>
                        {method === 'lmp' ? 'First Day of Last Period' : 'Date'}
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="YYYY-MM-DD"
                        value={date}
                        onChangeText={setDate}
                        placeholderTextColor="#94a3b8"
                    />

                    <TouchableOpacity onPress={handleCalculate} style={styles.button}>
                        <Text style={styles.buttonText}>Calculate Timeline</Text>
                    </TouchableOpacity>

                    {/* Results */}
                    {result && (
                        <View style={styles.results}>
                            <View style={styles.dueDate}>
                                <Text style={styles.dueDateLabel}>ESTIMATED DUE DATE</Text>
                                <Text style={styles.dueDateValue}>
                                    {result.dueDate.toLocaleDateString(undefined, { dateStyle: 'long' })}
                                </Text>
                            </View>

                            <View style={styles.statsRow}>
                                <View style={styles.statCard}>
                                    <Text style={styles.statLabel}>Progress</Text>
                                    <Text style={styles.statValue}>{result.currentWeek}w {result.currentDay}d</Text>
                                </View>
                                <View style={styles.statCard}>
                                    <Text style={styles.statLabel}>Trimester</Text>
                                    <Text style={styles.statValuePink}>{result.trimester}</Text>
                                </View>
                            </View>

                            {milestone && (
                                <View style={styles.milestone}>
                                    <Text style={styles.fruitEmoji}>{getFruitEmoji(milestone.fruit)}</Text>
                                    <View style={styles.milestoneInfo}>
                                        <Text style={styles.milestoneTitle}>Size of a {milestone.fruit}</Text>
                                        <Text style={styles.milestoneDesc}>{milestone.development}</Text>
                                    </View>
                                </View>
                            )}
                        </View>
                    )}
                </View>

                {/* Features Grid */}
                {result && (
                    <View style={styles.featuresSection}>
                        <Text style={styles.featuresTitle}>Smart Tools</Text>
                        <View style={styles.featuresGrid}>
                            {[
                                { icon: '👣', label: 'Kicks' },
                                { icon: '⚖️', label: 'Weight' },
                                { icon: '🩺', label: 'Symptoms' },
                                { icon: '⏱️', label: 'Timer' },
                                { icon: '🎒', label: 'Bag' },
                                { icon: '📅', label: 'Visits' },
                                { icon: '👶', label: 'Names' },
                                { icon: '📷', label: 'Gallery' },
                                { icon: '📝', label: 'Plan' },
                            ].map((item, index) => (
                                <TouchableOpacity key={index} style={styles.featureCard}>
                                    <Text style={styles.featureIcon}>{item.icon}</Text>
                                    <Text style={styles.featureLabel}>{item.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}

                {/* Disclaimer */}
                <View style={styles.disclaimer}>
                    <Text style={styles.disclaimerText}>
                        ℹ️ <Text style={styles.disclaimerBold}>Medical Disclaimer: </Text>
                        This tool is for informational purposes only.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fdf4ff' },
    scroll: { flex: 1 },
    scrollContent: { paddingBottom: 100 },
    
    header: { paddingTop: 60, paddingHorizontal: 24, marginBottom: 24 },
    greeting: { fontSize: 28, fontWeight: 'bold', color: '#1e293b' },
    title: { fontSize: 28, fontWeight: 'bold', color: '#9333ea' },
    subtitle: { fontSize: 16, color: '#64748b', marginTop: 4 },
    
    card: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 24, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 4 },
    cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    cardIcon: { fontSize: 32, marginRight: 12, backgroundColor: '#f3e8ff', padding: 8, borderRadius: 12, overflow: 'hidden' },
    cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' },
    cardSubtitle: { fontSize: 12, color: '#64748b' },
    
    methodScroll: { marginBottom: 20 },
    methodButton: { paddingHorizontal: 16, paddingVertical: 10, marginRight: 8, backgroundColor: '#f8fafc', borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0' },
    methodButtonActive: { backgroundColor: '#9333ea', borderColor: '#9333ea' },
    methodText: { fontWeight: '600', color: '#475569' },
    methodTextActive: { color: '#fff' },
    
    inputLabel: { fontSize: 14, fontWeight: '600', color: '#475569', marginBottom: 8 },
    input: { backgroundColor: '#f8fafc', padding: 16, borderRadius: 12, fontSize: 16, borderWidth: 1, borderColor: '#e2e8f0', marginBottom: 16 },
    
    button: { backgroundColor: '#9333ea', borderRadius: 12, paddingVertical: 16, alignItems: 'center' },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    
    results: { marginTop: 24, paddingTop: 24, borderTopWidth: 1, borderTopColor: '#f1f5f9' },
    dueDate: { alignItems: 'center', marginBottom: 20 },
    dueDateLabel: { fontSize: 10, fontWeight: 'bold', color: '#9333ea', letterSpacing: 2 },
    dueDateValue: { fontSize: 24, fontWeight: 'bold', color: '#1e293b', marginTop: 4 },
    
    statsRow: { flexDirection: 'row', gap: 12 },
    statCard: { flex: 1, backgroundColor: '#f8fafc', padding: 16, borderRadius: 16, alignItems: 'center' },
    statLabel: { fontSize: 12, color: '#64748b', marginBottom: 4 },
    statValue: { fontSize: 18, fontWeight: 'bold', color: '#9333ea' },
    statValuePink: { fontSize: 18, fontWeight: 'bold', color: '#ec4899' },
    
    milestone: { flexDirection: 'row', alignItems: 'center', marginTop: 16, backgroundColor: '#f8fafc', padding: 16, borderRadius: 16 },
    fruitEmoji: { fontSize: 48 },
    milestoneInfo: { flex: 1, marginLeft: 16 },
    milestoneTitle: { fontSize: 16, fontWeight: 'bold', color: '#1e293b' },
    milestoneDesc: { fontSize: 14, color: '#475569', marginTop: 4, lineHeight: 20 },
    
    featuresSection: { marginTop: 24, paddingHorizontal: 16 },
    featuresTitle: { fontSize: 20, fontWeight: 'bold', color: '#1e293b', marginBottom: 16, paddingHorizontal: 8 },
    featuresGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    featureCard: { width: '31%', backgroundColor: '#fff', padding: 16, borderRadius: 16, alignItems: 'center', marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
    featureIcon: { fontSize: 28, marginBottom: 8 },
    featureLabel: { fontSize: 12, fontWeight: '600', color: '#475569' },
    
    disclaimer: { margin: 16, padding: 16, backgroundColor: '#fef3c7', borderRadius: 16 },
    disclaimerText: { fontSize: 12, color: '#92400e', lineHeight: 18 },
    disclaimerBold: { fontWeight: 'bold' },
});
