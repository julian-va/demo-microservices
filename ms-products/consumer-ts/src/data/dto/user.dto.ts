export class UserBaseDto {
  name: string;
  email: string;
  role: string;
}

export class UserCreateDto extends UserBaseDto {
  password: string;
}

export class UserUpdateDto extends UserBaseDto {
  id: number;
  creationDate: Date;
}
