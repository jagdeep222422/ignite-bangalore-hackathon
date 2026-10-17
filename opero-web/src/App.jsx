import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import PresetSelector from './components/PresetSelector';
import MissionControls from './components/MissionControls';
import LiveBrowserViewport from './components/LiveBrowserViewport';
import ExecutionTelemetry from './components/ExecutionTelemetry';
import MissionResults from './components/MissionResults';
import { PRESET_SCENARIOS } from './data/mockScenarios';
import { executeMission } from './services/tinyfishApi';
import { Sparkles, Bot, Code2, ExternalLink, Zap } from 'lucide-react';
import './App.css';

export default function App() {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('tinyfish_api_key') || '');
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [activePreset, setActivePreset] = useState(PRESET_SCENARIOS[0]);
  const [url, setUrl] = useState(PRESET_SCENARIOS[0].defaultUrl);
  const [goal, setGoal] = useState(PRESET_SCENARIOS[0].defaultGoal);

  const [isExecuting, setIsExecuting] = useState(false);
  const [events, setEvents] = useState([]);
  const [streamingUrl, setStreamingUrl] = useState('');
  const [currentAction, setCurrentAction] = useState('');
  const [stepNumber, setStepNumber] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [results, setResults] = useState(null);

  const abortControllerRef = useRef(null);

  // Sync API key to localStorage
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('tinyfish_api_key', apiKey);
    } else {
      localStorage.removeItem('tinyfish_api_key');
    }
  }, [apiKey]);

  const handleSelectPreset = (preset) => {
    setActivePreset(preset);
    setUrl(preset.defaultUrl);
    setGoal(preset.defaultGoal);
    setResults(null);
    setEvents([]);
    setStreamingUrl(preset.streamingPreviewUrl);
  };

  const handleStartMission = async () => {
    setIsExecuting(true);
    setEvents([]);
    setResults(null);
    setCurrentAction('INITIALIZING');
    setStepNumber(1);
    setTotalSteps(activePreset.stepsAutomated || 10);

    const cancelFn = await executeMission({
      apiKey,
      url,
      goal,
      useSimulation: !isLiveMode || !apiKey,
      presetId: activePreset?.id,
      onEvent: (event) => {
        setEvents((prev) => [...prev, event]);
        if (event.action) setCurrentAction(event.action);
        if (event.stepNumber) setStepNumber(event.stepNumber);
        if (event.totalSteps) setTotalSteps(event.totalSteps);
      },
      onStreamingUrl: (streamUrl) => {
        setStreamingUrl(streamUrl);
      },
      onComplete: (data) => {
        setResults(data);
        setIsExecuting(false);
        setCurrentAction('COMPLETE');
      },
      onError: (err) => {
        console.error('Mission Error:', err);
        setIsExecuting(false);
      },
    });

    abortControllerRef.current = cancelFn;
  };

  const handleStopMission = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current();
    }
    setIsExecuting(false);
    setCurrentAction('ABORTED');
    setEvents((prev) => [
      ...prev,
      {
        type: 'ABORT',
        action: 'ABORTED',
        description: 'Mission manually terminated by operator.',
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  };

  return (
    <div className="app-layout">
      {/* Top Navbar */}
      <Navbar
        apiKey={apiKey}
        setApiKey={setApiKey}
        isLiveMode={isLiveMode}
        setIsLiveMode={setIsLiveMode}
      />

      <main className="main-content">
        {/* Hero Section */}
        <div className="hero-banner">
          <div className="hero-badge">
            <Bot size={15} className="text-cyan" />
            <span>Autonomous Web Execution Layer for AI Agents</span>
          </div>
          <h1 className="hero-title">
            Opero Web <span className="gradient-text">× TinyFish</span>
          </h1>
          <p className="hero-description">
            Instead of just answering questions, deploy AI agents that <strong>actually get things done on the live web</strong>.
            Navigates dynamic SPAs, solves anti-bot challenges, fills multi-step flows, and extracts structured intelligence.
          </p>
        </div>

        {/* 1-Click Preset Recipes */}
        <PresetSelector
          activePresetId={activePreset?.id}
          onSelectPreset={handleSelectPreset}
          isExecuting={isExecuting}
        />

        {/* Core Mission Workspace Grid */}
        <div className="workspace-grid">
          {/* Left Column: Mission Controls + Telemetry */}
          <div className="workspace-left">
            <MissionControls
              url={url}
              setUrl={setUrl}
              goal={goal}
              setGoal={setGoal}
              isExecuting={isExecuting}
              onStartMission={handleStartMission}
              onStopMission={handleStopMission}
              isLiveMode={isLiveMode}
              apiKey={apiKey}
            />

            <ExecutionTelemetry
              events={events}
              isExecuting={isExecuting}
            />
          </div>

          {/* Right Column: Live Browser Viewport */}
          <div className="workspace-right">
            <LiveBrowserViewport
              url={url}
              streamingUrl={streamingUrl || activePreset.streamingPreviewUrl}
              isExecuting={isExecuting}
              currentAction={currentAction}
              stepNumber={stepNumber}
              totalSteps={totalSteps}
            />
          </div>
        </div>

        {/* Results & Intelligence Hub */}
        <MissionResults
          results={results}
          scenario={activePreset}
          isExecuting={isExecuting}
        />
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-left">
            <span>Built for <strong>Ignite With Bangalore Hackathon 2026</strong></span>
            <span className="dot-sep">•</span>
            <span>Problem Statement 1: <em>Best Use of the TinyFish Platform</em></span>
          </div>

          <div className="footer-team">
            <span>Created by:</span>
            <a 
              href="https://github.com/jagdeep222422" 
              target="_blank" 
              rel="noreferrer"
              className="team-link"
            >
              <Code2 size={13} />
              <span>Jagdeep Kumar Mahto</span>
            </a>
            <span className="dot-sep">&</span>
            <a 
              href="https://github.com/Pavan-Gowda-S" 
              target="_blank" 
              rel="noreferrer"
              className="team-link"
            >
              <Code2 size={13} />
              <span>Pavan Gowda S</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
