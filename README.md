# 🍔 Xnack

A modern neumorphic web app for a food stand — built with React, Vite, and PWA support.

## Features

- Clean neumorphic UI design
- Installable as a Progressive Web App (PWA)
- Full cart system with localStorage persistence
- Pick-up and Door to Door delivery options
- Telegram bot integration for order notifications
- Smooth page transitions with Framer Motion
- Click-to-copy phone number

## Tech Stack

- Framework: React + Vite
- Routing: React Router
- Styling: Custom CSS (Neumorphism)
- Animation: Framer Motion
- PWA: vite-plugin-pwa
- Icons: react-icons
- Notifications: Telegram Bot API

## Getting Started

Install dependencies:

    npm install

Set up environment variables by creating a .env file:

    VITE_TELEGRAM_BOT_TOKEN=your_bot_token
    VITE_TELEGRAM_CHAT_ID=your_chat_id

Run development server:

    npm run dev

Build for production:

    npm run build

## Deploy on Render

1. Push this repo to GitHub
2. Create a new Static Site on Render
3. Connect this repository
4. Build Command: npm install && npm run build
5. Publish Directory: dist
6. Add environment variables VITE_TELEGRAM_BOT_TOKEN and VITE_TELEGRAM_CHAT_ID
7. Deploy

## Developer

Jessrell — Website Developer of Xnack
