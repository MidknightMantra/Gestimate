/**
 * Gestimate Core - Pregnancy Calculator
 * 
 * Medical-grade pregnancy calculations with support for:
 * - LMP (Last Menstrual Period)
 * - Conception Date
 * - IVF 3-Day Transfer
 * - IVF 5-Day Transfer
 * - Ultrasound-adjusted
 */

import type { CalculationMethod, PregnancyInput, PregnancyResult } from './types';

const PREGNANCY_DURATION_DAYS = 280; // 40 weeks
const MS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * Calculate due date based on input method
 */
export function calculateDueDate(input: PregnancyInput): Date {
    const inputDate = new Date(input.date);

    switch (input.method) {
        case 'lmp':
            // Due date = LMP + 280 days
            return new Date(inputDate.getTime() + PREGNANCY_DURATION_DAYS * MS_PER_DAY);

        case 'conception':
            // Due date = Conception + 266 days (38 weeks)
            return new Date(inputDate.getTime() + 266 * MS_PER_DAY);

        case 'ivf3':
            // IVF 3-day: Transfer date + 263 days
            return new Date(inputDate.getTime() + 263 * MS_PER_DAY);

        case 'ivf5':
            // IVF 5-day (blastocyst): Transfer date + 261 days
            return new Date(inputDate.getTime() + 261 * MS_PER_DAY);

        case 'ultrasound':
            // Direct due date from ultrasound
            return inputDate;

        default:
            throw new Error(`Invalid calculation method: ${input.method}`);
    }
}

/**
 * Calculate conception date from due date or LMP
 */
export function calculateConceptionDate(dueDate: Date): Date {
    return new Date(dueDate.getTime() - 266 * MS_PER_DAY);
}

/**
 * Calculate LMP from due date
 */
export function calculateLMP(dueDate: Date): Date {
    return new Date(dueDate.getTime() - PREGNANCY_DURATION_DAYS * MS_PER_DAY);
}

/**
 * Get current trimester (1, 2, or 3)
 */
export function getTrimester(weekNumber: number): 1 | 2 | 3 {
    if (weekNumber <= 12) return 1;
    if (weekNumber <= 27) return 2;
    return 3;
}

/**
 * Format gestational age as "X weeks, Y days"
 */
export function formatGestationalAge(weeks: number, days: number): string {
    if (weeks === 1 && days === 1) return '1 week, 1 day';
    if (weeks === 1) return `1 week, ${days} days`;
    if (days === 1) return `${weeks} weeks, 1 day`;
    return `${weeks} weeks, ${days} days`;
}

/**
 * Calculate complete pregnancy result from input
 */
export function calculatePregnancy(input: PregnancyInput): PregnancyResult {
    const dueDate = calculateDueDate(input);
    const conceptionDate = calculateConceptionDate(dueDate);
    const lmp = calculateLMP(dueDate);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const daysElapsed = Math.floor((today.getTime() - lmp.getTime()) / MS_PER_DAY);
    const daysRemaining = Math.max(0, Math.floor((dueDate.getTime() - today.getTime()) / MS_PER_DAY));

    // Calculate weeks and days
    const currentWeek = Math.floor(daysElapsed / 7);
    const currentDay = daysElapsed % 7;

    // Clamp to valid range (1-42 weeks)
    const clampedWeek = Math.max(1, Math.min(42, currentWeek));

    const percentComplete = Math.min(100, Math.round((daysElapsed / PREGNANCY_DURATION_DAYS) * 100));

    return {
        dueDate,
        conceptionDate,
        currentWeek: clampedWeek,
        currentDay,
        trimester: getTrimester(clampedWeek),
        daysRemaining,
        daysElapsed,
        percentComplete,
        gestationalAge: formatGestationalAge(clampedWeek, currentDay),
    };
}

/**
 * Get method description for UI
 */
export function getMethodDescription(method: CalculationMethod): string {
    const descriptions: Record<CalculationMethod, string> = {
        lmp: 'First day of your last menstrual period',
        conception: 'Date when conception occurred',
        ivf3: 'Date of 3-day embryo transfer',
        ivf5: 'Date of 5-day blastocyst transfer',
        ultrasound: 'Due date from ultrasound',
    };
    return descriptions[method];
}

/**
 * Get all available calculation methods
 */
export function getCalculationMethods(): Array<{ id: CalculationMethod; name: string; description: string }> {
    return [
        { id: 'lmp', name: 'Last Menstrual Period', description: 'First day of your last period' },
        { id: 'conception', name: 'Conception Date', description: 'If you know when you conceived' },
        { id: 'ivf3', name: 'IVF 3-Day Transfer', description: 'For 3-day embryo transfer' },
        { id: 'ivf5', name: 'IVF 5-Day Transfer', description: 'For 5-day blastocyst transfer' },
        { id: 'ultrasound', name: 'Ultrasound', description: 'Due date from your doctor' },
    ];
}
