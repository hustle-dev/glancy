# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Glancy is a Chrome extension that provides AI-powered text summarization using Chrome's built-in Summarizer API. The extension consists of:

- **Side Panel**: Configuration UI for summarizer settings and model download
- **Content Script**: Injected UI for summarizing selected text on web pages
- **Background Service Worker**: Handles extension initialization

## Technology Stack

- **Build Tool**: Vite with `@crxjs/vite-plugin` for Chrome extension development
- **Framework**: React 19 with TypeScript
- **Package Manager**: pnpm (9.15.2+)
- **Styling**: SCSS with CSS Modules
- **State Management**: TanStack React Query for async state
- **Chrome APIs**: Manifest V3 with Side Panel API, Chrome Storage, and experimental Summarizer API

## Common Development Commands

```bash
# Development (hot reload for extension)
pnpm dev

# Build for production
pnpm build

# Linting
pnpm lint              # Run all linters concurrently
pnpm lint:es           # ESLint only
pnpm lint:pt           # Prettier only
pnpm lint:sl           # Stylelint only

# Preview production build
pnpm preview
```

### Building and Testing the Extension

1. Run `pnpm dev` to start development server
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the `dist` folder
5. The extension will auto-reload when you make changes

Production builds are automatically zipped to `release/release.zip` after running `pnpm build`.

## Architecture

### Directory Structure

```
src/
├── background/        # Service worker entry point
├── sidepanel/         # Extension configuration UI
│   ├── main.tsx       # Entry point
│   └── src/
│       ├── App.tsx    # Main side panel component
│       └── hooks/     # React Query hooks for availability/download
├── content/           # Injected summarizer UI
│   ├── main.tsx       # Content script entry
│   └── src/
│       └── App.tsx    # Floating summary widget
├── @types/            # TypeScript type declarations
├── types/             # Shared TypeScript types
├── constants/         # Shared constants (storage keys)
└── styles/            # Global SCSS utilities (_mixins, _globals, _functions)
```

### Key Architectural Patterns

**Chrome Storage Integration**: All configuration is persisted to `chrome.storage.local` with TypeScript-safe keys defined in `src/constants/storage.ts`. The `ChromeStorage` type in `src/types/ChromeStorage.ts` defines the schema.

**Summarizer API Integration**: The extension wraps Chrome's experimental Summarizer API with TypeScript declarations in `src/@types/Summarizer.d.ts`. Key flows:

1. **Setup Flow** (Side Panel): Check availability → Download model → Save options to storage
2. **Usage Flow** (Content Script): Read options from storage → Create summarizer → Stream results

**State Management**: Uses TanStack React Query for all async operations. Hooks follow the pattern:
- `useCheckAvailability`: Checks if Summarizer API is available
- `useDownloadSummarizer`: Handles model download with progress tracking
- `useSummarizerOptions`: Manages configuration state with storage sync

**UI Components**: The project uses Radix UI primitives (via the `radix-ui` package) for accessible, unstyled components:
- Import from `radix-ui/react-*` (e.g., `radix-ui/react-toast`)
- All Radix UI components are available through the installed `radix-ui` meta-package
- Components are styled using SCSS modules to match Figma designs

### Styling System

SCSS modules are used throughout. Global utilities are in `src/styles/`:
- `_mixins.scss`: Reusable SCSS mixins
- `_globals.scss`: CSS variables and global styles
- `_functions.scss`: SCSS utility functions (including `rem()` for px to rem conversion)

Vite is configured to load these from the styles directory automatically (see `vite.config.ts` css.preprocessorOptions), so you can use `@use 'functions' as *;` in any SCSS module to access utilities without specifying the full path.

### Type System

The codebase uses strict TypeScript with extensive type safety:
- Discriminated unions for enums (`SummarizerType`, `SummarizerLength`, `SummarizerFormat`)
- Global type augmentation for Chrome APIs (`Window.Summarizer`)
- Centralized type exports through `src/types/index.ts`

## Code Style Guidelines

This project follows extensive frontend design guidelines defined in `.cursor/rules/general.mdc`. Key principles:

**Readability**:
- Replace magic numbers with named constants
- Abstract complex logic into dedicated components
- Name complex boolean conditions
- **Avoid internal line breaks within function bodies** (write React components, utils, and hooks as unified blocks)
- Separate significantly different conditional UI/logic into distinct components

**Predictability**:
- **Always return `UseQueryResult` objects from React Query hooks** (don't destructure in hook definitions)
- Use consistent return types (e.g., discriminated unions for validation)
- Avoid hidden side effects in functions (Single Responsibility Principle)
- Use unique, descriptive names to avoid ambiguity

**Cohesion**:
- Keep related logic together
- Choose field-level vs form-level cohesion based on requirements
- Define constants near related logic or ensure names link them clearly

**Coupling**:
- Avoid premature abstraction (allow some duplication if use cases might diverge)
- Create focused, scoped hooks instead of broad state managers
- Break down broad state management into smaller, focused hooks/contexts

**Import Sorting**: The project uses `eslint-plugin-simple-import-sort` to automatically sort imports.

## TypeScript Configuration

Uses TypeScript 5.9 with strict type checking enabled (`strictTypeChecked` + `stylisticTypeChecked` from typescript-eslint). Path aliases are configured via `vite-tsconfig-paths`:
- `~/` maps to `src/`

## Chrome Extension Specifics

**Permissions**: `storage`, `sidePanel`

**Content Script Injection**: Matches all HTTPS pages (`https://*/*`)

**Side Panel**: Opens when extension icon is clicked (configured in background worker)

**Manifest Config**: Defined in `manifest.config.ts` and processed by `@crxjs/vite-plugin`
