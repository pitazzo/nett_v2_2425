import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserOutputDto } from 'src/auth/dtos/user-output.dto';
import { UserSignDto } from 'src/auth/dtos/user-sign.dto';
import { User } from 'src/auth/models/user.model';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(dto: UserSignDto): Promise<UserOutputDto> {
    const matchingUser = await this.userRepository.findOne({
      where: { username: dto.username },
    });

    if (matchingUser) {
      throw new BadRequestException(
        `Username ${dto.username} is already in use`,
      );
    }

    const user = this.userRepository.create({
      username: dto.username,
      hashedPassword: await bcrypt.hash(dto.password, 10),
      createdAt: new Date(),
    });

    await this.userRepository.save(user);

    return UserOutputDto.fromEntity(user);
  }

  async signIn(dto: UserSignDto) {
    const matchingUser = await this.userRepository.findOne({
      where: { username: dto.username },
    });

    if (
      !matchingUser ||
      !(await bcrypt.compare(dto.password, matchingUser.hashedPassword))
    ) {
      throw new UnauthorizedException('Incorrect credentials');
    }

    const token = await this.jwtService.signAsync({
      id: matchingUser.id,
    });

    return {
      token,
    };
  }
}
