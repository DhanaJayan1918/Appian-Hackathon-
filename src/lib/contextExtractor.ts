import type { CaseData } from './mockData';

export interface ExtractedContext {
    keywords: string[];
    entities: {
        location?: string;
        amount?: string;
        claimType?: string;
    };
    rawText: string;
}

/**
 * Case Context Extractor
 * Extracts relevant keywords and entities from the case data to guide knowledge retrieval.
 */
export const extractCaseContext = (caseData: CaseData): ExtractedContext => {
    const keywords = new Set<string>();

    // Extract from details
    if (caseData.details.claimType) keywords.add(caseData.details.claimType);
    if (caseData.details.location) {
        caseData.details.location.split(',').forEach(part => keywords.add(part.trim()));
    }

    // Simple regex for amount-like strings if needed, but we already have it in data
    if (caseData.details.amount) keywords.add(caseData.details.amount);

    // Extract from description (simple keyword extraction for demo)
    const commonWords = new Set(['the', 'and', 'was', 'for', 'with', 'this', 'that', 'from']);
    const descWords = caseData.details.description
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
        .split(/\s+/)
        .filter(word => word.length > 3 && !commonWords.has(word));

    descWords.forEach(word => keywords.add(word));

    return {
        keywords: Array.from(keywords),
        entities: {
            location: caseData.details.location,
            amount: caseData.details.amount,
            claimType: caseData.details.claimType,
        },
        rawText: `${caseData.details.claimType} in ${caseData.details.location}. ${caseData.details.description}`
    };
};
