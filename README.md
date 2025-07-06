---
# @kordjs/utils

![npm](https://img.shields.io/npm/v/@kordjs/utils?style=flat-square)
![npm downloads](https://img.shields.io/npm/dm/@kordjs/utils?style=flat-square)
![types](https://img.shields.io/npm/types/@kordjs/utils?style=flat-square)
![license](https://img.shields.io/github/license/kordjs/utils?style=flat-square)
[![CI](https://github.com/kordjs/utils/actions/workflows/ci.yml/badge.svg)](https://github.com/kordjs/utils/actions)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://prettier.io/)

---

> A modern, expressive, and chainable terminal styling utility for Node.js.  
> **Powerful ANSI formatting, Unicode icons, and ASCII UI components** — all designed to be modular and developer-friendly.

---

## ✨ Features

- 🎨 **Chained ANSI Styling** — Elegant, readable API inspired by chalk (`.red.bold.italic('Error')`)
- 🧱 **Boxed Text Renderer** — Easily create framed terminal UI messages with Unicode box characters
- 💬 **Unicode Icon Support** — Add checkmarks, warnings, and more: `.icons.check('Success')`
- ⚠️ **Error Handling Utilities** — Custom error classes with styled error messages and code identifiers
- 🏳️‍🌈 **New Color API** — Unified, chainable API for all color and background styles: `.bgBlue.yellow.italic('Styled!')`
- ⚙️ **Modular & Extensible** — Well-structured, maintainable codebase with themes and advanced composition in mind

---

## 📦 Installation

```bash
# Using npm
npm install @kordjs/utils

# Using yarn
yarn add @kordjs/utils
```

---

## 🚀 Usage

### Basic Color Usage

```ts
import { colors } from '@kordjs/utils';

console.log(colors.red.bold('Critical Error!'));
console.log(colors.bgBlue.yellow.italic('Warning with background!'));
```

### Box Rendering

```ts
import { box } from '@kordjs/utils';

console.log(
  box('Important message')
    .style('double')
    .padding(1, 2)
    .color('green')
    .toString()
);
```

### Icon Chaining

```ts
import { colors } from '@kordjs/utils';

console.log(colors.icons.check.green.bold('All tests passed!'));
console.log(colors.icons.cross.red('Build failed!'));
console.log(colors.icons.warn.yellow('Caution!'));
```

---

## 🧩 API Highlights

- **colors:** Chainable terminal styling API (foreground, background, bold, italic, etc)
- **colors.icons:** Inline Unicode icon injection (`check`, `cross`, `warn`, `info`, etc)
- **box():** Create and customize boxed UI messages
- **Error utilities:** Rich error classes for consistent CLI error outputs

---

## 📚 More

- TypeScript ready
- Strict, modern, and pretty codebase
- Designed for modern Node.js
- Easily extensible for custom themes and icons

---

## 🔮 Future Plans

- Seperate the ANSI styling module outside of `@kordjs/utils` into a designated repository.

--- 

> For more advanced examples, see the [documentation](./docs) or [source code](./src).

---
