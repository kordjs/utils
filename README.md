# @kordjs/utils

A modern, expressive, and chainable terminal styling utility for Node.js.  
Includes powerful ANSI formatting, Unicode icons, and ASCII UI components like boxed messages — all designed to be modular and developer-friendly.

---

## ✨ Features

- 🎨 **Chained ANSI Styling**  
  Elegant, readable API inspired by chalk — `.red.bold.italic('Error')`
- 🧱 **Boxed Text Renderer**  
  Easily create framed terminal UI messages using Unicode box characters.
- 💬 **Unicode Icon Support**  
  Add checkmarks, warnings, and more inline or chained: `.icons.check('Success')`
- ⚠️ **Error Handling Utilities**  
  Custom error classes with styled error messages and code identifiers.
- 🏳️‍🌈 **New Color API**  
  Unified, chainable API for all color and background styles: `.bgBlue.yellow.italic('Styled!')`
- ⚙️ **Modular & Extensible**  
  Well-structured, maintainable codebase with themes and advanced composition in mind.

---

## 📦 Installation

With **npm**:
```bash
npm install @kordjs/utils
```
With **yarn**:
```bash
yarn add @kordjs/utils
```

---

## 🔨 Usage

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

- **`colors`**: Chainable terminal styling API (foreground, background, bold, italic, etc).
- **`colors.icons`**: Inline Unicode icon injection (check, cross, warn, info, etc).
- **`box()`**: Create and customize boxed UI messages.
- **Error utilities**: Rich error classes for consistent CLI error outputs.

---

## 📚 More

- TypeScript ready
- Designed for modern Node.js
- Easily extensible for custom themes and icons

---

> For more advanced examples, see the documentation or source code.
