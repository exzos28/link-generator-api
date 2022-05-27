import { IsString } from 'class-validator';

export class CreateUrlDto {
  @IsString()
  url: string;
}

export class EditUrlDto {
  @IsString()
  origUrl: string;
}
