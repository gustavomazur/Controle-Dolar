import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import dolar

load_dotenv()

frontend_origins = os.getenv(
    "FRONTEND_ORIGIN",
    "http://localhost:5173",
)
origins = [origem.strip() for origem in frontend_origins.split(",") if origem.strip()]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["X-Total-Dolar"],
)

app.include_router(dolar.router)
