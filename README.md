# Bug Bounty & Pentest Platform

A fully automated, modular bug bounty and penetration testing platform with a beautiful, modern UI, plugin support, and advanced reporting. **This project is actively in development (en cours).**

---

## 🚀 Overview
This platform aims to simulate human ethical hacking workflows using popular Kali Linux tools. It provides:
- Automated reconnaissance, vulnerability scanning, exploitation, and reporting
- A modular plugin system for easy tool integration (Nmap, Nikto, SQLmap, Bandit, etc.)
- A stunning, modern React dashboard for launching and monitoring scans
- REST API for automation and integrations
- Multi-format reporting (Markdown, PDF, HTML)
- Safe mode and user authentication (coming soon)

---

## ✨ Features
- **Automated Bug Bounty & Pentest Workflows**
- **Plugin System:** Easily add/disable tools
- **Modern UI:** Responsive, dark/light mode, sidebar navigation, notifications
- **Scan History & Job Management**
- **Reporting:** Downloadable reports (in progress)
- **Integrations:** GitHub, GitLab, Slack (planned)
- **Safe Mode:** Prevent accidental scanning of production targets

---

## 🏗️ Architecture
- **Backend:** FastAPI (Python), plugin/job system, async scan execution, REST API
- **Frontend:** React (Material UI), modern dashboard, scan launcher, history, plugin management
- **Deployment:** Docker/Docker Compose (recommended), or native Python/npm

**Directory Structure:**
```
backend/   # FastAPI backend, scan plugins, job system
frontend/  # React dashboard, UI components
Dockerfile.kali  # Dockerfile for full-featured backend (Kali tools)
README.md  # This file
```

---

## ⚡ Quickstart
### Prerequisites
- [Docker](https://www.docker.com/) (recommended for all tools)
- Node.js & npm (for frontend dev)
- Python 3.9+ (for backend dev)

### 1. Run with Docker (Recommended)
```
docker build -f backend/Dockerfile.kali -t bugbounty-backend-kali ./backend
# In a new terminal:
docker run -p 8000:8000 bugbounty-backend-kali
```
Then, in `frontend/` directory:
```
npm install
npm start
```

- Backend: http://localhost:8000
- Frontend: http://localhost:3000

### 2. Run Locally (Dev)
- Backend: `cd backend && uvicorn main:app --host 0.0.0.0 --port 8000`
- Frontend: `cd frontend && npm install && npm start`

---

## 📂 Directory Structure
```
backend/
  main.py           # FastAPI app
  plugins/          # (future) plugin modules
  Dockerfile.kali   # Backend Dockerfile with Kali tools
frontend/
  src/              # React components
  public/           # Static assets
README.md
```

---

## 🛣️ Roadmap
- [x] Nmap, Nikto, Bandit plugins
- [x] Modern React dashboard
- [ ] SQLmap, Gobuster, more plugins
- [ ] Persistent scan history
- [ ] Downloadable reports (Markdown, PDF, HTML)
- [ ] Plugin management UI
- [ ] User authentication & roles
- [ ] Integrations (GitHub, Slack, etc.)
- [ ] Safe mode, scan templates

---

## 🤝 Contributing
This project is in active development (en cours). Contributions, ideas, and feedback are welcome!
- Fork the repo, create a feature branch, and submit a PR
- Open issues for bugs/feature requests
- See TODOs in code and roadmap above

---

## 📣 Status
> **This platform is under active development. Many features are in progress or planned.**
> For questions, suggestions, or to join development, open an issue or contact the maintainer.
