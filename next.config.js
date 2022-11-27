const contentSecurityPolicy = `
  default-src 'none';
`;

// "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests"

const permissionsPolicy = [
  'accelerometer=()', 'ambient-light-sensor=()', 'autoplay=()', 'battery=()', 'camera=()',
  'cross-origin-isolated=()', 'display-capture=()', 'document-domain=()', 'encrypted-media=()',
  'execution-while-not-rendered=()', 'execution-while-out-of-viewport=()', 'fullscreen=()',
  'geolocation=()', 'gyroscope=()', 'keyboard-map=()', 'magnetometer=()', 'microphone=()',
  'midi=()', 'navigation-override=()', 'payment=()', 'picture-in-picture=()',
  'publickey-credentials-get=()', 'screen-wake-lock=()', 'sync-xhr=()', 'usb=()',
  'web-share=()', 'xr-spatial-tracking=()'
];

const securityHeaders = [
  // Enforce HTTPS.
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'Content-Security-Policy',
    value: contentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  },
  // Disable all browser features.
  {
    key: 'Permissions-Policy',
    value: permissionsPolicy.join(', ')
  },
  // Blocks the referrer header for all requests.
  {
    key: 'Referrer-Policy',
    value: 'no-referrer'
  },
  // Blocks pages from loading if the browser detects a reflected XSS attack.
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  // Enables DNS prefetching to reduce latency when users click links.
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  // Prevents MIME type sniffing.
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  // Allows the page in iframes only if all ancestor frames are same origin.
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  // Block unwanted requests from unwanted policies.
  {
    key: 'X-Permitted-Cross-Domain-Policies',
    value: 'none'
  },
  {
    key: 'Cross-Origin-Embedder-Policy',
    value: 'require-corp'
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin'
  },
  {
    key: 'Cross-Origin-Resource-Policy',
    value: 'same-origin'
  }
];

module.exports = {
  async headers() {
    return [
      {
        // Apply these headers to all routes.
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
