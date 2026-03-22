# Project Context: Enterprise Angular Blog
- **Framework:** Angular 20+ (Strict Mode, Experimental/Stable Zoneless Change Detection preferred).
- **Architecture:** Standalone Components ONLY, Feature-based folder structure (Core, Shared, Features).
- **State Management:** Deep integration of Angular Signals (using `input()`, `model()`, `output()`, `viewChild()`) & RxJS (using `toSignal` for reactivity).
- **Styling:** SCSS and/or Tailwind CSS.
- **Goal:** Build a highly scalable, SEO-friendly, and performant blog application with Advanced SSR/Hydration.

## Coding Standards
1. NO `.subscribe()` in components. Strictly use Signals for state and UI updates.
2. Exclusively use the modern Control Flow (`@if`, `@for`, `@switch`) and Deferrable Views (`@defer` for lazy loading components).
3. Implement strict Error Handling and Loading states for all API calls.
4. Keep components extremely focused (Single Responsibility Principle).
5. Extract all business logic and HTTP calls into Services.
6. Provide precise, clean, and production-ready code.