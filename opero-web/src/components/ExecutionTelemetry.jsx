import React, { useRef, useEffect } from 'react';
import { Terminal, Activity, ArrowDown } from 'lucide-react';

export default function ExecutionTelemetry({ events, isExecuting }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [events]);

  const getActionBadgeClass = (action) => {
    if (!action) return 'badge-secondary';
    const act = action.toUpperCase();
    if (act.includes('INIT') || act.includes('CONTAINER')) return 'badge-cyan';
    if (act.includes('NAVIGATE') || act.includes('SCROLL')) return 'badge-purple';
    if (act.includes('CLICK') || act.includes('FILTER')) return 'badge-amber';
    if (act.includes('EXTRACT') || act.includes('SYNTHESIS')) return 'badge-blue';
    if (act.includes('COMPLETE') || act.includes('FINISHED')) return 'badge-emerald';
    return 'badge-secondary';
  };

  return (
    <div className="telemetry-card glass-panel">
      <div className="telemetry-header">
        <div className="telemetry-title-wrap">
          <Terminal size={17} className="text-cyan" />
          <h3 className="telemetry-title">Agent Thought & Execution Stream</h3>
        </div>
        <div className="telemetry-meta">
          <Activity size={14} className={isExecuting ? 'text-emerald pulse-icon' : 'text-secondary'} />
          <span>{isExecuting ? 'SSE Stream: 200 OK' : 'Idle'}</span>
        </div>
      </div>

      <div className="telemetry-log-window" ref={scrollRef}>
        {events.length === 0 ? (
          <div className="telemetry-empty">
            <span>Click <strong>"Deploy TinyFish Agent"</strong> to stream live telemetry...</span>
          </div>
        ) : (
          events.map((ev, index) => (
            <div key={index} className="log-entry">
              <span className="log-time">{ev.timestamp || '00:00'}</span>
              <span className={`log-badge badge ${getActionBadgeClass(ev.action)}`}>
                {ev.action || 'STEP'}
              </span>
              <span className="log-desc">{ev.description}</span>
            </div>
          ))
        )}
      </div>

      <div className="telemetry-footer">
        <span className="events-count">Total Events: {events.length}</span>
        <span className="protocol-tag">Protocol: Server-Sent Events (/v1/automation/run-sse)</span>
      </div>
    </div>
  );
}
