import * as amplitude from '@amplitude/analytics-browser';

const AMPLITUDE_API_KEY = import.meta.env.VITE_AMPLITUDE_API_KEY;

/**
 * Initialize Amplitude Analytics
 */
export const initAmplitude = () => {
  if (!AMPLITUDE_API_KEY) {
    console.warn('Amplitude API key not found. Analytics will not be tracked.');
    return;
  }

  amplitude.init(AMPLITUDE_API_KEY, undefined, {
    autocapture: {
      attribution: true,
      fileDownloads: true,
      formInteractions: true,
      pageViews: true,
      sessions: true,
      elementInteractions: true,
    },
  });
};

/**
 * Track custom event
 */
export const trackEvent = (eventName: string, eventProperties?: Record<string, any>) => {
  if (!AMPLITUDE_API_KEY) return;
  amplitude.track(eventName, eventProperties);
};

/**
 * Set user properties
 */
export const setUserProperties = (properties: Record<string, any>) => {
  if (!AMPLITUDE_API_KEY) return;
  const identifyEvent = new amplitude.Identify();
  Object.entries(properties).forEach(([key, value]) => {
    identifyEvent.set(key, value);
  });
  amplitude.identify(identifyEvent);
};

/**
 * Track page view
 */
export const trackPageView = (pageName: string) => {
  if (!AMPLITUDE_API_KEY) return;
  amplitude.track('Page View', { page: pageName });
};

export default {
  init: initAmplitude,
  track: trackEvent,
  setUserProperties,
  trackPageView,
};
