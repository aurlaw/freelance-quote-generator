# Freelance Quote Generator

A full-stack app for estimating freelance project costs and times. Uses a .NET 9 Minimal API backend (SQLite) and a Next.js frontend, orchestrated with .NET Aspire.


## Overview
This project showcases a versatile full-stack setup:

- Backend: .NET 9 Minimal API calculates estimates and stores them in SQLite.
- Frontends:
    - Next.js: Server-side rendered app with TypeScript and Tailwind CSS.

    - Vue 3: Client-side app with TypeScript, Vue Router, and Tailwind CSS.

    - Svelte: Client-side app with TypeScript, SvelteKit, and Tailwind CSS.

- Orchestration: .NET Aspire manages services and dynamic API proxying.



## Features

- Estimate generation for project type, scope, and rush status.
- Quote detail view by ID (`/quote/[id]`).
- SQLite storage (`quotes.db`).
- Dynamic API proxy via Aspire (`NEXT_PUBLIC_QUOTE_API_URL`).
- Dark-themed, responsive UI.

## Requirements

### Software Prerequisites
- **.NET 9 SDK**: For backend and Aspire. [Download](https://dotnet.microsoft.com/download/dotnet/9.0) (e.g., 9.0.100-preview.x or stable).
- **Node.js 18+**: [Download](https://nodejs.org/)

## Run Aspire

This will run all apps (Javascript based apps will automatically install node modules)

```
cd src/
dotnet run --project FreelanceQuoteGenerator.AppHost

```

Go to the `Login to the dashboard` URL found in the console log

This dashboard will allow to access all of the services running, view logs and configuration


## Notes

The Quote API uses Scaler for Open API documentation, this is available at `{quoteapi_URL}/scaler-reference`

