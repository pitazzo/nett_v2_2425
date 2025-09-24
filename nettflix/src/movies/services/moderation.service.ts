import { Injectable } from '@nestjs/common';
import { AIService } from 'src/movies/services/ai.service';

@Injectable()
export class ModerationService {
  constructor(private readonly aiService: AIService) {}

  async isAcceptable(text: string): Promise<boolean> {
    const parsed = await this.aiService.ask(
      'Eres un moderador de contenido. Te voy a pasar un mensaje y si incluye insultos o palabras mal sonantes, debes devolverme un JSON tal que {isAcceptable: false}, mientras que si está OK, respondas {isAcceptable: false}',
      text,
    );

    return parsed['isAcceptable'];
  }
}
