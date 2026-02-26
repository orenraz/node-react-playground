import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UserService } from '../modules/user/user.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.get(UserService);

  await userService.create({
    userId: 'user-1',
    firstName: 'John',
    lastName: 'Doe',
    gender: 'Male',
    age: 30,
  });

  console.log('User migration completed.');
  await app.close();
}

bootstrap();