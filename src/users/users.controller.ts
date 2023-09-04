import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, Query, Session, UseInterceptors } from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';


@Controller('auth')
export class UsersController {
    constructor(private userService: UsersService, private authService: AuthService) { }

    @Post('/create')
    createUsers(@Body() body: createUserDto) {
        this.userService.create(body.email, body.password)
    }

    @Serialize(UserDto)
    @Get('/:id')
    findUser(@Param('id') id: string) {
        return this.userService.findOne(parseInt(id));
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.userService.find(email);
    }

    @Delete(':id')
    removeUser(@Param('id') id: string) {
        return this.userService.remove(parseInt(id));
    }

    @Patch(':id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.userService.update(parseInt(id), body)
    }

    @Post('/signup')
    async signup(@Body() body: createUserDto, @Session() session: any) {
        const user = await this.authService.signup(body.email, body.password);
        session.userId = user.id;

    }

    @Post('/signin')
    async signin(@Body() body: createUserDto, @Session() session: any) {
        const user: any = await this.authService.signin(body.email, body.password);
        if (user?.id) {
            session.userId = user.id;
        }

    }
}