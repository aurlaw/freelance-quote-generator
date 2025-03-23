# Freelance Quote Generator

A full-stack application to generate cost and time estimates for freelance development projects. Built with a .NET 9 Minimal API backend (using SQLite) and a Vite-powered React frontend, orchestrated in a monorepo with .NET Aspire.


## Overview

This project showcases a modern full-stack setup:
- **Backend:** .NET 9 Minimal API calculates estimates, storing results in SQLite.
- **Frontend:** React (TypeScript) with Vite provides a fast, responsive UI.
- **Orchestration:** .NET Aspire manages the monorepo and service discovery.


## Features

- **Estimate Generation:** Input project type, scope, and rush status for estimates.
- **Persistent Storage:** Quotes saved to SQLite (`quotes.db`).
- **Dynamic Service Discovery:** Aspire proxies API calls via Vite using `services__quoteapi__http__0`.
- **Responsive Design:** Basic UI for desktop and mobile.


## Requirements

### Software Prerequisites
- **.NET 9 SDK**: For backend and Aspire. [Download](https://dotnet.microsoft.com/download/dotnet/9.0) (e.g., 9.0.100-preview.x or stable).
- **Node.js 18+**: For Vite/React. [Download](https://nodejs.org/)

## Install Dependencies

Install React app
```
cd src/quote-frontend
npm install
```

Run Aspire

```
cd src/
dotnet run --project FreelanceQuoteGenerator.AppHost

```

Go to the `Login to the dashboard` URL