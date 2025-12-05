/**
 * Gestimate Core - Weight Tracker
 * CDC/WHO recommended weight gain calculations
 */

import type { WeightConfig, WeightLog } from './types';

interface BMICategory {
    min: number;
    max: number;
    label: string;
    recommendedGainMin: number;
    recommendedGainMax: number;
}

const BMI_CATEGORIES: BMICategory[] = [
    { min: 0, max: 18.5, label: 'Underweight', recommendedGainMin: 12.5, recommendedGainMax: 18 },
    { min: 18.5, max: 25, label: 'Normal', recommendedGainMin: 11.5, recommendedGainMax: 16 },
    { min: 25, max: 30, label: 'Overweight', recommendedGainMin: 7, recommendedGainMax: 11.5 },
    { min: 30, max: 100, label: 'Obese', recommendedGainMin: 5, recommendedGainMax: 9 },
];

/**
 * Calculate BMI from height (cm) and weight (kg)
 */
export function calculateBMI(height: number, weight: number): number {
    const heightM = height / 100;
    return weight / (heightM * heightM);
}

/**
 * Get BMI category
 */
export function getBMICategory(bmi: number): BMICategory {
    return BMI_CATEGORIES.find(c => bmi >= c.min && bmi < c.max) || BMI_CATEGORIES[1];
}

/**
 * Get recommended weight gain range based on pre-pregnancy BMI
 */
export function getRecommendedGain(config: WeightConfig): { min: number; max: number; category: string } {
    const bmi = calculateBMI(config.height, config.prePregnancyWeight);
    const category = getBMICategory(bmi);
    return {
        min: category.recommendedGainMin,
        max: category.recommendedGainMax,
        category: category.label,
    };
}

/**
 * Calculate expected weight gain for a specific week
 */
export function getExpectedGainForWeek(config: WeightConfig, week: number): { min: number; max: number } {
    const { min, max } = getRecommendedGain(config);

    // First trimester (weeks 1-12): 0.5-2kg total
    if (week <= 12) {
        const firstTriGain = 1.5; // Average first tri gain
        const progress = week / 12;
        return { min: 0.5 * progress, max: firstTriGain * progress };
    }

    // Second and third trimester: Linear gain
    const remainingWeeks = 40 - 12;
    const remainingMinGain = min - 0.5;
    const remainingMaxGain = max - 2;
    const weeksSinceFirstTri = week - 12;
    const progress = weeksSinceFirstTri / remainingWeeks;

    return {
        min: 0.5 + (remainingMinGain * progress),
        max: 2 + (remainingMaxGain * progress),
    };
}

/**
 * Check if current weight is within healthy range
 */
export function isWeightHealthy(config: WeightConfig, currentWeight: number, week: number): 'low' | 'healthy' | 'high' {
    const gain = currentWeight - config.prePregnancyWeight;
    const expected = getExpectedGainForWeek(config, week);

    if (gain < expected.min) return 'low';
    if (gain > expected.max) return 'high';
    return 'healthy';
}

/**
 * Format weight change with + or - sign
 */
export function formatWeightChange(change: number): string {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(1)} kg`;
}
