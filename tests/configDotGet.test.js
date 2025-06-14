const fs = require("fs");
const ConfigDotGet = require("../configDotGet");

const mockConfigPath = "test-config.json";
const mockConfigData = {
  app: {
    name: "TestApp",
    version: "1.0.0"
  },
  server: {
    port: 8080
  }
};

// Set up a temporary configuration file
beforeEach(() => {
  fs.writeFileSync(mockConfigPath, JSON.stringify(mockConfigData, null, 2), "utf-8");
});

afterEach(() => {
  fs.unlinkSync(mockConfigPath);
});

describe("ConfigDotGet", () => {
  let config;

  beforeEach(() => {
    config = new ConfigDotGet(mockConfigPath);
  });

  test("should retrieve a top-level value", () => {
    expect(config.get("app.name")).toBe("TestApp");
  });

  test("should retrieve a nested value using dot notation", () => {
    expect(config.get("server.port")).toBe(8080);
  });

  test("should return default value when key is missing", () => {
    expect(config.get("database.host", "localhost")).toBe("localhost");
  });

  test("should set a new value in config", () => {
    config.set("server.host", "127.0.0.1");
    expect(config.get("server.host")).toBe("127.0.0.1");
  });

  test("should save changes to the file", () => {
    config.set("app.mode", "production");
    const updatedConfig = JSON.parse(fs.readFileSync(mockConfigPath, "utf-8"));
    expect(updatedConfig.app.mode).toBe("production");
  });
});