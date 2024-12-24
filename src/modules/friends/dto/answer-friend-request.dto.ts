import { IsBoolean } from 'class-validator';

export class AnswerFriendRequestDto {
  @IsBoolean()
  accept: boolean;
}
