import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  showRoutes(): string {
    return '<h1>Routes are on /category</h1>';
  }
}
