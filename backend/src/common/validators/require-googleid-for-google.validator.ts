import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

/**
 * Custom validator to require googleId for Google users (provider === 'google').
 * Usage: @RequireGoogleIdForGoogle()
 */
export function RequireGoogleIdForGoogle(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'requireGoogleIdForGoogle',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(_: any, args: ValidationArguments) {
          const obj = args.object as any;
          // If provider is 'google', googleId must be present and non-empty
          if (obj.provider === 'google') {
            return typeof obj.googleId === 'string' && obj.googleId.trim().length > 0;
          }
          // Otherwise, googleId is not required
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return 'googleId is required when provider is google.';
        },
      },
    });
  };
}
