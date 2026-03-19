from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.output_parsers import StrOutputParser

from app.config.settings import settings
from app.utils.prompt_template import prompt_template
from app.utils.parser import parse_llm_output

# Initialize Gemini via LangChain
llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    google_api_key=settings.GOOGLE_API_KEY,
    temperature=0.3
)

parser = StrOutputParser()

# Chain
chain = prompt_template | llm | parser


def process_notes(notes: str):
    response = chain.invoke({"notes": notes})

    parsed = parse_llm_output(response)

    return parsed, response