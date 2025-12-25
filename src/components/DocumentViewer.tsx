import React from 'react';
import type { PolicyCitation } from '../lib/mockData';

interface DocumentViewerProps {
    citation: PolicyCitation;
    onClose: () => void;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ citation, onClose }) => {
    const [viewMode, setViewMode] = React.useState<'FULL' | 'CITED'>('FULL');
    const hasFull = !!citation.fullContent;

    return (
        <div className="document-viewer-overlay" style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            animation: 'fadeIn 0.2s ease-out'
        }}>
            <div className="document-container" style={{
                width: '90%',
                maxWidth: '1000px',
                height: '85vh',
                background: '#f8fafc',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
            }}>
                <header style={{
                    padding: '16px 24px',
                    background: 'white',
                    borderBottom: '1px solid #e2e8f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div>
                        <h2 style={{ color: '#1e293b', fontSize: '18px', fontWeight: 600 }}>{citation.source}</h2>
                        <p style={{ color: '#64748b', fontSize: '13px' }}>Page {citation.page} • {citation.paragraph}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        {hasFull && (
                            <div style={{
                                display: 'flex',
                                background: '#f1f5f9',
                                padding: '4px',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0'
                            }}>
                                <button
                                    onClick={() => setViewMode('FULL')}
                                    style={{
                                        padding: '6px 12px',
                                        borderRadius: '6px',
                                        border: 'none',
                                        fontSize: '12px',
                                        fontWeight: 600,
                                        background: viewMode === 'FULL' ? 'white' : 'transparent',
                                        boxShadow: viewMode === 'FULL' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                                        color: viewMode === 'FULL' ? 'var(--primary)' : '#64748b',
                                        cursor: 'pointer'
                                    }}
                                >Full Doc</button>
                                <button
                                    onClick={() => setViewMode('CITED')}
                                    style={{
                                        padding: '6px 12px',
                                        borderRadius: '6px',
                                        border: 'none',
                                        fontSize: '12px',
                                        fontWeight: 600,
                                        background: viewMode === 'CITED' ? 'white' : 'transparent',
                                        boxShadow: viewMode === 'CITED' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                                        color: viewMode === 'CITED' ? 'var(--primary)' : '#64748b',
                                        cursor: 'pointer'
                                    }}
                                >Cited Only</button>
                            </div>
                        )}
                        <button
                            onClick={onClose}
                            style={{
                                background: '#f1f5f9',
                                border: 'none',
                                color: '#475569',
                                padding: '8px 16px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: 600
                            }}
                        >Close</button>
                    </div>
                </header>

                <div className="document-content" style={{
                    flex: 1,
                    padding: '40px 60px',
                    overflowY: 'auto',
                    color: '#334155',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    lineHeight: '1.8',
                    fontSize: '16px',
                    background: 'white'
                }}>
                    <div style={{ maxWidth: '720px', margin: '0 auto' }}>
                        {viewMode === 'CITED' || !hasFull ? (
                            <div style={{
                                padding: '32px',
                                background: 'rgba(56, 189, 248, 0.03)',
                                border: '2px solid var(--primary)',
                                borderRadius: '12px',
                                position: 'relative',
                            }}>
                                <span style={{
                                    position: 'absolute',
                                    top: '-12px',
                                    left: '20px',
                                    background: 'var(--primary)',
                                    color: 'white',
                                    fontSize: '10px',
                                    fontWeight: 800,
                                    padding: '2px 8px',
                                    borderRadius: '4px'
                                }}>CITED SECTION</span>
                                <p style={{ fontWeight: 500, color: '#1e293b', fontSize: '18px' }}>"{citation.content}"</p>
                            </div>
                        ) : (
                            <div className="full-doc-content" style={{ whiteSpace: 'pre-wrap' }}>
                                {citation.fullContent?.split('\n').map((line: string, i: number) => {
                                    const isCited = line.includes(citation.content.substring(0, 20));
                                    return (
                                        <p key={i} style={{
                                            marginBottom: '16px',
                                            padding: isCited ? '16px' : '0',
                                            background: isCited ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                                            borderLeft: isCited ? '4px solid var(--primary)' : 'none',
                                            borderRadius: isCited ? '0 8px 8px 0' : '0',
                                            fontWeight: isCited ? 500 : 400,
                                            color: isCited ? '#1e293b' : '#475569'
                                        }}>
                                            {line}
                                        </p>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                <footer style={{
                    padding: '12px 24px',
                    background: '#f8fafc',
                    borderTop: '1px solid #e2e8f0',
                    fontSize: '11px',
                    color: '#94a3b8',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div>DOC_ID: {citation.id} • SHA256: 7f83...a92b</div>
                    <div style={{ color: 'var(--success)', fontWeight: 700 }}>VERIFIED BY APPIAN REGULATORY HUB</div>
                </footer>
            </div>
        </div>
    );
};
