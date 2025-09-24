import { Injectable } from '@nestjs/common';
import { AIService } from 'src/movies/services/ai.service';

@Injectable()
export class SynopsisService {
  constructor(private readonly aiService: AIService) {}

  async getSynopsis(title: string): Promise<string> {
    const parsed = await this.aiService.ask(
      'Eres un crítico de cine, tienes que darme una sinopsis de la película con el título que te voy a enviar. Si no la conoces, te la inventas. Quiero que la salida sea un JSON con formato {synopsis: blablabla}',
      title,
    );

    return parsed['synopsis'];
  }
}
