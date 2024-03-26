import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { UserUpdateDto } from 'src/data/dto/user.dto';
import { GetAllUserService } from 'src/service/usecase/user/impl/get.all.user.service';

@Controller('user')
export class UserController {
  private static USER_NOT_FOUND: string = 'user not found';
  private static USERS_NOT_FOUND: string = 'users not found';
  private static ZERO: number = 0;
  constructor(private readonly getAllUserService: GetAllUserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query('skip') skip: number = 0,
    @Query('take') take: number = 10,
  ): Promise<UserUpdateDto[]> {
    const tasks = await this.getAllUserService.getAll(skip, take);

    if (!tasks || tasks.length <= UserController.ZERO) {
      this.notFound(UserController.USERS_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return tasks;
  }

  private notFound(message: string, httpStatus: HttpStatus): void {
    throw new HttpException(message, httpStatus);
  }
}
