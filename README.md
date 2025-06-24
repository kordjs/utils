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
  Add checkmarks, warnings, and more: `.icon.check('Success')`

- ⚙️ **Modular & Extensible**  
  Well-structured, maintainable codebase with style themes in mind.

---

## 📦 Installation

```bash
npm install @kordjs/utils
```

## 🔨 Usage

```
import { color, box } from '@kordjs/utils';

console.log(color.red.bold('Critical Error'));

console.log(
  color.yellow.box('Warning: Something went wrong')
    .padding(1)
    .border('=')
    .render()
);
```