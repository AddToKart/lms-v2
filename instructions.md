A fullstack Loan Management System for a microfinance or lending company. It manages client records, loan applications, payment schedules, reports, and balances using modern technologies with a focus on stored procedures for database operations.

Frontend

Framework: Next.js (App Router)

Styling: Tailwind CSS

UI Components: Shadcn UI

Data Fetching: TanStack Query

Validation: Zod + React Hook Form

Charts: Recharts

Report Tools: react-pdf, papaparse, Excel (via blob or download API)

Backend

Framework: NestJS (TypeScript)

Database: MySQL/MariaDB (with stored procedures ONLY)

Validation: class-validator

Auth: JWT + Role-based Guards

File Export: pdfkit, exceljs

Logging: Winston or Pino

Core Modules

Clients

CRUD operations

Client portal login

Loans

Apply, approve, reject loans

Set interest rate and terms

Payments

Record payments

Apply penalties

Schedules

Generate repayment schedules

View overdue items

Reports & Charts

Charts with Recharts

Reports in PDF, Excel, CSV

Printable views using Tailwind's print: utilities

Auth

Role-based (Admin, Client)

JWT auth with route guards
