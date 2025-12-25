import { useState } from 'react';
import { CaseView } from './components/CaseView';
import { KnowledgeAssistant } from './components/KnowledgeAssistant';
import { mockCases } from './lib/mockData';
import type { CaseData } from './lib/mockData';

function App() {
  const [activeCase] = useState<CaseData>(mockCases[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <>
      <nav className="glass-panel" style={{
        height: 'var(--header-h)',
        padding: '0 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 100,
        position: 'relative'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            color: 'white',
            fontSize: '20px',
            boxShadow: '0 0 20px var(--primary-glow)'
          }}>A</div>
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.5px' }}>APPIAN <span style={{ color: 'var(--primary)', fontWeight: 400 }}>CORE</span></h1>
            <p style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '1px' }}>ENTERPRISE CASE MANAGEMENT</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div className="ai-glow" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }}></div>
            <span style={{ fontSize: '13px', fontWeight: 600 }}>RETRIEVAL ENGINE ACTIVE</span>
          </div>
          <div style={{ height: '24px', width: '1px', background: 'var(--panel-border)' }}></div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Logged in as</p>
            <p style={{ fontSize: '13px', fontWeight: 600 }}>{activeCase.agent} (Senior Adjustor)</p>
          </div>
        </div>
      </nav>

      <main style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <CaseView
          activeCase={activeCase}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <KnowledgeAssistant searchQuery={searchQuery} activeCase={activeCase} />
      </main>

      <footer style={{
        height: '32px',
        background: 'rgba(0,0,0,0.4)',
        borderTop: '1px solid var(--panel-border)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 40px',
        fontSize: '10px',
        color: 'var(--text-muted)',
        gap: '24px'
      }}>
        <span>CONNECTED TO FEDERAL REGULATORY GATEWAY</span>
        <span>LATENCY: 42ms</span>
        <span style={{ marginLeft: 'auto' }}>Appian Client Services Prototype v2.1.0</span>
      </footer>
    </>
  );
}

export default App;
