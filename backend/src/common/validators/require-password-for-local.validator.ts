import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

/**
 * Custom validator to require password for local users (no googleId or provider).
 * Usage: @RequirePasswordForLocal()
 */
export function RequirePasswordForLocal(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'requirePasswordForLocal',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(_: any, args: ValidationArguments) {
          const obj = args.object as any;
          // If provider is present and not 'local', password is not required
          if (obj.provider && obj.provider !== 'local') {
            return true;
          }
          // For local users (provider missing or 'local'), password must be present and non-empty
          return typeof obj.password === 'string' && obj.password.trim().length > 0;
        },
        defaultMessage(args: ValidationArguments) {
          return 'Password is required for local users.';
        },
      },
    });
  };
}
