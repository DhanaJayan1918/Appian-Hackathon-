import { knowledgeBase } from './mockData';
import type { KnowledgeArticle } from './mockData';
import type { ExtractedContext } from './contextExtractor';

/**
 * Knowledge Retrieval Engine (RAG)
 * Searches the knowledge base using extracted context or explicit queries.
 */
export const retrieveKnowledge = (
    context: ExtractedContext | string,
    limit: number = 3
): KnowledgeArticle[] => {
    let queryKeywords: string[] = [];

    if (typeof context === 'string') {
        queryKeywords = context.toLowerCase().split(/\s+/).filter(k => k.length > 2);
    } else {
        queryKeywords = context.keywords.map(k => k.toLowerCase());
    }

    // Scoring based on keyword matches
    const scored = knowledgeBase.map(article => {
        let score = 0;
        const articleText = `${article.title} ${article.summary} ${article.category} ${article.relevanceTrigger.join(' ')}`.toLowerCase();

        queryKeywords.forEach(keyword => {
            if (articleText.includes(keyword)) {
                score += 1;
            }
            // Higher weight for triggers
            if (article.relevanceTrigger.some(t => t.toLowerCase() === keyword)) {
                score += 2;
            }
        });

        return { article, score };
    });

    return scored
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(item => item.article);
};
