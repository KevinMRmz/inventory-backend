import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  validateSync,
  Max,
  Min,
  IsNotEmpty,
} from 'class-validator';
import { Environment } from '@common/types';

class EnvironmentVariables {
  @IsNotEmpty()
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNotEmpty()
  @IsNumber()
  @Max(65535)
  @Min(0)
  PORT: number;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
