from fastapi import FastAPI
from openai_api import get_openai_response
from fastapi.middleware.cors import CORSMiddleware
from make_prompt import question, assistant_prompt

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/data")
def get_data() -> dict:
    response = get_openai_response(question, assistant_prompt)
    return response

if __name__ == "__main___":
    import uvicorn
    uvicorn.run("Main:app", host="127.0.0.1", port=8000, reload=True)