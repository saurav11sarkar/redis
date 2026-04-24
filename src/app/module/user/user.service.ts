import { HttpException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { fileUpload } from 'src/app/helpers/fileUploder';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getSingleUser(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    return user;
  }

  async deleteUser(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    const result = await this.userModel.findByIdAndDelete(id);
    return result;
  }

  async getProfile(id: string) {
    const result = await this.userModel.findById(id);
    if (!result) {
      throw new HttpException('User not found', 404);
    }
    return result;
  }

  async updateMyProfile(
    id: string,
    updateUserDto: UpdateUserDto,
    file?: Express.Multer.File,
  ) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    if (file) {
      const uploaded = await fileUpload.uploadToCloudinary(file);
      updateUserDto.profilePicture = uploaded.url;
    }
    const result = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });

    return result;
  }
}
