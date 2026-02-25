# Copilot Instructions for PixelPerfect Gallery

## Project Context
Workshop repository for learning GitHub Copilot with a Next.js 15 photo gallery application. All app code lives in `pixelperfect-gallery/` directory. This is a training environment, so the app uses mock data and simulated uploads.

## Critical Architecture Decisions

### Next.js 15 App Router Rendering Strategy
- **Server Components by default** - Pages in `src/app/` render on server unless marked `'use client'`
- **Client components only when needed** - Add `'use client'` directive for:
  - Interactive state (useState, useReducer)
  - Browser APIs (drag/drop, file handling)
  - Animation libraries (Framer Motion)
  - Event handlers that modify state
- **Examples**: `GalleryGrid.tsx`, `UploadZone.tsx`, `page.tsx` in `/gallery` use `'use client'`; layout components like `Hero.tsx`, `SectionContainer.tsx` are server components

### Component Barrel Pattern
Always import UI components through the barrel export:
```tsx
import { Hero, SectionContainer, SectionTitle, FeatureCard, StatsGrid } from "@/components/ui";
```
NOT individual imports. The barrel is at `src/components/ui/index.ts`.

### Mock Data Architecture
- All data sources are in `src/lib/mock-*-data.ts` files
- Export typed interfaces AND data arrays (e.g., `Photo` interface + `mockPhotos` array)
- Upload simulation: Files are previewed via `URL.createObjectURL()` but not persisted
- Progress indicators use `setTimeout()` to simulate async operations (see `UploadZone.tsx` lines 35-55)

## Development Workflow

### Required Commands
```bash
cd pixelperfect-gallery  # ALWAYS change to this directory first
npm run dev              # Starts dev server with Turbopack (NOT webpack)
npm run build            # Production build
npm run lint             # ESLint check
```

### Dependencies That Matter
- **Radix UI** - Accessible primitives for dialogs, selects, toasts (not yet fully implemented)
- **Framer Motion** - Animations on upload previews, card hovers
- **react-dropzone** - File upload UX in `UploadZone.tsx`
- **lucide-react** - Icon library (Camera, Upload, CheckCircle, etc.)
- **Tailwind CSS v4** - With PostCSS config, uses `@theme inline` for custom properties

## Page Structure Pattern

Every page follows this template (see `src/app/page.tsx` as reference):
```tsx
<div className="page-gradient"> {/* Full-height gradient background */}
  <Hero title="..." description="..." />
  
  <SectionContainer bgColor="optional-bg-class">
    <SectionTitle title="..." viewAllLink="/optional" />
    {/* Content grid or components */}
  </SectionContainer>
</div>
```

## Styling System (Critical Details)

### Custom CSS Patterns in globals.css
- `.page-gradient` - Pre-defined light/dark gradient for page backgrounds
- `.card-*` classes - Standardized shadow/hover patterns (card-base, card-elevated, card-feature)
- `.btn-*` classes - Primary, secondary, icon button patterns
- `.icon-container-{color}` - 48px icon backgrounds with proper dark mode (blue, green, purple, orange)
- All custom classes have dark mode variants using `@media (prefers-color-scheme: dark)`

### Dark Mode Convention
Use Tailwind's `dark:` prefix for all color utilities:
```tsx
className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
```
Never use CSS variables for theme colors because Tailwind handles them.

### Responsive Grid Pattern
Standard responsive pattern seen throughout:
```tsx
className="grid md:grid-cols-3 gap-6"  // Mobile: 1 col, Desktop: 3 cols
```

## Component Props Pattern

### Always Define Explicit Interfaces
```tsx
interface ComponentProps {
  title: string;
  description: string;
  onAction?: () => void;  // Optional callbacks use ?
  className?: string;     // Optional styling override
}
```

### Lucide Icon Handling
Pass icon components as props (not JSX):
```tsx
import { Camera } from 'lucide-react';
<FeatureCard icon={Camera} iconColor="text-blue-600" />
```
Inside component: `const Icon = icon;` then render `<Icon className={...} />`

## Common Pitfalls to Avoid

1. **Don't run commands from workspace root** - Always `cd pixelperfect-gallery` first
2. **Don't import components directly** - Use barrel exports from `@/components/ui`
3. **Don't add 'use client' everywhere** - Only for interactivity/state/browser APIs
4. **Don't create new CSS files** - Extend patterns in `globals.css` or use Tailwind
5. **Don't create real file upload logic** - This is a mock app, keep simulations

## Key Files for Context

- `COMPONENT_USAGE_GUIDE.md` - Detailed component examples for each page type
- `src/app/page.tsx` - Reference implementation of homepage pattern
- `src/app/layout.tsx` - Root layout with navigation header (note the sticky nav pattern)
- `src/lib/mock-photo-data.ts` - Photo interface with all required fields
- `src/components/upload/UploadZone.tsx` - Complex client component with state, animations, file handling

## When Adding New Features

1. Check if a similar pattern exists in `COMPONENT_USAGE_GUIDE.md` or existing pages
2. Reuse layout components (`Hero`, `SectionContainer`, `SectionTitle`)
3. Add mock data to `src/lib/` following existing patterns
4. Match the dark mode and responsive patterns from `globals.css`
5. Only add `'use client'` if absolutely necessary
