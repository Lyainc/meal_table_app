import os
import json
import openai
from dotenv import load_dotenv
from make_prompt import assistant_prompt

load_dotenv()

def get_openai_response(user_message: str, *args: str) -> dict:
    api_key = os.getenv("OPEN_AI_API_USER_GLENN")
    question = user_message
    if args:
        prompt = args[0]
    else:
        prompt = "You are a helpful AI Assistant."
    
    if api_key:
        openai_client = openai.OpenAI(api_key=api_key)
        
        if prompt:
            completion = openai_client.chat.completions.create(
            model="gpt-4o-2024-05-13",
            messages=[
                {"role": "system", "content": prompt},
                {"role": "user", "content": question}
            ],
            temperature=1,
            frequency_penalty=0.1,
            response_format={ "type": "json_object" },
            )
        else:
            completion = openai_client.chat.completions.create(
            model="gpt-4o-2024-05-13",
            messages=[
                {"role": "system", "content": assistant_prompt},
                {"role": "user", "content": question}
            ],
            temperature=1,
            frequency_penalty=0.1,
            response_format={ "type": "json_object" },
            )
        response = completion.choices[0].message.content
        json_response = json.loads(response)
        
        return json_response