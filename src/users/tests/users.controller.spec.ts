import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should call UsersService.create with correct data', async () => {
    const dto: CreateUserDto = { name: 'Test User', email: 'test@example.com' };
    await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should call UsersService.findAll', async () => {
    await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should call UsersService.findOne with correct id', async () => {
    const id = '123';
    await controller.findOne(id);
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('should call UsersService.update with correct id and data', async () => {
    const id = '123';
    const dto: UpdateUserDto = { name: 'Updated User', email: 'updated@example.com' };
    await controller.update(id, dto);
    expect(service.update).toHaveBeenCalledWith(id, dto);
  });

  it('should call UsersService.remove with correct id', async () => {
    const id = '123';
    await controller.remove(id);
    expect(service.remove).toHaveBeenCalledWith(id);
  });
});
