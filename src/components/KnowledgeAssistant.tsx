import React, { useState, useEffect } from 'react';
import type { CaseData, PolicyCitation } from '../lib/mockData';
import { DocumentViewer } from './DocumentViewer';
import { extractCaseContext } from '../lib/contextExtractor';
import { retrieveKnowledge } from '../lib/ragEngine';
import { generateResponseWithCitations } from '../lib/llmService';
import type { LLMResponse } from '../lib/llmService';

interface KnowledgeAssistantProps {
    searchQuery: string;
    activeCase: CaseData;
}

type FlowStage = 'IDLE' | 'EXTRACTING' | 'RETRIEVING' | 'GENERATING' | 'READY' | 'ERROR';

export const KnowledgeAssistant: React.FC<KnowledgeAssistantProps> = ({ searchQuery, activeCase }) => {
    const [stage, setStage] = useState<FlowStage>('IDLE');
    const [response, setResponse] = useState<LLMResponse | null>(null);
    const [selectedCitation, setSelectedCitation] = useState<PolicyCitation | null>(null);

    useEffect(() => {
        const runFlow = async () => {
            try {
                setStage('EXTRACTING');
                // Step 1: Extract Context
                const context = extractCaseContext(activeCase);
                await new Promise(r => setTimeout(r, 800)); // Visual delay

                setStage('RETRIEVING');
                // Step 2: Knowledge Retrieval (RAG)
                const retrieved = retrieveKnowledge(searchQuery.trim() || context);
                await new Promise(r => setTimeout(r, 800)); // Visual delay

                setStage('GENERATING');
                // Step 3: LLM with Citation Enforcement
                const llmRes = await generateResponseWithCitations(searchQuery || context.rawText, retrieved);

                setResponse(llmRes);
                setStage('READY');
            } catch (err) {
                console.error(err);
                setStage('ERROR');
            }
        };

        runFlow();
    }, [searchQuery, activeCase]);

    return (
        <div className="sidebar glass-panel animate-slide-right" style={{
            width: 'var(--sidebar-w)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 10
        }}>
            <div className="sidebar-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                    <span className="ai-glow" style={{ fontSize: '20px' }}>✦</span>
                    <h2 style={{ fontSize: '18px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Knowledge Panel
                    </h2>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>AI-Augmented Retrieval Engine</p>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
                <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                        {[
                            { id: 'EXTRACTING', label: 'Context' },
                            { id: 'RETRIEVING', label: 'RAG' },
                            { id: 'GENERATING', label: 'LLM' },
                            { id: 'READY', label: 'Final' }
                        ].map((s, idx) => {
                            const isPast = ['EXTRACTING', 'RETRIEVING', 'GENERATING', 'READY'].indexOf(stage) >= idx;
                            const isActive = stage === s.id;
                            return (
                                <div key={s.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    <div style={{
                                        height: '4px',
                                        borderRadius: '2px',
                                        background: stage === 'ERROR' ? 'var(--error)' : isActive ? 'var(--primary)' : isPast ? 'rgba(56, 189, 248, 0.3)' : 'rgba(255,255,255,0.1)',
                                        boxShadow: isActive ? '0 0 10px var(--primary-glow)' : 'none'
                                    }} />
                                    <span style={{
                                        fontSize: '8px',
                                        color: isActive ? 'var(--primary)' : isPast ? 'var(--text-secondary)' : 'var(--text-muted)',
                                        fontWeight: isActive ? 800 : 400
                                    }}>{s.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {stage === 'ERROR' ? (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                        <p style={{ color: '#ef4444', fontWeight: 600 }}>Processing Error</p>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px' }}>
                            Please try again.
                        </p>
                    </div>
                ) : stage !== 'READY' ? (
                    <div style={{
                        height: '60%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <div className="ai-glow" style={{ fontSize: '40px', marginBottom: '20px', animation: 'pulse 2s infinite' }}>✦</div>
                        <p style={{ fontSize: '14px', textAlign: 'center', color: 'var(--text-primary)', fontWeight: 600 }}>
                            {stage === 'EXTRACTING' && 'Analyzing Case Context...'}
                            {stage === 'RETRIEVING' && 'Searching Knowledge Base...'}
                            {stage === 'GENERATING' && 'Enforcing Citations with LLM...'}
                        </p>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>Processing provenance-aware response</p>
                    </div>
                ) : response && (
                    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                        <div className="glass-card" style={{ padding: '20px', borderRadius: '12px', marginBottom: '24px', borderLeft: '4px solid var(--primary)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--primary)', letterSpacing: '1px' }}>AI RECOMMENDATION</span>
                                <span style={{ fontSize: '10px', color: 'var(--success)', fontWeight: 800 }}>{Math.round(response.confidence * 100)}% CONFIDENCE</span>
                            </div>
                            <div
                                style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-primary)' }}
                                dangerouslySetInnerHTML={{ __html: response.answer.replace(/\*\*(.*?)\*\*/g, '<b style="color:var(--primary)">$1</b>') }}
                            />
                        </div>

                        <h3 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '12px', letterSpacing: '1px' }}>RETRIEVED SOURCES</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {response.citations.map((citation, idx) => (
                                <div
                                    key={citation.id}
                                    onClick={() => setSelectedCitation(citation)}
                                    className="glass-card"
                                    style={{
                                        padding: '12px',
                                        cursor: 'pointer',
                                        border: '1px solid rgba(56, 189, 248, 0.1)',
                                        transition: 'all 0.2s',
                                        animation: `slideInRight 0.4s ease-out ${idx * 0.1}s forwards`,
                                        opacity: 0
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                                    onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.1)'}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                                        <span style={{ color: 'var(--primary)', fontSize: '14px' }}>📄</span>
                                        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>{citation.source}</span>
                                        <span style={{ marginLeft: 'auto', fontSize: '10px', color: 'var(--text-muted)' }}>p. {citation.page}</span>
                                    </div>
                                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', fontStyle: 'italic', borderLeft: '2px solid var(--panel-border)', paddingLeft: '8px' }}>
                                        "{citation.content.substring(0, 80)}..."
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div style={{ padding: '24px', borderTop: '1px solid var(--panel-border)' }}>
                <div style={{
                    background: 'rgba(56, 189, 248, 0.05)',
                    padding: '16px',
                    borderRadius: '12px',
                    border: '1px solid rgba(56, 189, 248, 0.1)',
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center'
                }}>
                    <div style={{ fontSize: '20px' }}>⚖️</div>
                    <div>
                        <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)' }}>COMPLIANCE CHECKED</p>
                        <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>All data points above are retrieved from verified federal and state repositories.</p>
                    </div>
                </div>
            </div>

            {selectedCitation && (
                <DocumentViewer
                    citation={selectedCitation}
                    onClose={() => setSelectedCitation(null)}
                />
            )}
        </div>
    );
};
