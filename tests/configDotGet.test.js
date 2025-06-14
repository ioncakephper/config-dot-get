const fs = require('fs');
const ConfigDotGet = require('../configDotGet');

jest.mock('fs');

describe('ConfigDotGet', () => {
  test('test_loadConfig_validFile', () => {
    const mockData = JSON.stringify({ key: 'value' });
    fs.readFileSync.mockReturnValue(mockData);

    const config = new ConfigDotGet('path/to/config.json');
    expect(config.config).toEqual({ key: 'value' });
  });
});