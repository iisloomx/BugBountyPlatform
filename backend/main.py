from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import subprocess
import uuid
import threading
import os

app = FastAPI(title="Bug Bounty Platform", version="0.1.0")

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory job storage (for demo)
jobs = {}

class ScanRequest(BaseModel):
    target: str
    scan_type: str  # e.g., 'nmap', 'nikto', 'whois' (expandable)

class ScanResult(BaseModel):
    job_id: str
    status: str
    output: str = ""

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/scan", response_model=ScanResult)
def start_scan(scan: ScanRequest, background_tasks: BackgroundTasks):
    job_id = str(uuid.uuid4())
    jobs[job_id] = {"status": "queued", "output": ""}
    background_tasks.add_task(run_scan, scan, job_id)
    return ScanResult(job_id=job_id, status="queued")

@app.get("/scan/{job_id}", response_model=ScanResult)
def get_scan_result(job_id: str):
    if job_id not in jobs:
        raise HTTPException(status_code=404, detail="Job not found")
    return ScanResult(job_id=job_id, status=jobs[job_id]["status"], output=jobs[job_id]["output"])

def run_scan(scan: ScanRequest, job_id: str):
    try:
        jobs[job_id]["status"] = "running"
        if scan.scan_type == "nmap":
            cmd = ["nmap", "-T4", "-F", scan.target]
        elif scan.scan_type == "whois":
            cmd = ["whois", scan.target]
        elif scan.scan_type == "nikto":
            cmd = ["nikto", "-h", scan.target]
        elif scan.scan_type == "bandit":
            cmd = ["bandit", "-r", scan.target]
        else:
            jobs[job_id]["status"] = "failed"
            jobs[job_id]["output"] = f"Unknown scan type: {scan.scan_type}"
            return
        try:
            proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
            out, err = proc.communicate()
            jobs[job_id]["output"] = out + ("\nERROR:\n" + err if err else "")
            jobs[job_id]["status"] = "completed" if proc.returncode == 0 else "failed"
        except FileNotFoundError:
            jobs[job_id]["status"] = "failed"
            jobs[job_id]["output"] = f"Tool not installed or not in PATH: {cmd[0]}"
            return
    except Exception as e:
        jobs[job_id]["status"] = "failed"
        jobs[job_id]["output"] = str(e)

@app.get("/plugins")
def list_plugins():
    # For now, hardcoded. Later: dynamic plugin loader.
    return {"plugins": ["nmap", "whois", "nikto", "bandit"]}
