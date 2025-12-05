/**
 * Gestimate Core - Public API
 * All exports for pregnancy tracking functionality
 */

// Types
export * from './types';

// Calculator
export {
    calculatePregnancy,
    calculateDueDate,
    calculateConceptionDate,
    calculateLMP,
    getTrimester,
    formatGestationalAge,
    getMethodDescription,
    getCalculationMethods,
} from './calculator';

// Milestones
export { MILESTONES, getMilestone, getFruitEmoji } from './milestones';

// Weight
export {
    calculateBMI,
    getBMICategory,
    getRecommendedGain,
    getExpectedGainForWeek,
    isWeightHealthy,
    formatWeightChange,
} from './weight';

// Kicks
export {
    startKickSession,
    addKick,
    isGoalReached,
    formatDuration,
    getKickProgress,
} from './kicks';

// Contractions
export {
    startContractionSession,
    startContraction,
    endContraction,
    addContractionToSession,
    check511Rule,
    getAverageFrequency,
    getAverageDuration,
    formatContractionDuration,
} from './contractions';

// Hospital Bag
export {
    DEFAULT_HOSPITAL_BAG,
    initializeHospitalBag,
    toggleItemPacked,
    addCustomItem,
    getItemsByCategory,
    getPackingProgress,
    CATEGORY_LABELS,
} from './hospital-bag';
