import test from 'node:test';
import assert from 'node:assert/strict';

import { getSettingsKeys, parseSettings } from '../functions/lib/settings-parser.js';

test('parseSettings applies documented defaults', () => {
  const settings = parseSettings([]);

  assert.equal(settings.layout_grid_cols, '4');
  assert.equal(settings.layout_menu_layout, 'horizontal');
  assert.equal(settings.layout_hide_desc, false);
  assert.equal(settings.home_hide_github, false);
});

test('parseSettings converts stored boolean strings consistently', () => {
  const settings = parseSettings([
    { key: 'layout_hide_desc', value: 'true' },
    { key: 'layout_hide_links', value: 'false' },
    { key: 'home_hide_github', value: '1' },
    { key: 'home_hide_admin', value: 'true' },
    { key: 'layout_grid_cols', value: '6' },
  ]);

  assert.equal(settings.layout_hide_desc, true);
  assert.equal(settings.layout_hide_links, false);
  assert.equal(settings.home_hide_github, true);
  assert.equal(settings.home_hide_admin, true);
  assert.equal(settings.layout_grid_cols, '6');
});

test('getSettingsKeys matches parseable setting fields', () => {
  const keys = getSettingsKeys();

  assert.ok(keys.includes('layout_custom_wallpaper'));
  assert.ok(keys.includes('home_default_category'));
  assert.ok(keys.includes('card_desc_color'));
  assert.equal(new Set(keys).size, keys.length);
});
