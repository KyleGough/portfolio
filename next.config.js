const securityHeaders = [
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
