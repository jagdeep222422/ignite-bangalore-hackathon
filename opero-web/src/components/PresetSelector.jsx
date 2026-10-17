import React from 'react';
import { ShoppingCart, Briefcase, Trophy, ArrowRight, Zap } from 'lucide-react';
import { PRESET_SCENARIOS } from '../data/mockScenarios';

export default function PresetSelector({ activePresetId, onSelectPreset, isExecuting }) {
  const getIcon = (id) => {
    switch (id) {
      case 'price-arbitrage': return <ShoppingCart size={18} className="text-cyan" />;
      case 'b2b-lead-scout': return <Briefcase size={18} className="text-purple" />;
      case 'hackathon-radar': return <Trophy size={18} className="text-emerald" />;
      default: return <Zap size={18} />;
    }
  };

  return (
    <section className="presets-section">
      <div className="section-header">
        <div className="section-title-wrap">
          <span className="section-eyebrow">ONE-CLICK HACKATHON DEMO RECIPES</span>
          <h2 className="section-title">Select Autonomous Web Mission</h2>
        </div>
        <div className="guarantee-badge">
          <Zap size={12} className="text-amber" />
          <span>100% Free · Real-world websites</span>
        </div>
      </div>

      <div className="presets-grid">
        {PRESET_SCENARIOS.map((scenario) => {
          const isActive = activePresetId === scenario.id;
          return (
            <div
              key={scenario.id}
              className={`preset-card glass-panel ${isActive ? 'active-preset' : ''}`}
              onClick={() => !isExecuting && onSelectPreset(scenario)}
            >
              <div className="preset-top">
                <div className="preset-icon-box">
                  {getIcon(scenario.id)}
                </div>
                <span className={`badge badge-${scenario.badgeColor}`}>
                  {scenario.badge}
                </span>
              </div>

              <h3 className="preset-title">{scenario.title}</h3>
              <p className="preset-tagline">{scenario.tagline}</p>

              <div className="preset-metrics">
                <div className="metric-pill">
                  <span className="metric-label">Automated:</span>
                  <span className="metric-val">{scenario.stepsAutomated} steps</span>
                </div>
                <div className="metric-pill">
                  <span className="metric-label">Saved:</span>
                  <span className="metric-val text-emerald">{scenario.humanTimeSaved}</span>
                </div>
              </div>

              <div className="preset-cta">
                <span>{isActive ? 'Selected Preset' : 'Load Mission'}</span>
                <ArrowRight size={14} className="arrow-icon" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
