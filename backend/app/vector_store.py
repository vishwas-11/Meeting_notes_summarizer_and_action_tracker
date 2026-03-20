import os
from pymongo import MongoClient
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)
db = client["meeting_db"]
collection = db["meeting_vectors"]

embeddings = GoogleGenerativeAIEmbeddings(
    model="gemini-embedding-001"
)



def store_chunks(chunks, meeting_id):
    docs = []

    for chunk in chunks:
        vector = embeddings.embed_query(chunk)

        docs.append({
            "text": chunk,
            "embedding": vector,
            "meeting_id": meeting_id
        })

    if docs:
        collection.insert_many(docs)



def similarity_search(query, meeting_id, k=3):
    query_vector = embeddings.embed_query(query)

    results = collection.aggregate([
        {
            "$vectorSearch": {
                "index": "vector_index",
                "path": "embedding",
                "queryVector": query_vector,
                "numCandidates": 50,
                "limit": k,
                "filter": {
                    "meeting_id": meeting_id
                }
            }
        }
    ])

    return [doc["text"] for doc in results]