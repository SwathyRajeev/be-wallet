import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserLocationService } from './user-location.service';
import { CreateUserLocationDto } from './dto/create-user-location.dto';
import { UpdateUserLocationDto } from './dto/update-user-location.dto';
import { Crud, CrudController } from '@nestjsx/crud';
import { UserLocation } from './entities/user-location.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('UserLocations - APP & Admin Panel')
@ApiBearerAuth('JWT')
@Crud({
  model: {
    type: UserLocation,
  },
  dto: {
    create: CreateUserLocationDto,
    update: UpdateUserLocationDto,
  },
  routes: {
    only: ['createOneBase', 'getManyBase', 'updateOneBase', 'deleteOneBase'],
    createOneBase: {
      decorators: [UseGuards(AuthGuard())],
    },
    getManyBase: {
      decorators: [UseGuards(AuthGuard())],
    },
    updateOneBase: {
      decorators: [UseGuards(AuthGuard())],
    },
    deleteOneBase: {
      decorators: [UseGuards(AuthGuard())],
    },
  },
  query: {
    exclude: ['created_date', 'updated_date', 'deleted_At'],
  },
})
@Controller('user-location')
@UseGuards(AuthGuard())
export class UserLocationController implements CrudController<UserLocation> {
  constructor(public service: UserLocationService) { }

  @ApiOperation({ summary: 'Get UserLocations with district & Centers - for APP use' })
  @Get('all')
  async getUserLocations() {
    return await this.service.getUserLocations();
  }

}
