/**
 * Gestimate Core - Hospital Bag Checklist
 */

import type { HospitalBagItem } from './types';

export const DEFAULT_HOSPITAL_BAG: Omit<HospitalBagItem, 'packed'>[] = [
    // For Mom
    { id: 'mom-1', category: 'mom', name: 'Insurance Card & ID', isCustom: false },
    { id: 'mom-2', category: 'mom', name: 'Birth Plan Copies', isCustom: false },
    { id: 'mom-3', category: 'mom', name: 'Comfortable Robe', isCustom: false },
    { id: 'mom-4', category: 'mom', name: 'Slippers', isCustom: false },
    { id: 'mom-5', category: 'mom', name: 'Nursing Bras', isCustom: false },
    { id: 'mom-6', category: 'mom', name: 'Comfortable Underwear', isCustom: false },
    { id: 'mom-7', category: 'mom', name: 'Toiletries', isCustom: false },
    { id: 'mom-8', category: 'mom', name: 'Hair Ties', isCustom: false },
    { id: 'mom-9', category: 'mom', name: 'Lip Balm', isCustom: false },
    { id: 'mom-10', category: 'mom', name: 'Phone Charger', isCustom: false },
    { id: 'mom-11', category: 'mom', name: 'Going Home Outfit', isCustom: false },
    { id: 'mom-12', category: 'mom', name: 'Snacks', isCustom: false },

    // For Baby  
    { id: 'baby-1', category: 'baby', name: 'Going Home Outfit', isCustom: false },
    { id: 'baby-2', category: 'baby', name: 'Onesies (2-3)', isCustom: false },
    { id: 'baby-3', category: 'baby', name: 'Socks or Booties', isCustom: false },
    { id: 'baby-4', category: 'baby', name: 'Hat', isCustom: false },
    { id: 'baby-5', category: 'baby', name: 'Swaddle Blanket', isCustom: false },
    { id: 'baby-6', category: 'baby', name: 'Receiving Blanket', isCustom: false },
    { id: 'baby-7', category: 'baby', name: 'Car Seat (Installed)', isCustom: false },
    { id: 'baby-8', category: 'baby', name: 'Diapers (Newborn)', isCustom: false },
    { id: 'baby-9', category: 'baby', name: 'Pacifier (Optional)', isCustom: false },

    // For Partner
    { id: 'partner-1', category: 'partner', name: 'Change of Clothes', isCustom: false },
    { id: 'partner-2', category: 'partner', name: 'Toiletries', isCustom: false },
    { id: 'partner-3', category: 'partner', name: 'Phone Charger', isCustom: false },
    { id: 'partner-4', category: 'partner', name: 'Snacks', isCustom: false },
    { id: 'partner-5', category: 'partner', name: 'Entertainment (Book, Tablet)', isCustom: false },
    { id: 'partner-6', category: 'partner', name: 'Pillow', isCustom: false },
    { id: 'partner-7', category: 'partner', name: 'Cash for Parking', isCustom: false },

    // Documents
    { id: 'docs-1', category: 'documents', name: 'Insurance Information', isCustom: false },
    { id: 'docs-2', category: 'documents', name: 'Photo ID', isCustom: false },
    { id: 'docs-3', category: 'documents', name: 'Hospital Pre-Registration Forms', isCustom: false },
    { id: 'docs-4', category: 'documents', name: 'Birth Plan', isCustom: false },
    { id: 'docs-5', category: 'documents', name: 'List of Emergency Contacts', isCustom: false },
];

/**
 * Initialize hospital bag with all items unpacked
 */
export function initializeHospitalBag(): HospitalBagItem[] {
    return DEFAULT_HOSPITAL_BAG.map(item => ({ ...item, packed: false }));
}

/**
 * Toggle item packed status
 */
export function toggleItemPacked(items: HospitalBagItem[], itemId: string): HospitalBagItem[] {
    return items.map(item =>
        item.id === itemId ? { ...item, packed: !item.packed } : item
    );
}

/**
 * Add custom item
 */
export function addCustomItem(
    items: HospitalBagItem[],
    name: string,
    category: HospitalBagItem['category']
): HospitalBagItem[] {
    const newItem: HospitalBagItem = {
        id: `custom-${Date.now()}`,
        category,
        name,
        packed: false,
        isCustom: true,
    };
    return [...items, newItem];
}

/**
 * Get items by category
 */
export function getItemsByCategory(items: HospitalBagItem[], category: HospitalBagItem['category']): HospitalBagItem[] {
    return items.filter(item => item.category === category);
}

/**
 * Get packing progress percentage
 */
export function getPackingProgress(items: HospitalBagItem[]): number {
    if (items.length === 0) return 0;
    const packed = items.filter(item => item.packed).length;
    return Math.round((packed / items.length) * 100);
}

/**
 * Category labels
 */
export const CATEGORY_LABELS: Record<HospitalBagItem['category'], { label: string; emoji: string }> = {
    mom: { label: 'For Mom', emoji: '👩' },
    baby: { label: 'For Baby', emoji: '👶' },
    partner: { label: 'For Partner', emoji: '💑' },
    documents: { label: 'Documents', emoji: '📄' },
};
