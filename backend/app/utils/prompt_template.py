from langchain_core.prompts import PromptTemplate

PROMPT = """
You are an AI assistant that extracts structured information from meeting notes.

Return ONLY valid JSON in this format:

{{
  "summary": "...",
  "decisions": ["..."],
  "action_items": [
    {{
      "task": "...",
      "owner": "...",
      "priority": "High | Medium | Low",
      "deadline": "YYYY-MM-DD"
    }}
  ]
}}

Meeting Notes:
{notes}
"""

prompt_template = PromptTemplate(
    input_variables=["notes"],
    template=PROMPT
)