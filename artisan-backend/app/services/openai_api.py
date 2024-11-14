from openai import OpenAI, APIError, RateLimitError, OpenAIError, APIConnectionError
import logging
import os

# Setup logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def get_chat_response(message: str) -> str:
  try:
    # Due to $$$, limit on tokens so each message a new one.
    response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "You are Ava, a helpful and friendly AI assistant. Keep responses concise and engaging."},
        {
            "role": "user",
            "content": message
        }
    ],
    max_tokens=150
)
    return response.choices[0].message.content
  except RateLimitError as e:
    logger.error(f"Rate limit error: {e}")
    return "Rate limit error, please try again later."
  except TimeoutError as e:
    logger.error(f"Timeout error: {e}")
    return "Timeout error, please try again later."
  except APIConnectionError as e:
    logger.error(f"API connection error: {e}")
    return "API connection error, please try again later."
  except APIError as e:
    logger.error(f"API error: {e}")
    return "API error, please try again later."
  except OpenAIError as e:
    logger.error(f"OpenAI error: {e}")
    return "OpenAI error, please try again later."
  except Exception as e:
    logger.error(f"Unknown error: {e}")
    return "Unknown error, please try again later."
