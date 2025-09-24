import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AIService {
  async ask(prompt: string, text: string): Promise<any> {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4.1-nano',
        messages: [
          {
            role: 'developer',
            content: prompt,
          },
          {
            role: 'user',
            content: text,
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      },
    );

    const output = response.data['choices'][0]['message']['content'];

    return JSON.parse(output);
  }
}
