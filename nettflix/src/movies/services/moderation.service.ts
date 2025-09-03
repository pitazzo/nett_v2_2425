import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ModerationService {
  async isAcceptable(text: string): Promise<boolean> {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4.1-nano',
        messages: [
          {
            role: 'developer',
            content:
              'Eres un moderador de contenido. Te voy a pasar un mensaje y si incluye insultos o palabras mal sonantes, debes decirme que no es apto, sino, que está todo OK',
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

    console.log(JSON.stringify(response.data, null, 2));

    return false;
  }
}
