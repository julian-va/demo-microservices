import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { ConfigFieldNameEnv } from 'src/data/dto/config.enum';
import { EventDto } from 'src/data/dto/event.dto';
import { OrchestratorRepository } from '../orchestrator.repository';

@Injectable()
export class OrchestratorRepositoryImpl implements OrchestratorRepository {
  private readonly URL_API: string;
  private static ERROR_API: string =
    'An error occurred while making the request';

  constructor(
    private readonly configService: ConfigService,
    private readonly httpRepository: HttpService,
  ) {
    this.URL_API = this.configService.get<string>(ConfigFieldNameEnv.BACKEND);
  }

  async SendMessageDeadLetterQueue<T>(event: EventDto<T>): Promise<void> {
    try {
      const respose = await firstValueFrom(
        this.httpRepository.post<void>(this.URL_API, event),
      );
      return respose.data;
    } catch (error) {
      throw new HttpException(
        OrchestratorRepositoryImpl.ERROR_API,
        HttpStatus.FAILED_DEPENDENCY,
      );
    }
  }
}
