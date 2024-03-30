export abstract class UserBaseDto {
  name: string;
  email: string;
  role: string;
  password: string;
}

export class UserCreateDto extends UserBaseDto {}

export class UserUpdateDto extends UserBaseDto {
  id: number;
  creationDate: Date;
  updateDate: Date;
}
