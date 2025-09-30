# Tumaki Backend

## Setup
cp .env.example .env
Edit AI_AGENT_KEY in .env (never commit the real key).

## Install
npm install

## Run (dev)
npm run dev

## Run (prod)
npm start

## Endpoints
POST /api/chat
Body:
{
  "message": "your text",
  "history": [{ "role": "user"|"assistant", "content": "..." }]
}

GET /api/memories
Returns list of summarized memories.

Data persisted to MEMORY_FILE (default: ./data/memories.json).

# Tumaki Backend - Fix "Cannot find package 'express'" Error

## Solution

You need to install the backend dependencies before running the server:

```bash
cd /home/adi/Documents/tumaki/server
npm install
```

Then start the backend:

```bash
npm run dev
# or for production
npm start
```

If you see this error again, double-check that your `node_modules` folder exists and contains `express` and other dependencies.

# How to free port 5000 on Fedora (Linux)

# 1. Find the process using port 5000:
sudo lsof -i :5000

# 2. Note the PID (e.g., 12345), then kill it:
sudo kill -9 <PID>

# Example:
# If the output is:
# node    12345  user   23u  IPv4 1234567      0t0  TCP *:5000 (LISTEN)
# Run:
sudo kill -9 12345

# 3. Verify it's closed:
sudo lsof -i :5000

# If nothing is returned, the port is now free.
