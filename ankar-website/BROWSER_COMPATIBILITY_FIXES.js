/**
 * Browser Compatibility Fixes for hradstech.co.uk
 * Add this script before closing </body> tag
 */

(function() {
  'use strict';

  // Feature Detection
  const supportsBackdropFilter = CSS.supports('backdrop-filter', 'blur(1px)') || 
                                  CSS.supports('-webkit-backdrop-filter', 'blur(1px)');
  const supportsCSSVariables = CSS.supports('color', 'var(--test)');
  const supportsGrid = CSS.supports('display', 'grid');
  const supportsFetch = typeof fetch !== 'undefined';
  const supportsAsyncAwait = (function() {
    try {
      new Function('async function test() {}');
      return true;
    } catch (e) {
      return false;
    }
  })();

  // Console log wrapper for production
  const DEBUG = window.location.hostname === 'localhost' || 
                window.location.hostname === '127.0.0.1' ||
                window.location.search.includes('debug=true');
  
  const log = DEBUG ? console.log.bind(console) : function() {};
  const warn = DEBUG ? console.warn.bind(console) : function() {};
  const error = DEBUG ? console.error.bind(console) : function() {};

  // Polyfill for backdrop-filter in Firefox
  if (!supportsBackdropFilter) {
    log('Backdrop-filter not supported, applying fallback');
    const style = document.createElement('style');
    style.textContent = `
      .navbar:not(.scrolled) {
        background: rgba(248, 250, 252, 0.96) !important;
      }
      .navbar.scrolled {
        background: rgba(241, 245, 249, 0.98) !important;
      }
      [class*="bg-"]:has(backdrop-filter) {
        background: rgba(255, 255, 255, 0.95) !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Polyfill for smooth scrolling
  if (!CSS.supports('scroll-behavior', 'smooth')) {
    log('Smooth scroll not supported, adding polyfill');
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            const targetPosition = target.offsetTop;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 800;
            let start = null;

            function step(timestamp) {
              if (!start) start = timestamp;
              const progress = timestamp - start;
              const ease = progress / duration;
              window.scrollTo(0, startPosition + distance * ease);
              if (progress < duration) {
                window.requestAnimationFrame(step);
              }
            }
            window.requestAnimationFrame(step);
          }
        }
      });
    });
  }

  // Fetch API polyfill (if needed)
  if (!supportsFetch && typeof XMLHttpRequest !== 'undefined') {
    log('Fetch API not available, using XMLHttpRequest fallback');
    window.fetch = function(url, options) {
      return new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open(options.method || 'GET', url);
        
        if (options.headers) {
          Object.keys(options.headers).forEach(function(key) {
            xhr.setRequestHeader(key, options.headers[key]);
          });
        }

        xhr.onload = function() {
          resolve({
            ok: xhr.status >= 200 && xhr.status < 300,
            status: xhr.status,
            statusText: xhr.statusText,
            json: function() {
              return Promise.resolve(JSON.parse(xhr.responseText));
            },
            text: function() {
              return Promise.resolve(xhr.responseText);
            }
          });
        };

        xhr.onerror = function() {
          reject(new Error('Network error'));
        };

        xhr.send(options.body || null);
      });
    };
  }

  // Add CSS Grid fallback with Flexbox
  if (!supportsGrid) {
    log('CSS Grid not supported, applying Flexbox fallback');
    const style = document.createElement('style');
    style.textContent = `
      .products-grid,
      .footer-grid,
      [class*="grid"] {
        display: flex !important;
        flex-wrap: wrap !important;
      }
      .products-grid > *,
      .footer-grid > * {
        flex: 1 1 300px;
        min-width: 300px;
      }
    `;
    document.head.appendChild(style);
  }

  // Fix iOS Safari viewport height issue
  if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
    const setViewportHeight = function() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);
  }

  // Touch action improvements for mobile
  if ('ontouchstart' in window) {
    document.body.style.touchAction = 'manipulation';
  }

  // Add browser detection class to body
  const browser = {
    isIE: /MSIE|Trident/.test(navigator.userAgent),
    isFirefox: /Firefox/.test(navigator.userAgent),
    isSafari: /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent),
    isChrome: /Chrome/.test(navigator.userAgent) && !/Edge|Opera/.test(navigator.userAgent),
    isMobile: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent)
  };

  Object.keys(browser).forEach(function(key) {
    if (browser[key]) {
      document.body.classList.add(key);
    }
  });

  // Error boundary for async operations
  window.addEventListener('error', function(e) {
    error('JavaScript Error:', e.error);
    // Don't show error to users, but log it
    return true;
  });

  window.addEventListener('unhandledrejection', function(e) {
    error('Unhandled Promise Rejection:', e.reason);
    e.preventDefault();
  });

  // Expose debug functions
  window.debugBrowserCompat = {
    supportsBackdropFilter: supportsBackdropFilter,
    supportsCSSVariables: supportsCSSVariables,
    supportsGrid: supportsGrid,
    supportsFetch: supportsFetch,
    supportsAsyncAwait: supportsAsyncAwait,
    browser: browser,
    log: log,
    warn: warn,
    error: error
  };

  log('Browser compatibility fixes loaded', {
    backdropFilter: supportsBackdropFilter,
    cssVariables: supportsCSSVariables,
    grid: supportsGrid,
    fetch: supportsFetch,
    asyncAwait: supportsAsyncAwait,
    browser: browser
  });

})();

