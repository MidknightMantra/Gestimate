/**
 * Gestimate Core - Kick Counter
 */

import type { KickSession } from './types';

const KICK_GOAL = 10;

/**
 * Start a new kick counting session
 */
export function startKickSession(userId: string, weekNumber?: number): KickSession {
    return {
        userId,
        startTime: new Date(),
        kickCount: 0,
        durationSeconds: 0,
        weekNumber,
    };
}

/**
 * Add a kick to the session
 */
export function addKick(session: KickSession): KickSession {
    const now = new Date();
    const durationSeconds = Math.floor((now.getTime() - session.startTime.getTime()) / 1000);
    const newCount = session.kickCount + 1;

    return {
        ...session,
        kickCount: newCount,
        durationSeconds,
        endTime: newCount >= KICK_GOAL ? now : undefined,
    };
}

/**
 * Check if session goal is reached
 */
export function isGoalReached(session: KickSession): boolean {
    return session.kickCount >= KICK_GOAL;
}

/**
 * Format duration as MM:SS
 */
export function formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Get progress percentage
 */
export function getKickProgress(session: KickSession): number {
    return Math.min(100, (session.kickCount / KICK_GOAL) * 100);
}
