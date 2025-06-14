const fs = require('fs');
const lockfile = require('proper-lockfile');
const path = require('path');

/**
 * Class representing a configuration manager for JSON files.
 * 
 * @class
 * @param {string} filePath - The absolute path to the configuration file.
 * 
 * @throws {Error} Throws an error if the file path is invalid.
 * 
 * @method isValidPath
 * @param {string} filePath - The file path to validate.
 * @returns {boolean} Returns true if the file path is valid, otherwise false.
 * 
 * @method loadConfig
 * @returns {Object} Loads and returns the configuration as an object. Returns an empty object if an error occurs.
 * 
 * @method get
 * @param {string} path - The dot-separated path to the desired configuration value.
 * @param {*} [defaultValue=null] - The default value to return if the path is invalid or not found.
 * @returns {*} Returns the value at the specified path or the default value if not found.
 * 
 * @method set
 * @param {string} path - The dot-separated path where the value should be set.
 * @param {*} value - The value to set at the specified path.
 * 
 * @method saveConfig
 * Saves the current configuration to the file, ensuring file locking during the process.
 * 
 * @method reloadConfig
 * Reloads the configuration from the file.
 */
class ConfigDotGet {

/**
 * Constructs an instance of the class with the specified file path.
 *
 * @param {string} filePath - The path to the file to be used by the instance.
 */
  constructor(filePath) {
    if (!this.isValidPath(filePath)) {
      throw new Error("Invalid file path");
    }
    this.filePath = filePath;
    this.config = this.loadConfig();
  }

  isValidPath(filePath) {
    return typeof filePath === 'string' && filePath.trim() !== '' && path.isAbsolute(filePath);
  }

  loadConfig() {
    try {
      const rawData = fs.readFileSync(this.filePath, "utf-8");
      return JSON.parse(rawData);
    } catch (error) {
      console.error(
        error instanceof SyntaxError
          ? "Invalid JSON format in configuration file:"
          : "Error reading configuration file:",
        error
      );
      return {};
    }
  }

  get(path, defaultValue = null) {
    if (typeof path !== 'string' || path.trim() === '') {
      console.error("Invalid path parameter");
      return defaultValue;
    }
    return path.split('.').reduce((obj, key) => (obj && obj[key] !== undefined ? obj[key] : undefined), this.config) ?? defaultValue;
  }

  set(path, value) {
    if (typeof path !== 'string' || path.trim() === '') {
      console.error("Invalid path parameter");
      return;
    }
    if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean' && typeof value !== 'object') {
      console.error("Invalid value type");
      return;
    }
    const keys = path.split('.');
    let obj = this.config;

    keys.slice(0, -1).forEach(key => {
      if (!obj[key] || typeof obj[key] !== "object") {
        obj[key] = {};
      }
      obj = obj[key];
    });

    obj[keys[keys.length - 1]] = value;
    this.saveConfig();
  }

  saveConfig() {
    try {
      lockfile.lockSync(this.filePath);
      fs.writeFileSync(this.filePath, JSON.stringify(this.config, null, 2), "utf-8");
    } catch (lockError) {
      console.error("Error locking configuration file:", lockError);
    } finally {
      try {
        lockfile.unlockSync(this.filePath);
      } catch (unlockError) {
        console.error("Error unlocking configuration file:", unlockError);
      }
    }
  }

  reloadConfig() {
    this.config = this.loadConfig();
  }
}

module.exports = ConfigDotGet;