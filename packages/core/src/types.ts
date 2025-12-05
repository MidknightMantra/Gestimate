/**
 * Gestimate Core - Pregnancy Calculator Types
 */

export type CalculationMethod =
    | 'lmp'           // Last Menstrual Period
    | 'conception'    // Known Conception Date
    | 'ivf3'          // IVF 3-Day Transfer
    | 'ivf5'          // IVF 5-Day Transfer
    | 'ultrasound';   // Ultrasound-adjusted

export interface PregnancyInput {
    method: CalculationMethod;
    date: Date;
}

export interface PregnancyResult {
    dueDate: Date;
    conceptionDate: Date;
    currentWeek: number;
    currentDay: number;
    trimester: 1 | 2 | 3;
    daysRemaining: number;
    daysElapsed: number;
    percentComplete: number;
    gestationalAge: string;
}

export interface WeeklyMilestone {
    week: number;
    fruit: string;
    size: string;
    weight: string;
    development: string;
    tips: string[];
}

export interface KickSession {
    id?: string;
    userId: string;
    startTime: Date;
    endTime?: Date;
    kickCount: number;
    durationSeconds: number;
    weekNumber?: number;
}

export interface WeightLog {
    id?: string;
    userId: string;
    weight: number;
    loggedAt: Date;
    weekNumber: number;
    notes?: string;
}

export interface WeightConfig {
    height: number;
    prePregnancyWeight: number;
}

export interface SymptomLog {
    id?: string;
    userId: string;
    symptomType: string;
    severity: 1 | 2 | 3 | 4 | 5;
    notes?: string;
    loggedAt: Date;
    weekNumber?: number;
}

export interface Contraction {
    startTime: Date;
    endTime?: Date;
    durationSeconds: number;
}

export interface ContractionSession {
    id?: string;
    userId: string;
    contractions: Contraction[];
    startedAt: Date;
    endedAt?: Date;
    is511Alert: boolean;
}

export interface Appointment {
    id?: string;
    userId: string;
    date: Date;
    type: 'visit' | 'ultrasound' | 'test' | 'class' | 'other';
    title: string;
    location?: string;
    provider?: string;
    notes?: string;
    completed: boolean;
}

export interface BabyName {
    id?: string;
    userId: string;
    name: string;
    category: 'boy' | 'girl' | 'neutral';
    origin?: string;
    meaning?: string;
    notes?: string;
    isFavorite: boolean;
}

export interface HospitalBagItem {
    id: string;
    category: 'mom' | 'baby' | 'partner' | 'documents';
    name: string;
    packed: boolean;
    isCustom: boolean;
}

export interface BirthPlanPreference {
    category: string;
    preference: string;
    selected: boolean;
}
