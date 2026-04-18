from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any

router = APIRouter()

class ResumeCreate(BaseModel):
    title: str = "My Resume"
    template_id: str = "fresher"
    form_data: Dict[str, Any] = {}
    style_data: Dict[str, Any] = {}

# In-memory store for demo (replace with DB in production)
resumes_store = {}
resume_counter = 1

@router.post("/create")
def create_resume(body: ResumeCreate):
    global resume_counter
    resume_id = resume_counter
    resume_counter += 1
    resumes_store[resume_id] = {
        "id": resume_id,
        "title": body.title,
        "template_id": body.template_id,
        "form_data": body.form_data,
        "style_data": body.style_data,
    }
    return {"id": resume_id, "message": "Resume created successfully"}

@router.get("/{resume_id}")
def get_resume(resume_id: int):
    if resume_id not in resumes_store:
        raise HTTPException(status_code=404, detail="Resume not found")
    return resumes_store[resume_id]

@router.put("/{resume_id}")
def update_resume(resume_id: int, body: ResumeCreate):
    if resume_id not in resumes_store:
        raise HTTPException(status_code=404, detail="Resume not found")
    resumes_store[resume_id].update({
        "title": body.title,
        "form_data": body.form_data,
        "style_data": body.style_data,
    })
    return {"message": "Resume updated"}

@router.get("/")
def list_resumes():
    return list(resumes_store.values())

@router.delete("/{resume_id}")
def delete_resume(resume_id: int):
    if resume_id not in resumes_store:
        raise HTTPException(status_code=404, detail="Resume not found")
    del resumes_store[resume_id]
    return {"message": "Resume deleted"}
