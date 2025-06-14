# config-dot-get

![npm version](https://img.shields.io/npm/v/config-dot-get)
![license](https://img.shields.io/github/license/ioncakephper/config-dot-get)
![GitHub issues](https://img.shields.io/github/issues/ioncakephper/config-dot-get)
![GitHub stars](https://img.shields.io/github/stars/ioncakephper/config-dot-get?style=social)

**config-dot-get** is a lightweight JSON configuration reader that allows developers to retrieve and modify settings using **dot notation**. It efficiently handles nested configuration values.

## 🚀 Installation

```sh
npm install config-dot-get
```

## 📖 Usage

```js
const ConfigReader = require("config-dot-get");

const config = new ConfigReader("config.json");

// Get a value using dot notation
console.log(config.get("transpile.debug", true)); // Returns the value or default (true)

// Set a value
config.set("logging.level", "info");
console.log(config.get("logging.level")); // "info"
```

## ✨ Features

- Supports dot notation for accessing nested keys.
- Allows modifying settings dynamically with .set().
- Automatically saves changes to the JSON file.
- Provides default values if a key is missing.

## 📌 Examples

🔹 Basic Usage

```js
const ConfigDotGet = require("config-dot-get");

const config = new ConfigReader("config.json");

// Retrieve a top-level value
console.log(config.get("app.name")); // Example output: "MyApp"

// Retrieve a nested value using dot notation
console.log(config.get("database.host")); // Example output: "localhost"

// Provide a default value if the key is missing
console.log(config.get("server.port", 3000)); // Example output: 3000 (default)
```

🔹 Setting Values

```js
// Modify a value dynamically
config.set("logging.level", "debug");

// Retrieve the updated value
console.log(config.get("logging.level")); // Example output: "debug"
```

🔹 Handling missing values

```js
console.log(config.get("feature.enable", false)); // Returns default (false)
```

🔹 Working with Nested Configuration

```js
// Config structure (config.json)
// {
//   "database": {
//     "host": "localhost",
//     "port": 5432
//   }
// }

// Access nested values
console.log(config.get("database.port")); // Example output: 5432
```

## 🏆 Best Practices

1. **Use default values**: Always provide a default value when retrieving configuration settings to avoid unexpected `undefined` values.

   ```js
   const port = config.get("server.port", 3000);
   ```

2. **Keep configuration organized**: Structure JSON files logically to prevent deep nesting that may be difficult to maintain.
3. **Validate input**: Ensure the retrieved values match expected data types to prevent runtime issues.

   ```js
   const logLevel = config.get("logging.level", "info");
   if (typeof logLevel !== "string") {
    throw new Error("Invalid log level type");
   }
   ```

4. **Avoid hardcoding paths**: Store key paths in constants for better maintainability.

   ```js
   const SERVER_PORT = "server.port";
   const port = config.get(SERVER_PORT, 3000);
   ```

5. **Use `.set()` responsibly**: Modify configuration settings only when necessary to prevent unintended overrides.

   ```js
   config.set("feature.enabled", true);
   ```

## 🛠 License

This package is licensed under MIT License.
