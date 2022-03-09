import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:50051',
    package: 'user',
    protoPath: join(__dirname, './user/proto/user.proto'),
    loader: {
      longs: Number,
      bytes: String,
      keepCase: true,
      enums: String,
      oneofs: true,
    },
  },
};
