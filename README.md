# Week 8 - HTTP Request (Axios)

Mobile app assignment using Expo + TypeScript and Axios with JSONPlaceholder API.

## Implemented Tugas

- Home page displays all posts.
- Tap a post to open Post Detail.
- Post Detail fetches post data, author detail, and comment list.
- Home page has **Add New Post** button.
- Add New Post page sends POST request using `postData` in `services/api.ts`.

## Setup

1. Install dependencies:
   npm install
2. Create env file:
   copy `.env.example` to `.env.local`
3. Run app:
   npm run start

## API

Base URL configured via env:

`EXPO_PUBLIC_API_BASE_URL=https://jsonplaceholder.typicode.com`
