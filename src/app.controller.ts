import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  runApp(): string {
    return 'PharmacyN Backend --- Wali Ullah 😊';
  }
}
