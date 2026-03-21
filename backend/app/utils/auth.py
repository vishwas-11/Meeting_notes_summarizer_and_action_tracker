import base64
import hashlib
import hmac
import os
from datetime import datetime, timedelta

import jwt

SECRET_KEY = "your_secret_key"  # move to env later
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24

def hash_password(password: str):
    iterations = 200_000
    salt = os.urandom(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, iterations)
    salt_b64 = base64.b64encode(salt).decode("ascii")
    digest_b64 = base64.b64encode(digest).decode("ascii")
    return f"pbkdf2_sha256${iterations}${salt_b64}${digest_b64}"

def verify_password(plain, hashed):
    try:
        scheme, iterations, salt_b64, digest_b64 = hashed.split("$", 3)
        if scheme != "pbkdf2_sha256":
            return False
        salt = base64.b64decode(salt_b64.encode("ascii"))
        expected = base64.b64decode(digest_b64.encode("ascii"))
        candidate = hashlib.pbkdf2_hmac(
            "sha256",
            plain.encode("utf-8"),
            salt,
            int(iterations),
        )
        return hmac.compare_digest(candidate, expected)
    except Exception:
        return False

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token: str):
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])