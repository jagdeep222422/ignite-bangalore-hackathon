import React from 'react';
import { Play, Square, Compass, Sparkles, AlertCircle, Link as LinkIcon } from 'lucide-react';

export default function MissionControls({
  url,
  setUrl,
  goal,
  setGoal,
  isExecuting,
  onStartMission,
  onStopMission,
  isLiveMode,
  apiKey,
}) {
  return (
    <section className="mission-controls-card glass-panel-glow">
      <div className="card-header">
        <div className="card-title-group">
          <Compass className="text-cyan pulse-glow" size={20} />
          <h3 className="card-title">Mission Parameters</h3>
        </div>
        <div className="engine-status-pill">
          <span className="pulse-dot"></span>
          <span>Engine: {isLiveMode && apiKey ? 'TinyFish Cloud Live' : 'Free Demo Simulator'}</span>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!isExecuting) onStartMission();
        }}
        className="mission-form"
      >
        <div className="form-group">
          <label className="form-label">
            <LinkIcon size={14} className="text-secondary" />
            <span>Target Starting URL</span>
          </label>
          <div className="url-input-wrapper">
            <span className="https-prefix">https://</span>
            <input
              type="text"
              value={url.replace(/^https?:\/\//, '')}
              onChange={(e) => setUrl('https://' + e.target.value.replace(/^https?:\/\//, ''))}
              placeholder="www.amazon.in/s?k=macbook"
              className="url-input"
              disabled={isExecuting}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            <Sparkles size={14} className="text-cyan" />
            <span>Autonomous Agent Goal (Natural Language Directive)</span>
          </label>
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g. Find pricing for product X, extract seller ratings, and compare across stores..."
            rows={3}
            className="goal-textarea"
            disabled={isExecuting}
            required
          />
        </div>

        <div className="controls-footer">
          <div className="hint-text">
            {isLiveMode && !apiKey ? (
              <span className="text-amber flex-center gap-1">
                <AlertCircle size={14} />
                No API key set — running in free simulation mode. Enter key above for custom sites.
              </span>
            ) : (
              <span className="text-muted">
                TinyFish autonomous agents will navigate dynamic SPAs, click buttons, and extract structured data.
              </span>
            )}
          </div>

          <div className="action-buttons">
            {isExecuting ? (
              <button
                type="button"
                onClick={onStopMission}
                className="btn-stop"
              >
                <Square size={16} />
                <span>Abort Mission</span>
              </button>
            ) : (
              <button
                type="submit"
                className="btn-primary btn-launch"
              >
                <Play size={16} fill="currentColor" />
                <span>Deploy TinyFish Agent</span>
              </button>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}
