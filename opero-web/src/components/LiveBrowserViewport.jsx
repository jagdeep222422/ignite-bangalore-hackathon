import React, { useState, useEffect } from 'react';
import { Globe, Lock, ExternalLink, Radio, Eye, Layers, ShieldCheck, MousePointer2 } from 'lucide-react';

export default function LiveBrowserViewport({
  url,
  streamingUrl,
  isExecuting,
  currentAction,
  stepNumber,
  totalSteps,
}) {
  const [cursorPos, setCursorPos] = useState({ x: 35, y: 40 });
  const [isClicking, setIsClicking] = useState(false);

  // Dynamic cursor animation during execution
  useEffect(() => {
    if (!isExecuting) return;

    const interval = setInterval(() => {
      const randX = Math.floor(20 + Math.random() * 60);
      const randY = Math.floor(25 + Math.random() * 55);
      setCursorPos({ x: randX, y: randY });
      setIsClicking(true);
      setTimeout(() => setIsClicking(false), 300);
    }, 1800);

    return () => clearInterval(interval);
  }, [isExecuting]);

  return (
    <div className="browser-viewport-card glass-panel">
      {/* Browser Chrome Header */}
      <div className="browser-chrome-header">
        <div className="window-dots">
          <span className="dot dot-red"></span>
          <span className="dot dot-yellow"></span>
          <span className="dot dot-green"></span>
        </div>

        <div className="browser-url-bar">
          <Lock size={12} className="text-emerald" />
          <span className="current-url-display">{url || 'https://agent.tinyfish.ai'}</span>
          <span className="url-security-tag">STEALTH PROXY: ON</span>
        </div>

        <div className="browser-header-meta">
          {isExecuting ? (
            <div className="live-stream-badge">
              <Radio size={12} className="pulse-icon text-rose" />
              <span>LIVE AGENT STREAM</span>
            </div>
          ) : (
            <div className="idle-stream-badge">
              <Eye size={12} className="text-secondary" />
              <span>STANDBY</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Browser Viewport Canvas */}
      <div className="browser-canvas">
        {streamingUrl && streamingUrl.startsWith('http') && !streamingUrl.includes('unsplash') ? (
          // Real TinyFish Live Stream Frame
          <iframe
            src={streamingUrl}
            title="TinyFish Live Browser View"
            className="browser-iframe"
            sandbox="allow-scripts allow-same-origin"
          />
        ) : (
          // High-Fidelity Agent Visualizer
          <div className="viewport-visualizer">
            {/* Background Site Preview */}
            <div 
              className="viewport-bg" 
              style={{
                backgroundImage: `url(${streamingUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'})`
              }}
            >
              <div className="viewport-overlay-mesh"></div>
            </div>

            {/* AI Action Overlay HUD */}
            <div className="agent-hud-overlay">
              {isExecuting && (
                <>
                  {/* Floating Action Pill */}
                  <div className="agent-action-banner">
                    <span className="pulse-dot"></span>
                    <span className="action-name">{currentAction || 'PARSING DOM NODES'}</span>
                    {totalSteps && (
                      <span className="step-counter">
                        Step {stepNumber || 1} / {totalSteps}
                      </span>
                    )}
                  </div>

                  {/* AI Simulated Target Box */}
                  <div
                    className={`ai-target-box ${isClicking ? 'clicking' : ''}`}
                    style={{ left: `${cursorPos.x}%`, top: `${cursorPos.y}%` }}
                  >
                    <div className="target-crosshair"></div>
                    <span className="target-label">AI_TARGET // DOM_NODE</span>
                  </div>

                  {/* Simulated Agent Pointer */}
                  <div
                    className={`ai-mouse-pointer ${isClicking ? 'pointer-click' : ''}`}
                    style={{ left: `${cursorPos.x}%`, top: `${cursorPos.y}%` }}
                  >
                    <MousePointer2 size={22} className="pointer-icon" />
                    <span className="pointer-bubble">TinyFish Agent</span>
                  </div>
                </>
              )}

              {!isExecuting && (
                <div className="viewport-idle-state">
                  <div className="idle-icon-wrap">
                    <Globe size={40} className="text-cyan glow-svg" />
                  </div>
                  <h4>Ready for Autonomous Web Mission</h4>
                  <p>TinyFish cloud container is ready to execute real-world multi-step web workflows.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Viewport Status Footer */}
        <div className="browser-footer-strip">
          <div className="footer-left">
            <ShieldCheck size={14} className="text-emerald" />
            <span>Anti-Bot Shield: Active · TLS Fingerprint: Chrome 124 · Zero Local Memory Used</span>
          </div>
          <div className="footer-right">
            <span>Powered by <strong>TinyFish.ai</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
