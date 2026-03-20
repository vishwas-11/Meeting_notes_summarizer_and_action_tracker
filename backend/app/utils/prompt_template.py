from langchain_core.prompts import PromptTemplate

PROMPT = """
You are an AI assistant that extracts structured insights from meeting notes.

STRICT RULES:
- Return ONLY valid JSON
- Do NOT add explanation
- Extract EVERYTHING clearly

Format:
{{
  "summary": "Concise summary of the meeting",

  "decisions": [
    "Clear decision 1",
    "Clear decision 2"
  ],

  "action_items": [
    {{
      "task": "Specific actionable task",
      "owner": "Person responsible (must be from context)",
      "priority": "High | Medium | Low",
      "deadline": "YYYY-MM-DD (estimate if not provided)"
    }}
  ]
}}

IMPORTANT:
- Extract ALL tasks (even implicit ones)
- Infer owner if possible
- If no deadline → estimate realistically
- Do NOT leave fields empty

Meeting Notes:
{notes}
"""

prompt_template = PromptTemplate(
    input_variables=["notes"],
    template=PROMPT
)