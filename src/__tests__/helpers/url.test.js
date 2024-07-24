import { hasValidProtocol, getHostname, getFaviconLink, isUrl } from 'helpers/url';

const commonValidUrls = [
  'http://website.com',
  'https://website.com',
  'ftp://website.com',
  'ftps://website.com',
  'file://my_file.txt',
  'blob:7b2e7a34-8573-4c16-a3bb-8fb89577e5b4',
  'blob:null/7b2e7a34-8573-4c16-a3bb-8fb89577e5b4',
];

describe('url helper', () => {
  it('accepts valid urls', () => {
    const urls = [
      ...commonValidUrls,
      'http://stablediffusion',
      'http://stablediffusion:32444',
      'ftp://a.stablediffusion:32444/r/typo/*',
    ];

    for (const url of urls) {
      const result = isUrl(url);
      expect(result).toEqual(true);
    }
  });

  it('detects urls with a valid protocol', () => {
    const urls = [
      ...commonValidUrls,
      'chrome://extensions',
      'edge://extensions',
      'moz-extension://something',
      'chrome-extension://something',
      'extension://something',
      'about:addons',
    ];

    for (const url of urls) {
      const result = hasValidProtocol(url);
      expect(result).toEqual(true);
    }
  });

  it('detects urls with an invalid protocol', () => {
    // prettier-ignore
    const urls = [
      'my_file.txt',
      'www.website.com',
      'website.com',
      'foo://bar',
    ];

    for (const url of urls) {
      const result = hasValidProtocol(url);
      expect(result).toEqual(false);
    }
  });

  it('resolves urls hostnames correctly', () => {
    const payload = [
      {
        url: 'http://website.com',
        expected: 'website.com',
      },
      {
        url: 'https://website.com/something',
        expected: 'website.com',
      },
      {
        url: 'https://website.com/?param1=foo&param2=bar',
        expected: 'website.com',
      },
      {
        url: 'https://website.com/exact-url$',
        expected: 'website.com',
      },
      {
        url: 'https://www.website.com',
        expected: 'website.com',
      },
      {
        url: 'https://m.website.com',
        expected: 'website.com',
      },
      {
        url: '*.website.com',
        expected: 'website.com',
      },
      {
        url: '*.website.com/*',
        expected: 'website.com',
      },
    ];

    for (const { url, expected } of payload) {
      const result = getHostname(url);
      expect(result).toEqual(expected);
    }
  });

  it('resolves favicon links correctly', () => {
    const payload = [
      {
        url: 'http://website.com',
        expected: 'https://website.com/favicon.ico',
      },
      {
        url: 'https://website.com/something',
        expected: 'https://website.com/favicon.ico',
      },
      {
        url: 'https://website.com/exact-url$',
        expected: 'https://website.com/favicon.ico',
      },
      {
        url: '*.website.com',
        expected: 'https://website.com/favicon.ico',
      },
      {
        url: '*.website.com/*',
        expected: 'https://website.com/favicon.ico',
      },
    ];

    for (const { url, expected } of payload) {
      const result = getFaviconLink(url);
      expect(result).toEqual(expected);
    }
  });
});
