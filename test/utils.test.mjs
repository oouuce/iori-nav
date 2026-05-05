import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildFaviconUrl,
  escapeHTML,
  escapeLikePattern,
  getStyleStr,
  sanitizeUrl,
} from '../functions/lib/utils.js';

test('escapeHTML escapes all HTML-sensitive characters', () => {
  assert.equal(
    escapeHTML(`<img src=x onerror="alert('x')">&`),
    '&lt;img src=x onerror=&quot;alert(&#39;x&#39;)&quot;&gt;&amp;'
  );
});

test('sanitizeUrl only allows absolute http and https URLs', () => {
  assert.equal(sanitizeUrl(' https://example.com/a b '), 'https://example.com/a%20b');
  assert.equal(sanitizeUrl('http://example.com'), 'http://example.com/');
  assert.equal(sanitizeUrl('/relative/path'), '');
  assert.equal(sanitizeUrl('javascript:alert(1)'), '');
  assert.equal(sanitizeUrl('data:text/html,<svg>'), '');
});

test('escapeLikePattern escapes SQLite LIKE wildcard characters', () => {
  assert.equal(escapeLikePattern('100%_done\\ok'), '100\\%\\_done\\\\ok');
});

test('buildFaviconUrl preserves explicit logos and derives favicon URLs for sites', () => {
  assert.equal(
    buildFaviconUrl('https://example.com/docs', 'https://cdn.example.com/logo.png', 'https://icons.test/?url='),
    'https://cdn.example.com/logo.png'
  );
  assert.equal(
    buildFaviconUrl('https://example.com/docs', '', 'https://icons.test/?url='),
    'https://icons.test/?url=example.com'
  );
  assert.equal(buildFaviconUrl('javascript:alert(1)', '', 'https://icons.test/?url='), null);
});

test('getStyleStr only emits whitelisted fonts', () => {
  assert.equal(
    getStyleStr('18', '#123456', "'Noto Sans SC', sans-serif"),
    'style="font-size: 18px;color: #123456 !important;font-family: \'Noto Sans SC\', sans-serif !important;"'
  );
  assert.equal(
    getStyleStr('', '', 'Comic Sans MS'),
    ''
  );
});
