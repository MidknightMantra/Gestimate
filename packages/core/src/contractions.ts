/**
 * Gestimate Core - Contraction Timer
 * 5-1-1 Rule: Contractions 5 min apart, 1 min long, for 1 hour
 */

import type { Contraction, ContractionSession } from './types';

/**
 * Start a new contraction session
 */
export function startContractionSession(userId: string): ContractionSession {
    return {
        userId,
        contractions: [],
        startedAt: new Date(),
        is511Alert: false,
    };
}

/**
 * Start a contraction
 */
export function startContraction(): Contraction {
    return {
        startTime: new Date(),
        durationSeconds: 0,
    };
}

/**
 * End a contraction
 */
export function endContraction(contraction: Contraction): Contraction {
    const endTime = new Date();
    const durationSeconds = Math.floor((endTime.getTime() - contraction.startTime.getTime()) / 1000);
    return {
        ...contraction,
        endTime,
        durationSeconds,
    };
}

/**
 * Add a completed contraction to session
 */
export function addContractionToSession(
    session: ContractionSession,
    contraction: Contraction
): ContractionSession {
    const newContractions = [...session.contractions, contraction];
    return {
        ...session,
        contractions: newContractions,
        is511Alert: check511Rule(newContractions),
    };
}

/**
 * Check if 5-1-1 rule is met
 * 5 mins apart, 1 min long, for 1 hour (at least 12 contractions)
 */
export function check511Rule(contractions: Contraction[]): boolean {
    if (contractions.length < 12) return false;

    const recentContractions = contractions.slice(-12);

    // Check duration (average >= 60 seconds)
    const avgDuration = recentContractions.reduce((sum, c) => sum + c.durationSeconds, 0) / 12;
    if (avgDuration < 55) return false; // Allow some flexibility

    // Check frequency (average <= 5 minutes apart)
    let totalGap = 0;
    for (let i = 1; i < recentContractions.length; i++) {
        const gap = recentContractions[i].startTime.getTime() -
            (recentContractions[i - 1].endTime?.getTime() || recentContractions[i - 1].startTime.getTime());
        totalGap += gap;
    }
    const avgGapMinutes = (totalGap / 11) / (1000 * 60);

    return avgGapMinutes <= 6; // Allow some flexibility
}

/**
 * Get average frequency in minutes
 */
export function getAverageFrequency(contractions: Contraction[]): number | null {
    if (contractions.length < 2) return null;

    const recent = contractions.slice(-6);
    let totalGap = 0;

    for (let i = 1; i < recent.length; i++) {
        const prevEnd = recent[i - 1].endTime?.getTime() || recent[i - 1].startTime.getTime();
        const gap = recent[i].startTime.getTime() - prevEnd;
        totalGap += gap;
    }

    return (totalGap / (recent.length - 1)) / (1000 * 60);
}

/**
 * Get average duration in seconds
 */
export function getAverageDuration(contractions: Contraction[]): number | null {
    if (contractions.length === 0) return null;
    const recent = contractions.slice(-6);
    return recent.reduce((sum, c) => sum + c.durationSeconds, 0) / recent.length;
}

/**
 * Format contraction duration
 */
export function formatContractionDuration(seconds: number): string {
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
}
