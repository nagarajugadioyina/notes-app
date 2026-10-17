# Notes: a tiny full stack practice project

Spring Boot (Java 17) + React (Vite) + database (H2 by default, Oracle optional).

## 1. Run locally

Backend (needs Java 17 and Maven):

    cd backend
    mvn spring-boot:run

Open http://localhost:8080 and you should see "Notes API is running".

Frontend (needs Node 18+):

    cd frontend
    cp .env.example .env
    npm install
    npm run dev

Open http://localhost:5173, add a note, delete a note.

## 2. Put it on GitHub

    git init
    git add .
    git commit -m "notes app"

Create an empty repo on GitHub and push to it.

## 3. Deploy the backend on Render

1. Render dashboard: New > Web Service > connect your GitHub repo.
2. Root Directory: backend
3. Runtime / Language: Docker
4. Instance type: Free
5. Environment variables:
   - ALLOWED_ORIGIN = (leave empty for now, set it after step 4)
6. Deploy. When it is live, open your https://xxxx.onrender.com URL.
   You should see "Notes API is running".

## 4. Deploy the frontend on Vercel

1. Vercel dashboard: Add New > Project > import the same repo.
2. Root Directory: frontend
3. Framework preset: Vite
4. Environment variable: VITE_API_URL = https://xxxx.onrender.com (no trailing slash)
5. Deploy and copy your https://yyyy.vercel.app URL.

## 5. Connect the two (CORS)

In Render, set ALLOWED_ORIGIN = https://yyyy.vercel.app (no trailing slash) and let it redeploy.
Open the Vercel site, add a note. It is live.

Note: the free Render service sleeps after inactivity (first request is slow),
and the default H2 in-memory database is wiped on every restart. That is fine for learning.

## 6. Upgrade: use Oracle instead of H2

Create a free Oracle Autonomous Database, then in Render set:

    DB_URL      = jdbc:oracle:thin:@YOUR_TLS_CONNECTION_STRING
    DB_USER     = your db user
    DB_PASSWORD = your db password

(If you use a wallet, add the wallet files as Render Secret Files and append
?TNS_ADMIN=/etc/secrets to the URL.) The notes table is created automatically on first start.
No code changes are needed.
