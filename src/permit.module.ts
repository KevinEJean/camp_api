import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Permit } from 'permitio';

@Global()
@Module({
  providers: [
    {
      provide: Permit,
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        new Permit({
          pdp: 'https://cloudpdp.api.permit.io',
          token: config.getOrThrow<string>('PERMIT_IO_TOKEN'),
        }),
    },
  ],
  exports: [Permit],
})
export class PermitModule { }