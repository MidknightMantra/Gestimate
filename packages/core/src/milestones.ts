/**
 * Gestimate Core - Weekly Milestones
 * Complete data for all 40 weeks of pregnancy
 */

import type { WeeklyMilestone } from './types';

export const MILESTONES: WeeklyMilestone[] = [
    { week: 1, fruit: 'Poppy Seed', size: '< 1mm', weight: 'Microscopic', development: 'Fertilization occurs. The journey begins!', tips: ['Start prenatal vitamins', 'Avoid alcohol and smoking'] },
    { week: 2, fruit: 'Poppy Seed', size: '< 1mm', weight: 'Microscopic', development: 'Egg implants in uterine wall.', tips: ['Track your cycle', 'Eat folate-rich foods'] },
    { week: 3, fruit: 'Sesame Seed', size: '1-2mm', weight: 'Microscopic', development: 'Embryo forms three layers of cells.', tips: ['Rest well', 'Stay hydrated'] },
    { week: 4, fruit: 'Sesame Seed', size: '2mm', weight: 'Microscopic', development: 'Neural tube forming. Heart begins to beat!', tips: ['Schedule first prenatal visit', 'Avoid raw fish'] },
    { week: 5, fruit: 'Apple Seed', size: '3mm', weight: 'Microscopic', development: 'Major organs starting to form.', tips: ['Morning sickness may start', 'Eat small frequent meals'] },
    { week: 6, fruit: 'Sweet Pea', size: '6mm', weight: '< 1g', development: 'Facial features beginning. Heart beats 150 bpm!', tips: ['Stay active', 'Get enough sleep'] },
    { week: 7, fruit: 'Blueberry', size: '1.3cm', weight: '< 1g', development: 'Arms and legs forming. Brain growing rapidly.', tips: ['Eat protein-rich foods', 'Avoid caffeine excess'] },
    { week: 8, fruit: 'Raspberry', size: '1.6cm', weight: '1g', development: 'Fingers and toes developing. Moving around!', tips: ['First ultrasound possible', 'Take it easy'] },
    { week: 9, fruit: 'Cherry', size: '2.3cm', weight: '2g', development: 'All organs present. Looking more human!', tips: ['Mood changes are normal', 'Talk to your partner'] },
    { week: 10, fruit: 'Kumquat', size: '3.1cm', weight: '4g', development: 'Vital organs functioning. Swallowing fluid.', tips: ['Eat calcium-rich foods', 'Exercise gently'] },
    { week: 11, fruit: 'Fig', size: '4.1cm', weight: '7g', development: 'Bones hardening. Tooth buds forming.', tips: ['Second trimester approaching', 'Energy may return soon'] },
    { week: 12, fruit: 'Lime', size: '5.4cm', weight: '14g', development: 'Reflexes developing. Can open/close fingers!', tips: ['NT scan typically done now', 'Share news with family?'] },
    { week: 13, fruit: 'Lemon', size: '7.4cm', weight: '23g', development: 'Fingerprints forming. Vocal cords developing.', tips: ['2nd trimester begins!', 'Appetite may increase'] },
    { week: 14, fruit: 'Peach', size: '8.7cm', weight: '43g', development: 'Can make facial expressions. Hair growing.', tips: ['Energy returning', 'Great time for exercise'] },
    { week: 15, fruit: 'Apple', size: '10.1cm', weight: '70g', development: 'Skeleton visible on ultrasound. Legs longer than arms.', tips: ['Feeling better?', 'Stay active'] },
    { week: 16, fruit: 'Avocado', size: '11.6cm', weight: '100g', development: 'Can hear sounds! Eyes moving.', tips: ['You might feel movement soon', 'Talk to baby'] },
    { week: 17, fruit: 'Pear', size: '13cm', weight: '140g', development: 'Skeleton hardening. Sweat glands forming.', tips: ['Stay hydrated', 'Eat iron-rich foods'] },
    { week: 18, fruit: 'Bell Pepper', size: '14.2cm', weight: '190g', development: 'Can yawn and hiccup! Ears in final position.', tips: ['Feeling kicks?', 'Anatomy scan soon'] },
    { week: 19, fruit: 'Mango', size: '15.3cm', weight: '240g', development: 'Vernix coating forming. Senses developing.', tips: ['Sleep on your side', 'Anatomy ultrasound'] },
    { week: 20, fruit: 'Banana', size: '16.4cm', weight: '300g', development: 'Halfway there! Can taste flavors.', tips: ['Celebrate halfway!', 'Gender reveal possible'] },
    { week: 21, fruit: 'Carrot', size: '26.7cm', weight: '360g', development: 'Eyebrows and eyelids present. Active movement.', tips: ['Partner can feel kicks', 'Start nursery planning'] },
    { week: 22, fruit: 'Papaya', size: '27.8cm', weight: '430g', development: 'Lips and eyelids more distinct. Grip strengthening.', tips: ['Back pain may start', 'Practice good posture'] },
    { week: 23, fruit: 'Grapefruit', size: '28.9cm', weight: '500g', development: 'Lungs practicing breathing. Skin becoming opaque.', tips: ['Viability milestone!', 'Sign up for classes'] },
    { week: 24, fruit: 'Corn', size: '30cm', weight: '600g', development: 'Inner ear fully developed. Can respond to sounds.', tips: ['Glucose test soon', 'Rest when needed'] },
    { week: 25, fruit: 'Cauliflower', size: '34.6cm', weight: '660g', development: 'Baby learning to breathe. Fat deposits forming.', tips: ['Third trimester soon', 'Tour the hospital'] },
    { week: 26, fruit: 'Lettuce', size: '35.6cm', weight: '760g', development: 'Eyes can open! Immune system developing.', tips: ['Braxton Hicks may start', 'Stay comfortable'] },
    { week: 27, fruit: 'Cauliflower', size: '36.6cm', weight: '875g', development: 'Brain very active. Sleep cycles established.', tips: ['3rd trimester begins!', 'Pack hospital bag soon'] },
    { week: 28, fruit: 'Eggplant', size: '37.6cm', weight: '1kg', development: 'Eyes can blink. Dreaming during sleep.', tips: ['Doctor visits more frequent', 'Count kicks daily'] },
    { week: 29, fruit: 'Butternut Squash', size: '38.6cm', weight: '1.15kg', development: 'Bones fully developed. Muscles and lungs maturing.', tips: ['Rest feet often', 'Avoid long standing'] },
    { week: 30, fruit: 'Cabbage', size: '39.9cm', weight: '1.3kg', development: 'Strong grip. Eyesight improving.', tips: ['Feeling crowded?', 'Practice breathing exercises'] },
    { week: 31, fruit: 'Coconut', size: '41.1cm', weight: '1.5kg', development: 'Brain developing rapidly. Processing information.', tips: ['Heartburn common', 'Eat smaller meals'] },
    { week: 32, fruit: 'Squash', size: '42.4cm', weight: '1.7kg', development: 'Toenails visible. Bones hardening.', tips: ['Prepare for baby!', 'Finalize birth plan'] },
    { week: 33, fruit: 'Pineapple', size: '43.7cm', weight: '1.9kg', development: 'Skull soft for delivery. Immune system maturing.', tips: ['Shortness of breath?', 'Baby is dropping down'] },
    { week: 34, fruit: 'Cantaloupe', size: '45cm', weight: '2.1kg', development: 'Central nervous system maturing. Fingernails grown.', tips: ['Fatigue is normal', 'Rest when you can'] },
    { week: 35, fruit: 'Honeydew', size: '46.2cm', weight: '2.4kg', development: 'Kidneys fully developed. Liver processing waste.', tips: ['Pack your bag!', 'Install car seat'] },
    { week: 36, fruit: 'Romaine Lettuce', size: '47.4cm', weight: '2.6kg', development: 'Shedding downy hair. Getting into position.', tips: ['Weekly appointments start', 'Rest up!'] },
    { week: 37, fruit: 'Swiss Chard', size: '48.6cm', weight: '2.9kg', development: 'Considered early term! Lungs ready.', tips: ['Full term next week!', 'Know labor signs'] },
    { week: 38, fruit: 'Leek', size: '49.8cm', weight: '3kg', development: 'Full term! Organs fully mature.', tips: ['Any day now!', 'Stay close to home'] },
    { week: 39, fruit: 'Watermelon', size: '50.7cm', weight: '3.3kg', development: 'Brain still developing. Ready for birth!', tips: ['Patience!', 'Relax and rest'] },
    { week: 40, fruit: 'Pumpkin', size: '51.2cm', weight: '3.5kg', development: 'Due date! Baby is fully ready.', tips: ['Due date is here!', 'Trust your body'] },
    { week: 41, fruit: 'Pumpkin', size: '51.5cm', weight: '3.6kg', development: 'Still healthy! Doctor monitoring closely.', tips: ['Stay in touch with doctor', 'Induction may be discussed'] },
    { week: 42, fruit: 'Pumpkin', size: '52cm', weight: '3.7kg', development: 'Post-term. Induction likely.', tips: ['Follow doctor advice', 'Almost there!'] },
];

/**
 * Get milestone for specific week
 */
export function getMilestone(week: number): WeeklyMilestone | undefined {
    return MILESTONES.find(m => m.week === week);
}

/**
 * Get fruit emoji for a given fruit name
 */
export function getFruitEmoji(fruit: string): string {
    const emojiMap: Record<string, string> = {
        'Poppy Seed': '🌱', 'Sesame Seed': '🌱', 'Apple Seed': '🍎', 'Sweet Pea': '🫛',
        'Blueberry': '🫐', 'Raspberry': '🍇', 'Cherry': '🍒', 'Kumquat': '🍊',
        'Fig': '🍐', 'Lime': '🍋', 'Lemon': '🍋', 'Peach': '🍑', 'Apple': '🍎',
        'Avocado': '🥑', 'Pear': '🍐', 'Bell Pepper': '🫑', 'Mango': '🥭',
        'Banana': '🍌', 'Carrot': '🥕', 'Papaya': '🥭', 'Grapefruit': '🍊',
        'Corn': '🌽', 'Cauliflower': '🥦', 'Lettuce': '🥬', 'Eggplant': '🍆',
        'Butternut Squash': '🎃', 'Cabbage': '🥬', 'Coconut': '🥥', 'Squash': '🎃',
        'Pineapple': '🍍', 'Cantaloupe': '🍈', 'Honeydew': '🍈', 'Romaine Lettuce': '🥬',
        'Swiss Chard': '🥬', 'Leek': '🥬', 'Watermelon': '🍉', 'Pumpkin': '🎃',
    };
    return emojiMap[fruit] || '🍎';
}
