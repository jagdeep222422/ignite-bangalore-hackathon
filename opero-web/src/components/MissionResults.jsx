import React, { useState } from 'react';
import { CheckCircle2, Clock, Cpu, DollarSign, Download, Copy, Check, ExternalLink, Zap } from 'lucide-react';

export default function MissionResults({ results, scenario, isExecuting }) {
  const [activeTab, setActiveTab] = useState('formatted');
  const [copied, setCopied] = useState(false);

  if (!results && !isExecuting) return null;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(results, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportCsv = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    if (results?.comparisons) {
      csvContent += 'Platform,Price,Difference,Status\n';
      results.comparisons.forEach((c) => {
        csvContent += `"${c.platform}","${c.price}","${c.diff}","${c.status}"\n`;
      });
    } else if (results?.events) {
      csvContent += 'Hackathon,Prize Pool,Status,Focus\n';
      results.events.forEach((e) => {
        csvContent += `"${e.name}","${e.prizePool}","${e.status}","${e.focus}"\n`;
      });
    } else {
      csvContent += 'Key,Value\n';
      Object.entries(results || {}).forEach(([k, v]) => {
        csvContent += `"${k}","${typeof v === 'object' ? JSON.stringify(v) : v}"\n`;
      });
    }
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `tinyfish_mission_results_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="results-section glass-panel">
      {/* Impact Metrics Banner */}
      <div className="metrics-banner">
        <div className="metric-box">
          <div className="metric-icon-wrap bg-cyan-soft">
            <Clock size={20} className="text-cyan" />
          </div>
          <div>
            <span className="metric-label">Human Time Saved</span>
            <h4 className="metric-heading text-cyan">{scenario?.humanTimeSaved || '20 minutes'}</h4>
          </div>
        </div>

        <div className="metric-box">
          <div className="metric-icon-wrap bg-purple-soft">
            <Zap size={20} className="text-purple" />
          </div>
          <div>
            <span className="metric-label">Automated Steps</span>
            <h4 className="metric-heading text-purple">{scenario?.stepsAutomated || 15} Web Actions</h4>
          </div>
        </div>

        <div className="metric-box">
          <div className="metric-icon-wrap bg-emerald-soft">
            <DollarSign size={20} className="text-emerald" />
          </div>
          <div>
            <span className="metric-label">Total Execution Cost</span>
            <h4 className="metric-heading text-emerald">₹0.00 (100% Free)</h4>
          </div>
        </div>

        <div className="metric-box">
          <div className="metric-icon-wrap bg-blue-soft">
            <Cpu size={20} className="text-blue" />
          </div>
          <div>
            <span className="metric-label">Local PC Overhead</span>
            <h4 className="metric-heading text-blue">0% (Cloud Managed)</h4>
          </div>
        </div>
      </div>

      {/* Results Header & Tabs */}
      <div className="results-header-tabs">
        <div className="tabs-left">
          <button
            className={`tab-btn ${activeTab === 'formatted' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('formatted')}
          >
            Formatted Intelligence
          </button>
          <button
            className={`tab-btn ${activeTab === 'raw' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('raw')}
          >
            Structured JSON
          </button>
        </div>

        <div className="actions-right">
          <button className="btn-secondary btn-sm" onClick={handleCopyJson}>
            {copied ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
            <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
          </button>
          <button className="btn-secondary btn-sm" onClick={handleExportCsv}>
            <Download size={14} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="results-body">
        {activeTab === 'formatted' && (
          <div className="formatted-view">
            {/* Summary sentence */}
            {results?.summary && (
              <div className="summary-alert">
                <CheckCircle2 size={18} className="text-emerald" />
                <p>{results.summary}</p>
              </div>
            )}

            {/* Price Arbitrage Specific Display */}
            {results?.bestDeal && (
              <div className="deal-highlight-card">
                <div className="deal-badge-row">
                  <span className="badge badge-emerald">Verified Best Arbitrage Deal</span>
                  <span className="deal-savings">Save {results.bestDeal.discount}</span>
                </div>
                <h3 className="deal-title">{results.bestDeal.product}</h3>
                <div className="deal-price-row">
                  <div className="price-tag">
                    <span className="current-price">{results.bestDeal.currentPrice}</span>
                    <span className="original-price">{results.bestDeal.originalPrice}</span>
                  </div>
                  <div className="deal-meta">
                    <span>Seller: <strong>{results.bestDeal.platform}</strong> ({results.bestDeal.sellerRating})</span>
                    <span>Delivery: {results.bestDeal.delivery}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Comparisons Table */}
            {results?.comparisons && (
              <div className="table-wrapper">
                <table className="results-table">
                  <thead>
                    <tr>
                      <th>Platform</th>
                      <th>Extracted Price</th>
                      <th>Delta vs Best</th>
                      <th>Inventory Status</th>
                      <th>Direct Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.comparisons.map((c, i) => (
                      <tr key={i} className={c.diff.includes('Lowest') ? 'row-best' : ''}>
                        <td className="font-semibold">{c.platform}</td>
                        <td className="font-mono text-cyan">{c.price}</td>
                        <td>
                          <span className={`badge ${c.diff.includes('Lowest') ? 'badge-emerald' : 'badge-amber'}`}>
                            {c.diff}
                          </span>
                        </td>
                        <td>
                          <span className="text-secondary">{c.status}</span>
                        </td>
                        <td>
                          <a href={c.link} target="_blank" rel="noreferrer" className="table-link">
                            <span>Open</span>
                            <ExternalLink size={12} />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* B2B Lead Scout Display */}
            {results?.keyExecutives && (
              <div className="b2b-display-grid">
                <div className="dossier-card">
                  <h4>Identified Leadership Team</h4>
                  <div className="exec-list">
                    {results.keyExecutives.map((exec, idx) => (
                      <div key={idx} className="exec-item">
                        <div className="exec-avatar">{exec.name.charAt(0)}</div>
                        <div>
                          <div className="exec-name">{exec.name}</div>
                          <div className="exec-role">{exec.role}</div>
                        </div>
                        <span className="badge badge-emerald">Verified</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="dossier-card">
                  <h4>Detected Infrastructure & Stack</h4>
                  <div className="tech-tags-wrap">
                    {results.detectedTechStack?.map((t, idx) => (
                      <span key={idx} className="tech-tag">{t}</span>
                    ))}
                  </div>
                  <div className="hiring-note">
                    <strong>Hiring Signal:</strong> {results.hiringSignals}
                  </div>
                </div>
              </div>
            )}

            {/* Hackathon Radar Display */}
            {results?.events && (
              <div className="events-grid">
                {results.events.map((ev, idx) => (
                  <div key={idx} className="event-card">
                    <div className="event-top">
                      <span className="badge badge-cyan">{ev.status}</span>
                      <span className="prize-badge">{ev.prizePool}</span>
                    </div>
                    <h4>{ev.name}</h4>
                    <p className="event-focus">{ev.focus}</p>
                    <a href={ev.url} target="_blank" rel="noreferrer" className="btn-secondary btn-sm mt-3">
                      <span>View Guidelines</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'raw' && (
          <div className="raw-json-view">
            <pre className="json-code-block">
              {JSON.stringify(results, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </section>
  );
}
