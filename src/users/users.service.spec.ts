import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should call repository.save on create', async () => {
    const dto: CreateUserDto = { name: 'Test User', email: 'test@example.com' };
    const user = new User(dto);
    jest.spyOn(repository, 'create').mockReturnValue(user);
    jest.spyOn(repository, 'save').mockResolvedValue(user);

    await service.create(dto);
    expect(repository.create).toHaveBeenCalledWith(dto);
    expect(repository.save).toHaveBeenCalledWith(user);
  });

  it('should return all users from findAll', async () => {
    const users = [new User({ id: '123', name: 'Test User', email: 'test@example.com' })];
    jest.spyOn(repository, 'find').mockResolvedValue(users);

    const result = await service.findAll();
    expect(result).toEqual(users);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should return a single user from findOne', async () => {
    const user = new User({ id: '123', name: 'Test User', email: 'test@example.com' });
    jest.spyOn(repository, 'findOne').mockResolvedValue(user);

    const result = await service.findOne('123');
    expect(result).toEqual(user);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '123' } });
  });

  it('should update and save a user on update', async () => {
    const dto: UpdateUserDto = { name: 'Updated User', email: 'updated@example.com' };
    const user = new User({ id: '123', name: 'Updated User', email: 'updated@example.com' });
    jest.spyOn(repository, 'preload').mockResolvedValue(user);
    jest.spyOn(repository, 'save').mockResolvedValue(user);

    const result = await service.update('123', dto);
    expect(result).toEqual(user);
    expect(repository.preload).toHaveBeenCalledWith({ id: '123', ...dto });
    expect(repository.save).toHaveBeenCalledWith(user);
  });

  it('should delete a user on remove', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

    await service.remove('123');
    expect(repository.delete).toHaveBeenCalledWith('123');
  });
});
