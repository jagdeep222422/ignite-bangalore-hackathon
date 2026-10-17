import React, { useState } from 'react';
import { Shield, Sparkles, Key, Zap, CheckCircle2, Globe, Cpu } from 'lucide-react';

export default function Navbar({ apiKey, setApiKey, isLiveMode, setIsLiveMode }) {
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);

  const handleSaveKey = (e) => {
    e.preventDefault();
    setApiKey(tempKey);
    setShowKeyModal(false);
  };

  return (
    <header className="navbar-container">
      <div className="navbar-content">
        <div className="navbar-brand">
          <div className="brand-logo-badge">
            <Globe className="brand-icon" size={20} />
            <span className="live-beacon"></span>
          </div>
          <div>
            <div className="brand-title-wrap">
              <span className="brand-title">OPERO</span>
              <span className="brand-divider">/</span>
              <span className="brand-subtitle">TINYFISH MISSION CONTROL</span>
            </div>
            <div className="hackathon-tag">
              <span className="sparkle-icon">✨</span>
              <span>Ignite With Bangalore Hackathon 2026</span>
            </div>
          </div>
        </div>

        <div className="navbar-actions">
          {/* Free Tier / Live Mode Toggle */}
          <div className="mode-toggle-pill">
            <button
              className={`mode-btn ${!isLiveMode ? 'active' : ''}`}
              onClick={() => setIsLiveMode(false)}
              title="Runs 100% free with guaranteed zero API cost and instant playback"
            >
              <Zap size={14} />
              <span>Zero-Cost Demo</span>
            </button>
            <button
              className={`mode-btn ${isLiveMode ? 'active' : ''}`}
              onClick={() => setIsLiveMode(true)}
              title="Calls TinyFish Live Web Agent API with your free API Key"
            >
              <Cpu size={14} />
              <span>TinyFish Live API</span>
            </button>
          </div>

          {/* API Key Modal Button */}
          <button
            className={`api-key-btn ${apiKey ? 'has-key' : ''}`}
            onClick={() => setShowKeyModal(true)}
          >
            <Key size={15} />
            <span>{apiKey ? 'API Key Active' : 'Enter TinyFish Key'}</span>
            {apiKey && <CheckCircle2 size={13} className="text-emerald" />}
          </button>
        </div>
      </div>

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="modal-backdrop" onClick={() => setShowKeyModal(false)}>
          <div className="modal-card glass-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-wrap">
                <Key className="text-cyan" size={20} />
                <h3>TinyFish API Configuration</h3>
              </div>
              <button className="close-btn" onClick={() => setShowKeyModal(false)}>✕</button>
            </div>
            
            <form onSubmit={handleSaveKey} className="modal-body">
              <p className="modal-description">
                You can run the full demo <strong>100% Free</strong> using our built-in Zero-Cost Demo mode.
                To run live queries against custom websites, enter your free TinyFish API key from your account dashboard.
              </p>

              <div className="input-group">
                <label>TinyFish API Key</label>
                <input
                  type="password"
                  placeholder="tf_live_..."
                  value={tempKey}
                  onChange={(e) => setTempKey(e.target.value)}
                  className="text-input"
                />
              </div>

              <div className="free-tip-box">
                <Shield size={16} className="text-emerald" />
                <span>Sign up via the hackathon link for free credits: 
                  <a 
                    href="https://agent.tinyfish.ai/sign-up?ref=v1.dXNlcl8zSm10b3psUVhEaXI4NjZGMGdkeW1FZERodlo.eBDpjwv2_p8hsOOjeI7KLbQ2ONxk_zQnDMkV-uyWRPk" 
                    target="_blank" 
                    rel="noreferrer"
                    className="link-highlight"
                  >
                    agent.tinyfish.ai
                  </a>
                </span>
              </div>

              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn-secondary" 
                  onClick={() => { setTempKey(''); setApiKey(''); setShowKeyModal(false); }}
                >
                  Clear Key
                </button>
                <button type="submit" className="btn-primary">
                  Save & Connect
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
