import sqlite3
from contextlib import contextmanager
from pathlib import Path
from typing import Optional, List, Dict

DB_PATH = Path(__file__).parent / "nclex_reviews.db"


def get_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


@contextmanager
def get_db():
    conn = get_connection()
    try:
        yield conn
    finally:
        conn.close()


def init_db() -> None:
    with get_db() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS reviews (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title VARCHAR(200) NOT NULL,
                author VARCHAR(100) NOT NULL,
                pass_status VARCHAR(10) NOT NULL CHECK(pass_status IN ('Pass', 'Fail')),
                exam_date DATE,
                study_period VARCHAR(50),
                study_period_months INTEGER,
                experience VARCHAR(50),
                english_level VARCHAR(10) CHECK(english_level IN ('High', 'Medium', 'Low')),
                is_working BOOLEAN DEFAULT FALSE,
                resources TEXT,
                content TEXT NOT NULL,
                center_tips TEXT,
                view_count INTEGER DEFAULT 0,
                likes INTEGER DEFAULT 0,
                is_verified BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS comments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                review_id INTEGER NOT NULL,
                author VARCHAR(100) NOT NULL,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS view_logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                review_id INTEGER NOT NULL,
                ip_address VARCHAR(45) NOT NULL,
                viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE,
                UNIQUE(review_id, ip_address)
            )
        """)
        conn.commit()


def create_review(data: dict) -> int:
    with get_db() as conn:
        resources_str = ",".join(data.get("resources", []))
        cursor = conn.execute(
            """
            INSERT INTO reviews (
                title, author, pass_status, exam_date, study_period, study_period_months,
                experience, english_level, is_working, resources, content, center_tips
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                data["title"],
                data["author"],
                data.get("pass_status", "Pass"),
                data.get("exam_date"),
                data.get("study_period"),
                data.get("study_period_months"),
                data.get("experience"),
                data.get("english_level"),
                data.get("is_working", False),
                resources_str,
                data["content"],
                data.get("center_tips"),
            ),
        )
        conn.commit()
        return cursor.lastrowid


def get_reviews(
    page: int = 1,
    per_page: int = 12,
    search: str = "",
    is_working: Optional[bool] = None,
    english_level: Optional[str] = None,
    resource: Optional[str] = None,
) -> tuple:
    offset = (page - 1) * per_page
    conditions = ["1=1"]
    params: List = []

    if search:
        conditions.append("(title LIKE ? OR content LIKE ? OR author LIKE ?)")
        search_pattern = f"%{search}%"
        params.extend([search_pattern, search_pattern, search_pattern])

    if is_working is not None:
        conditions.append("is_working = ?")
        params.append(is_working)

    if english_level and english_level != "all":
        conditions.append("english_level = ?")
        params.append(english_level)

    if resource and resource != "all":
        conditions.append("resources LIKE ?")
        params.append(f"%{resource}%")

    where_clause = " AND ".join(conditions)

    with get_db() as conn:
        total = conn.execute(
            f"SELECT COUNT(*) FROM reviews WHERE {where_clause}", params
        ).fetchone()[0]

        rows = conn.execute(
            f"""
            SELECT * FROM reviews
            WHERE {where_clause}
            ORDER BY created_at DESC
            LIMIT ? OFFSET ?
            """,
            params + [per_page, offset],
        ).fetchall()

        reviews = []
        for row in rows:
            review = dict(row)
            review["resources"] = review["resources"].split(",") if review["resources"] else []
            reviews.append(review)

        return reviews, total


def get_review(review_id: int) -> Optional[Dict]:
    with get_db() as conn:
        row = conn.execute("SELECT * FROM reviews WHERE id = ?", (review_id,)).fetchone()
        if row:
            review = dict(row)
            review["resources"] = review["resources"].split(",") if review["resources"] else []
            return review
        return None


def check_and_increment_view(review_id: int, ip_address: str) -> bool:
    with get_db() as conn:
        existing = conn.execute(
            "SELECT id FROM view_logs WHERE review_id = ? AND ip_address = ?",
            (review_id, ip_address),
        ).fetchone()

        if existing:
            return False

        try:
            conn.execute(
                "INSERT INTO view_logs (review_id, ip_address) VALUES (?, ?)",
                (review_id, ip_address),
            )
            conn.execute(
                "UPDATE reviews SET view_count = view_count + 1 WHERE id = ?",
                (review_id,),
            )
            conn.commit()
            return True
        except sqlite3.IntegrityError:
            return False


def increment_likes(review_id: int) -> int:
    with get_db() as conn:
        conn.execute("UPDATE reviews SET likes = likes + 1 WHERE id = ?", (review_id,))
        conn.commit()
        row = conn.execute("SELECT likes FROM reviews WHERE id = ?", (review_id,)).fetchone()
        return row[0] if row else 0


def delete_review(review_id: int) -> bool:
    with get_db() as conn:
        cursor = conn.execute("DELETE FROM reviews WHERE id = ?", (review_id,))
        conn.commit()
        return cursor.rowcount > 0


def create_comment(review_id: int, author: str, content: str) -> int:
    with get_db() as conn:
        cursor = conn.execute(
            "INSERT INTO comments (review_id, author, content) VALUES (?, ?, ?)",
            (review_id, author, content),
        )
        conn.commit()
        return cursor.lastrowid


def get_comments(review_id: int) -> List[Dict]:
    with get_db() as conn:
        rows = conn.execute(
            "SELECT * FROM comments WHERE review_id = ? ORDER BY created_at ASC",
            (review_id,),
        ).fetchall()
        return [dict(row) for row in rows]


def get_stats() -> Dict:
    with get_db() as conn:
        total = conn.execute("SELECT COUNT(*) FROM reviews").fetchone()[0]
        passed = conn.execute(
            "SELECT COUNT(*) FROM reviews WHERE pass_status = 'Pass'"
        ).fetchone()[0]
        pass_rate = round((passed / total * 100) if total > 0 else 0)

        avg_months = conn.execute(
            "SELECT AVG(study_period_months) FROM reviews WHERE study_period_months IS NOT NULL"
        ).fetchone()[0]

        return {
            "total_reviews": total,
            "pass_rate": pass_rate,
            "avg_study_months": round(avg_months) if avg_months else 4,
        }
