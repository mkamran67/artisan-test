# Artisian Assessment

Chatbot with a dummy intro form and page. The chatbot itself is using OpenAI's API and is in modal form.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Notes and Caveats](#notes-and-caveats)

## Installation

Instructions on how to install and set up your project.
The following setup assumes you're running these commands in this directory.

**Local Backend Setup**

```bash
# 0. Change Directory to artisan-backend
cd artisian-backend

# 1. Setup Database
# Requires docker + docker compose (Go variant) plugin installed
docker compose -f ./docker-compose-dev.yml up -d

# 2. Activate python's virtual envrionment
source .venv/bin/activate

# 3. Install dependencies with pip
pip install -r requirements.txt

# 4. Sync Schema/mgrations with Database ONLY on a NEW machine or DB/Schema changes
alembic upgrade head

# 5. Please update the OpenAI API key. The below key is not valid, you can test it on Heroku.
# .env
# OPENAI_API_KEY=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

# Finally. Run fastapi or uvicorn
fastapi dev app/main.py

# OR
# uvicorn app.main:app --host 0.0.0.0 --port 8000
```

**Local Frontend Setup**
Assuming you're starting directory is Artisan-Test **NOT** artisian-backend

```bash
# 0. Change Directory to artisan-frontend
cd artisian-frontend

# 1. Install Dependencies (requires NPM)
npm install

# 2. Run local server
npm run dev
```

## Usage

Instructions on how to use your project.

In the root folder, artisian-test, there's an included Postman collection with CRUD operations as well as a simple ping. You can use that for simple CRUD operations or navigate to swagger docs provided by the backend.

Swagger Docs : http://localhost:8000/docs

**Frontend**
Go to http://localhost:3000 and enter a random name and bottom right you'll see a modal for the chatbot.

## Notes and Caveats

This project was split into 2 different repos for Heroku deployment.
The current repo contains all the code including the frontend and backend from the below deployed repos.

Deployed Repos :

Repo for Frontend : https://github.com/mkamran67/artisan-frontend
Repo for Backend : https://github.com/mkamran67/artisan-backend

Here are the Heroku Links:

Frontend : https://artisan-frontend-c76ae6322fd0.herokuapp.com/
Backend: https://artisan-backend-419b072e4d18.herokuapp.com/docs

**Deployment in Prod**

This app is missing a lot of obvious prod environment details, such as user auth, backend auth, server traffic limitations, better DB schema/models, and it's lastly deployed to Heroku not a dedicated linux box. Since the main focus was creation of the chatbot, basic CRUD operations, and simple API integration I've kept it very simple. In the real world there would be various company or team standards the developer would have to follow along with industry standards in TDD, auth, secuirty, logging, and so on.

Lastly, the backend and frontend folders are from this repo originally before the split and are missing a few commits and have not been touched with new commits besides this merge. So you can calculate the time frame accordingly.
