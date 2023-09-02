import { Body, Controller, Post } from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class UsersController {

    @Post('/signup')
    createUsers(@Body() body: createUserDto) {
        console.log({ body });

    }

}
