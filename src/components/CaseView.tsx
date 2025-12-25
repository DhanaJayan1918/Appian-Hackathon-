import React from 'react';
import type { CaseData } from '../lib/mockData';

interface CaseViewProps {
    activeCase: CaseData;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export const CaseView: React.FC<CaseViewProps> = ({ activeCase, searchQuery, onSearchChange }) => {
    return (
        <div className="case-content" style={{ flex: 1, overflowY: 'auto', paddingBottom: '60px' }}>
            <header className="case-header">
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span style={{
                            background: 'var(--primary-glow)',
                            color: 'var(--primary)',
                            fontSize: '11px',
                            fontWeight: 800,
                            padding: '2px 8px',
                            borderRadius: '20px',
                            border: '1px solid var(--primary)'
                        }}>{activeCase.id}</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>/ Active Claims</span>
                    </div>
                    <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'white', letterSpacing: '-0.5px' }}>
                        Intelligence Hub
                    </h1>
                </div>
                <div style={{ display: 'flex', gap: '32px' }}>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Compliance Score</p>
                        <p style={{ color: 'var(--success)', fontSize: '20px', fontWeight: 700 }}>98% Validated</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>AHT Prediction</p>
                        <p style={{ color: 'var(--primary)', fontSize: '20px', fontWeight: 700 }}>-14% Target</p>
                    </div>
                </div>
            </header>

            <main style={{ padding: '0 32px' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '24px',
                    marginBottom: '40px'
                }}>
                    <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
                        <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px', textTransform: 'uppercase' }}>Case Summary</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Claimant</span>
                                <span style={{ fontWeight: 600 }}>Sarah Jenkins</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Location</span>
                                <span style={{ fontWeight: 600 }}>{activeCase.details.location}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Valuation</span>
                                <span style={{ fontWeight: 600, color: 'var(--compliance-gold)' }}>{activeCase.details.amount}</span>
                            </div>
                        </div>
                        <p style={{ marginTop: '20px', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                            {activeCase.details.description}
                        </p>
                    </div>

                    <div className="glass-panel" style={{
                        padding: '24px',
                        borderRadius: 'var(--radius-lg)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            background: 'var(--primary-glow)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '16px',
                            fontSize: '24px'
                        }}>🤖</div>
                        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>AI Retrieval Engine</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: '300px' }}>
                            Enter keywords below to search through fragmented documentation with verifiable provenance.
                        </p>
                    </div>
                </div>

                <section className="search-hub">
                    <div className="search-input-wrapper">
                        <span style={{
                            position: 'absolute',
                            left: '20px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontSize: '20px',
                            zIndex: 1
                        }}>⚡</span>
                        <input
                            className="search-input"
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder="What policy are you looking for? (e.g. Hurricane, GDPR, HIPAA)"
                            autoFocus
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                        {["Flood", "California", "SOP", "Regulation"].map(tag => (
                            <button
                                key={tag}
                                onClick={() => onSearchChange(tag)}
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid var(--panel-border)',
                                    color: 'var(--text-secondary)',
                                    padding: '6px 16px',
                                    borderRadius: '20px',
                                    fontSize: '12px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                                onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--panel-border)'}
                            >
                                #{tag}
                            </button>
                        ))}
                    </div>
                </section>

                <div style={{ marginTop: '60px', display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
                    <button style={{
                        background: 'transparent',
                        border: '1px solid var(--panel-border)',
                        color: 'var(--text-primary)',
                        padding: '12px 24px',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}>Cancel Transaction</button>
                    <button className="btn-primary">Finalize Approval</button>
                </div>
            </main>
        </div>
    );
};
