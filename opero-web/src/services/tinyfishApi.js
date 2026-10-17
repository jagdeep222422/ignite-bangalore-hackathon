import { PRESET_SCENARIOS } from '../data/mockScenarios';

/**
 * Service to execute autonomous web tasks with TinyFish API or zero-cost simulation.
 */
export async function executeMission({
  apiKey,
  url,
  goal,
  useSimulation = false,
  presetId = null,
  onEvent,
  onStreamingUrl,
  onComplete,
  onError,
}) {
  // If simulation is requested or no API key is provided, run the realistic offline simulator
  if (useSimulation || !apiKey) {
    return runSimulatedMission({ presetId, url, goal, onEvent, onStreamingUrl, onComplete });
  }

  try {
    onEvent({
      type: 'INIT',
      action: 'CONNECTING',
      description: 'Connecting to TinyFish Cloud Gateway (/v1/automation/run-sse)...',
      timestamp: new Date().toLocaleTimeString(),
    });

    const response = await fetch('/api/tinyfish/v1/automation/run-sse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey.trim(),
      },
      body: JSON.stringify({
        url,
        goal,
        browser_profile: 'stealth',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`TinyFish API returned status ${response.status}: ${errorText || response.statusText}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';
    let finalResult = null;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data:')) {
          const rawData = line.slice(5).trim();
          if (!rawData) continue;
          try {
            const parsed = JSON.parse(rawData);
            
            // Handle different TinyFish SSE event types
            if (parsed.type === 'STARTED' || parsed.event === 'STARTED') {
              onEvent({
                type: 'STARTED',
                action: 'CONTAINER_SPAWN',
                description: 'TinyFish browser container initialized.',
                timestamp: new Date().toLocaleTimeString(),
              });
            } else if (parsed.type === 'STREAMING_URL' || parsed.streaming_url) {
              const streamUrl = parsed.streaming_url || parsed.url;
              if (streamUrl && onStreamingUrl) {
                onStreamingUrl(streamUrl);
              }
            } else if (parsed.type === 'PROGRESS' || parsed.event === 'PROGRESS') {
              onEvent({
                type: 'PROGRESS',
                action: parsed.step_action || 'NAVIGATE',
                description: parsed.message || parsed.description || 'Executing web step...',
                timestamp: new Date().toLocaleTimeString(),
              });
            } else if (parsed.type === 'COMPLETE' || parsed.event === 'COMPLETE') {
              finalResult = parsed.result || parsed.output || parsed;
              onEvent({
                type: 'COMPLETE',
                action: 'FINISHED',
                description: 'Mission execution completed successfully!',
                timestamp: new Date().toLocaleTimeString(),
              });
              if (onComplete) onComplete(finalResult);
            }
          } catch {
            // Unparsed stream line
          }
        }
      }
    }

    if (!finalResult && onComplete) {
      onComplete({ status: 'Finished', message: 'Stream finalized.' });
    }
  } catch (err) {
    console.warn('TinyFish API live call encountered issue, falling back to seamless demo mode:', err);
    onEvent({
      type: 'FALLBACK_NOTICE',
      action: 'FALLBACK_DEMO',
      description: `Live API: ${err.message}. Seamlessly engaging Zero-Cost Hackathon Demo Engine...`,
      timestamp: new Date().toLocaleTimeString(),
    });
    // Seamless fallback so the demo never halts during a live presentation
    return runSimulatedMission({ presetId, url, goal, onEvent, onStreamingUrl, onComplete });
  }
}

/**
 * High-fidelity zero-cost simulation engine
 * Emulates the exact TinyFish SSE sequence with realistic delays and browser previews.
 */
function runSimulatedMission({ presetId, url, goal, onEvent, onStreamingUrl, onComplete }) {
  // Find matching preset or default to first
  const scenario = PRESET_SCENARIOS.find((s) => s.id === presetId) || PRESET_SCENARIOS[0];

  // Set the streaming preview image/URL
  if (onStreamingUrl) {
    onStreamingUrl(scenario.streamingPreviewUrl);
  }

  let stepIndex = 0;
  const interval = setInterval(() => {
    if (stepIndex < scenario.steps.length) {
      const stepData = scenario.steps[stepIndex];
      onEvent({
        type: stepIndex === scenario.steps.length - 1 ? 'COMPLETE' : 'PROGRESS',
        action: stepData.action,
        description: stepData.description,
        timestamp: new Date().toLocaleTimeString(),
        stepNumber: stepIndex + 1,
        totalSteps: scenario.steps.length,
      });
      stepIndex++;
    } else {
      clearInterval(interval);
      if (onComplete) {
        onComplete(scenario.results);
      }
    }
  }, 750);

  return () => clearInterval(interval);
}
