import asyncio
import json
import random

import openai
from websockets import serve
import requests

with open("pool.txt", "r") as f:
    txt = f.read()
secrets = [l for l in txt.split("\n") if l]
        
async def echo(websocket):
    async for data in websocket:
        #openai.proxy = get_p()
        conversation = [{"role": msg[0], "content": msg[1]} for msg in json.loads(data)]
        #openai.api_base = "https://service-1nlkcxuu-1253830470.hk.apigw.tencentcs.com/v1"
       # openai.api_base = "https://service-2mxzdsho-1253830470.usw.apigw.tencentcs.com/v1"
        openai.api_key = random.choice(secrets)
        print(conversation)
        print(openai.api_key)
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=conversation,
            stream=True,
            request_timeout=600,
        )
        for chunk in response:
            if "choices" in chunk:
                choice = chunk.choices[0]
                if choice.finish_reason == "stop":
                    return
                elif "content" in choice.delta:
                    piece = choice.delta.content
                    print(piece)
                    await websocket.send(piece)


async def main():
    async with serve(echo, "0.0.0.0", 9000):
        await asyncio.Future()


if __name__ == "__main__":
    asyncio.run(main())
