import json
from typing import Optional, List
from fastapi import FastAPI, Request, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from contextlib import asynccontextmanager

import database


# Pydantic Models
class ReviewCreate(BaseModel):
    title: str
    author: str
    pass_status: str = "Pass"
    exam_date: Optional[str] = None
    study_period: Optional[str] = None
    study_period_months: Optional[int] = None
    experience: Optional[str] = None
    english_level: Optional[str] = None
    is_working: bool = False
    resources: List[str] = []
    content: str
    center_tips: Optional[str] = None


class CommentCreate(BaseModel):
    author: str
    content: str


@asynccontextmanager
async def lifespan(app: FastAPI):
    database.init_db()
    yield


app = FastAPI(title="NCLEX Success Hub API", lifespan=lifespan)

# CORS 설정 - React 개발 서버 허용
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_client_ip(request: Request) -> str:
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


# API Routes
@app.get("/api/stats")
def get_stats():
    return database.get_stats()


@app.get("/api/reviews")
def get_reviews(
    page: int = Query(1, ge=1),
    per_page: int = Query(12, ge=1, le=50),
    search: str = "",
    is_working: Optional[str] = None,
    english_level: Optional[str] = None,
    resource: Optional[str] = None,
):
    is_working_bool = None
    if is_working == "yes":
        is_working_bool = True
    elif is_working == "no":
        is_working_bool = False

    reviews, total = database.get_reviews(
        page=page,
        per_page=per_page,
        search=search,
        is_working=is_working_bool,
        english_level=english_level,
        resource=resource,
    )

    return {
        "reviews": reviews,
        "total": total,
        "page": page,
        "per_page": per_page,
        "total_pages": (total + per_page - 1) // per_page,
    }


@app.post("/api/reviews")
def create_review(review: ReviewCreate):
    review_id = database.create_review(review.model_dump())
    return {"id": review_id, "message": "Review created successfully"}


@app.get("/api/reviews/{review_id}")
def get_review(request: Request, review_id: int):
    review = database.get_review(review_id)
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")

    # 조회수 증가 (IP 기반)
    client_ip = get_client_ip(request)
    if database.check_and_increment_view(review_id, client_ip):
        review = database.get_review(review_id)

    return review


@app.post("/api/reviews/{review_id}/like")
def like_review(review_id: int):
    review = database.get_review(review_id)
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")

    likes = database.increment_likes(review_id)
    return {"likes": likes}


@app.delete("/api/reviews/{review_id}")
def delete_review(review_id: int):
    if database.delete_review(review_id):
        return {"message": "Review deleted successfully"}
    raise HTTPException(status_code=404, detail="Review not found")


@app.get("/api/reviews/{review_id}/comments")
def get_comments(review_id: int):
    review = database.get_review(review_id)
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")

    comments = database.get_comments(review_id)
    return {"comments": comments}


@app.post("/api/reviews/{review_id}/comments")
def create_comment(review_id: int, comment: CommentCreate):
    review = database.get_review(review_id)
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")

    comment_id = database.create_comment(review_id, comment.author, comment.content)
    return {"id": comment_id, "message": "Comment created successfully"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
