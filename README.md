# Later | بعدين

**A mobile-first personal backlog for the things you keep saying you'll do later.**

[Try the live prototype](https://hassansaber1911-dot.github.io/Later-Ba3den/)

## Product Overview
Ideas, places, courses, purchases, people to contact, and small tasks often end up scattered across notes, screenshots, messages, and memory. Later gives them one lightweight home without forcing every thought into a traditional task-management workflow.

## The Problem
Not everything worth remembering is a dated task. People need somewhere to capture an intention quickly, return to it later, and decide whether to continue, complete, archive, or drop it.

## Core Experience
- Name onboarding and editable profile
- Quick-add with optional dates, times, notes, and images
- Categories for Watch, Read, Connect, Work, Buy, Learn, Visit, and Other
- Pending, In Progress, Done, and Not Interested states
- Home sections for Today, Continue, Upcoming, and Someday
- Focused Later view for actionable items
- Full History with filters
- Archive and restore flows
- Mobile-first responsive navigation

## Product Logic
**Later = Pending + In Progress.**

**History = everything captured across statuses.**

Dates are optional by design. An idea can live in Someday without inventing a deadline simply to satisfy the system.

## Product Decisions
**Capture first, organize lightly.** The app asks only for context that helps the user return to an item.

**Not Interested is a real outcome.** Users can deliberately close an intention without pretending it was completed.

**History preserves context.** Completed, dropped, and archived items remain reviewable instead of disappearing.

## Product Analytics
Privacy-conscious GA4 events measure item creation, editing, completion, dismissal, archive/restore, quick-add usage, and section views. User-entered titles, notes, and images are not sent as analytics event parameters.

## Tech Stack
HTML, CSS, vanilla JavaScript, browser Local Storage, Google Analytics 4, and GitHub Pages.

## Current Scope
The prototype stores data locally in the browser. It currently has no account sync, cloud backup, reminders, or cross-device access.

## Roadmap Opportunities
- Authentication and cloud sync
- Reminders and notifications
- Sharing selected items
- Search and richer filters
- Arabic-first localization
- PWA/offline installation
- Smart resurfacing of forgotten items

## About This Project
Later explores how a lightweight product can sit between a notes app and a task manager: enough structure to come back to something, without making every intention feel like work.

**Built by Hassan Mohamed Saber**
