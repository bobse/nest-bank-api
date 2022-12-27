import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

// password REGEX

// (?=(.*[a-z]){3,})               lowercase letters. {3,} indicates that you want 3 of this group
// (?=(.*[A-Z]){2,})               uppercase letters. {2,} indicates that you want 2 of this group
// (?=(.*[0-9]){2,})               numbers. {2,} indicates that you want 2 of this group
// (?=(.*[!@#$%^&*()\-__+.]){1,})  all the special characters in the [] fields. The ones used by regex are escaped by using the \ or the character itself. {1,} is redundant, but good practice, in case you change that to more than 1 in the future. Also keeps all the groups consistent
// {8,}                            indicates that you want 8 or more

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
    description:
      'Password must contain 3 lowercase letter, 1 uppercase letter, 1 special character, and at least 8 characters in total',
  })
  @IsNotEmpty()
  @Matches(
    RegExp(
      '^(?=(.*[a-z]){3,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()-__+.]){1,}).{8,}$',
    ),
    {
      message:
        'Password must contain 3 lowercase letter, 1 uppercase letter, 1 special character, and at least 8 characters in total',
    },
  )
  password: string;
}
