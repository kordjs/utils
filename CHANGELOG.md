# Changelog

## [1.1.0] - 2025-06-24
### Added
- 🎨 `KORDJSChalk` color builder class with full ANSI styling support:
  - Chainable API (`.red.bold.italic(...)`)
  - Background color support (`.bgRed`, `.bgBlue`, etc.)
  - Format support (`.underline`, `.dim`, `.inverse`, etc.)
  - Unicode icon support (`.icon.check(...)`, `.icon.warning(...)`, etc.)

- 📦 `BoxBuilder` for stylized ASCII/Unicode terminal UI:
  - Draws framed boxes using `┌─┐` style with dynamic width
  - Supports `.padding()` and `.border()` customization
  - `.render()` method for output (auto-render intentionally deferred)
  - Integrated with color chains via `.box()` method

- 🔧 Modular project structure:
  - `src/console/builder.ts` → core color logic
  - `src/console/codes.ts` → ANSI escape code map
  - `src/console/styles/box.ts` → `BoxBuilder` class
  - `src/console/styles/index.ts` → central styles export
  - `src/index.ts` → unified public export

### Notes
- This is the initial release and foundation for further features like `box styles`, `center alignment`, and `renderless strings` (toString / Symbol.toPrimitive).
- `.render()` is currently required when using boxes (by design).
