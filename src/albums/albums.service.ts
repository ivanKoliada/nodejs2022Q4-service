import { Injectable } from '@nestjs/common';
import { BasicService } from 'src/basic/basic.service';

@Injectable()
export class AlbumsService extends BasicService {}
