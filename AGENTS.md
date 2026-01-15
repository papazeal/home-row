# AGENTS.md

This file contains instructions for agentic coding agents working in this repository.

## Development Commands

This project uses **pnpm** as the package manager. Always use pnpm instead of npm.

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Type checking and Svelte validation
pnpm check

# Watch mode for type checking
pnpm check:watch

# Sync SvelteKit files
pnpm prepare
```

## Testing

No testing framework is currently configured. When adding tests, you'll need to:
1. Choose and install a testing framework (vitest, jest, etc.)
2. Update package.json with test scripts
3. Configure the testing framework for SvelteKit + TypeScript

## Code Style Guidelines

### Project Stack
- **Framework**: SvelteKit with Svelte 5
- **Language**: TypeScript (strict mode enabled)
- **Styling**: TailwindCSS v4 with forms and typography plugins
- **Build Tool**: Vite
- **Package Manager**: pnpm (required)

### Svelte 5 Syntax
This project uses modern Svelte 5 syntax:
- Use `$props()` for component props instead of `export let`
- Use `{@render children()}` instead of `<slot />`
- Use `import type` for type-only imports when possible

### File Organization
```
src/
├── lib/           # Shared utilities, components, and assets (accessible via $lib alias)
├── routes/        # SvelteKit pages and layouts
├── app.html       # Root HTML template
└── app.d.ts       # Global TypeScript declarations
```

### TypeScript Configuration
- Strict mode enabled
- Consistent casing enforced
- Module resolution set to "bundler"
- Source maps enabled
- `rewriteRelativeImportExtensions: true` (handled by SvelteKit)

### Import Style
```typescript
// Regular imports
import { Component } from 'svelte';
import type { SomeType } from './types';

// Asset imports
import favicon from '$lib/assets/favicon.svg';

// SvelteKit route types (auto-generated)
import type { PageData } from './$types';
```

### Component Structure
```svelte
<script lang="ts">
  // Imports first
  import './styles.css';
  import { someFunction } from '$lib/utils';
  
  // Props declaration (Svelte 5)
  let { title = 'Default', items = [] } = $props();
</script>

<!-- HTML content -->
<svelte:head>
  <title>{title}</title>
</svelte:head>

<main>
  <!-- Content here -->
</main>

<!-- Optional styling -->
<style>
  /* Component-specific styles if needed */
</style>
```

### CSS and Styling
- Use TailwindCSS classes whenever possible
- Import TailwindCSS in layout files: `@import 'tailwindcss';`
- Use Tailwind plugins: forms, typography
- For component-specific styles, use `<style>` blocks in Svelte components
- Avoid inline styles unless absolutely necessary

### Error Handling
- Use TypeScript for compile-time error prevention
- Implement proper error boundaries in routes where needed
- Validate props and provide sensible defaults
- Use SvelteKit's error handling features for route-level errors

### Naming Conventions
- **Files**: kebab-case for all files except TypeScript types (PascalCase)
- **Components**: PascalCase for component names
- **Functions**: camelCase for function names
- **Variables**: camelCase for variables
- **Constants**: UPPER_SNAKE_CASE for constants
- **Types**: PascalCase for type and interface names

### Git and Workflow
- No specific pre-commit hooks configured
- Use conventional commits when possible
- Ensure `pnpm check` passes before committing
- Test build with `pnpm build` before major changes

### Development Notes
- The project uses SvelteKit's auto-adapter for deployment
- TypeScript configuration extends SvelteKit's generated config
- All path aliases are handled by SvelteKit (especially `$lib`)
- The project is set up for modern browsers and uses ES modules

### Code Quality
- TypeScript strict mode is enabled - ensure all code passes type checking
- Use meaningful variable and function names
- Keep components focused and reusable
- Add JSDoc comments for complex utility functions
- Prefer explicit returns over implicit ones where it improves readability

## Environment Variables
- No environment variable files are currently configured
- Use SvelteKit's environment variable handling for sensitive data
- Store configuration in appropriate SvelteKit configuration files

## Deployment
- Uses `@sveltejs/adapter-auto` for automatic environment detection
- Build output goes to `.svelte-kit/build/` during development
- Production build output is optimized by SvelteKit