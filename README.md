# config-dot-get

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

## 🛠 License
This package is licensed under MIT License.


