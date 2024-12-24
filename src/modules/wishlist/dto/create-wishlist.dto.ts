import {
  IsArray,
  IsDateString,
  IsNumber,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateWishlistDto {
  @IsString()
  name: string;

  @IsDateString()
  dueDate: string;

  @IsArray()
  // @todo: Validate type of array items
  // Could probably use a custom decorator
  items: WishlistItemDto[];

  @IsNumber(undefined, { each: true })
  participantIds: number[];
}

export class WishlistItemDto {
  @IsString()
  name: string;

  @IsUrl()
  url: string;
}
