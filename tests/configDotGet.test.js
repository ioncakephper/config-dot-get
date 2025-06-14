const fs = require('fs');
const lockfile = require('lockfile');
const ConfigDotGet = require('../configDotGet');

jest.mock('fs');
jest.mock('lockfile');

describe('ConfigDotGet', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('testConstructWithValidFilePath', () => {
    fs.readFileSync.mockReturnValue('{}');
    const config = new ConfigDotGet('/valid/path/to/config.json');
    expect(config.filePath).toBe('/valid/path/to/config.json');
  });

  test('testGetWithValidPath', () => {
    fs.readFileSync.mockReturnValue('{"key": "value"}');
    const config = new ConfigDotGet('/valid/path/to/config.json');
    expect(config.get('key')).toBe('value');
  });

  test('testSetWithValidPathAndValue', () => {
    fs.readFileSync.mockReturnValue('{}');
    const config = new ConfigDotGet('/valid/path/to/config.json');
    config.set('key', 'value');
    expect(config.get('key')).toBe('value');
  });

  test('testConstructWithInvalidFilePath', () => {
    expect(() => new ConfigDotGet('')).toThrow('Invalid file path');
  });

  test('testGetWithInvalidPath', () => {
    fs.readFileSync.mockReturnValue('{}');
    const config = new ConfigDotGet('/valid/path/to/config.json');
    expect(config.get('invalid.path', 'default')).toBe('default');
  });

  test('testLoadConfigWithInvalidJSON', () => {
    fs.readFileSync.mockReturnValue('invalid json');
    console.error = jest.fn();
    const config = new ConfigDotGet('/valid/path/to/config.json');
    expect(console.error).toHaveBeenCalledWith(
      'Invalid JSON format in configuration file:',
      expect.any(SyntaxError)
    );
    expect(config.config).toEqual({});
  });
});