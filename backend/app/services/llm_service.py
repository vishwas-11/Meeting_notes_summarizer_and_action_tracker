from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.output_parsers import StrOutputParser

from app.config.settings import settings
from app.utils.prompt_template import prompt_template
from app.utils.parser import parse_llm_output
from dotenv import load_dotenv

load_dotenv()


llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    temperature=0.4
)

parser = StrOutputParser()

chain = prompt_template | llm | parser


def process_notes(notes: str):
    try:
        response = chain.invoke({"notes": notes})

        #  FORCE STRING (important)
        if not isinstance(response, str):
            response = str(response)

        parsed = parse_llm_output(response)

        return parsed, response

    except Exception as e:
        print("LLM ERROR:", e)

        return {
            "summary": "",
            "decisions": [],
            "action_items": []
        }, str(e)