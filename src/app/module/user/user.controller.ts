import {
  Controller,
  Get,
  Body,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  Param,
  Put,
  Delete,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import AuthGuard from 'src/app/middlewares/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';

import { UserRole } from './user-role.enum';
import { fileUpload } from 'src/app/helpers/fileUploder';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @ApiOperation({
    summary: 'Get the profile of the currently authenticated user',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('admin', 'user'))
  @HttpCode(HttpStatus.OK)
  async getProfile(@Req() req: Request) {
    const user = await this.userService.getProfile(req.user!.id);
    return {
      message: 'User fetched successfully',
      data: user,
    };
  }

  @Put('profile')
  @ApiOperation({
    summary: 'Update the profile of the currently authenticated user',
  })
  @ApiBearerAuth('access-token')
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard(UserRole.ADMIN, UserRole.USER))
  @UseInterceptors(FileInterceptor('profilePicture', fileUpload.uploadConfig))
  @ApiBody({ type: UpdateUserDto })
  @HttpCode(HttpStatus.OK)
  async updateProfile(
    @Req() req: Request,
    @Body() updateUserDto: Partial<UpdateUserDto>,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const result = await this.userService.updateMyProfile(
      req.user!.id,
      updateUserDto,
      file,
    );
    return {
      message: 'User updated successfully',
      data: result,
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get single user by id',
  })
  @ApiQuery({
    name: 'id',
    required: true,
    type: String,
    example: '',
    description: 'User id',
  })
  @HttpCode(HttpStatus.OK)
  async getSingleUser(@Param('id') id: string) {
    const result = await this.userService.getSingleUser(id);

    return {
      message: 'User fetched successfully',
      data: result,
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete user by id',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('admin'))
  @ApiQuery({
    name: 'id',
    required: true,
    type: String,
    example: '',
    description: 'User id',
  })
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param('id') id: string) {
    const result = await this.userService.deleteUser(id);

    return {
      message: 'User deleted successfully',
      data: result,
    };
  }
}
