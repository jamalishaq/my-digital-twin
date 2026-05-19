from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from openai import AsyncOpenAI
import os
import json
from dotenv import load_dotenv
from typing import Optional, List, Dict
from context import prompt

load_dotenv()

app = FastAPI()

origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

OPENROUTER_MODEL = os.getenv("OPENROUTER_MODEL", "gpt-4o-mini")

def get_client() -> AsyncOpenAI:
    key = os.getenv("OPENROUTER_API_KEY")
    if not key:
        raise HTTPException(status_code=500, detail="OPENROUTER_API_KEY is not set")
    return AsyncOpenAI(
        api_key=key,
        base_url=os.getenv("OPENROUTER_BASE_URL", "https://openrouter.ai/api/v1"),
    )

class HistoryMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[HistoryMessage]] = []


def build_messages(history: List[HistoryMessage], user_message: str) -> List[Dict]:
    messages = [{"role": "system", "content": prompt()}]
    for msg in (history or [])[-50:]:
        messages.append({"role": msg.role, "content": msg.content})
    messages.append({"role": "user", "content": user_message})
    return messages


@app.get("/")
async def root():
    return {"message": "AI Digital Twin API", "ai_model": OPENROUTER_MODEL}


@app.get("/health")
async def health_check():
    return {"status": "healthy", "model": OPENROUTER_MODEL}


@app.post("/chat")
async def chat(request: ChatRequest):
    messages = build_messages(request.history or [], request.message)

    async def generate():
        try:
            stream = await get_client().chat.completions.create(
                model=OPENROUTER_MODEL,
                messages=messages,
                max_tokens=2000,
                temperature=0.7,
                stream=True,
            )
            async for chunk in stream:
                delta = chunk.choices[0].delta.content
                if delta:
                    yield f"data: {json.dumps({'type': 'chunk', 'content': delta})}\n\n"

            yield f"data: {json.dumps({'type': 'done'})}\n\n"

        except Exception as e:
            print(f"Streaming error: {e}")
            yield f"data: {json.dumps({'type': 'error', 'detail': str(e)})}\n\n"

    return StreamingResponse(
        generate(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
