const fs = require("fs");

class ConfigDotGet {
  constructor(filePath) {
    this.filePath = filePath;
    this.config = this.loadConfig();
  }

  loadConfig() {
    try {
      const rawData = fs.readFileSync(this.filePath, "utf-8");
      return JSON.parse(rawData);
    } catch (error) {
      console.error("Error reading configuration file:", error);
      return {};
    }
  }

  get(path, defaultValue = null) {
    const value = path.split('.').reduce((obj, key) => (obj && obj[key] !== undefined ? obj[key] : undefined), this.config);
    return value !== undefined ? value : defaultValue;
  }

  set(path, value) {
    const keys = path.split('.');
    let obj = this.config;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!obj[keys[i]] || typeof obj[keys[i]] !== "object") {
        obj[keys[i]] = {};
      }
      obj = obj[keys[i]];
    }

    obj[keys[keys.length - 1]] = value;
    this.saveConfig();
  }

  saveConfig() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.config, null, 2), "utf-8");
    } catch (error) {
      console.error("Error saving configuration file:", error);
    }
  }
}

module.exports = ConfigDotGet;