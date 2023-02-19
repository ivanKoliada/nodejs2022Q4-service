import {
  ConsoleLogger,
  createParamDecorator,
  ExecutionContext,
  LogLevel,
  SetMetadata,
} from '@nestjs/common';
import { IS_PUBLIC_ACCESS, LOG_LEVELS, PATH_TO_LOG_FOLDER } from '../constants';
import 'dotenv/config';
import { LoggingService } from '../logger/logging.service';

export const Public = () => SetMetadata(IS_PUBLIC_ACCESS, true);

export const BodyHasRefreshToken = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const body = ctx.switchToHttp().getRequest().body;

    if (Object.keys(body).length !== 1) {
      return true;
    }

    return body;
  },
);

// export const IsLevelEnabled = (
//   target: LoggingService,
//   propertyKey: LogLevel,
//   descriptor: PropertyDescriptor,
// ) => {
//   const original = descriptor.value;

//   descriptor.value = async function (message: string) {
//     if (LOG_LEVELS[process.env.LOG_LEVEL].includes(propertyKey)) {
//       // return original(message);
//     }
//   };
// };

// export const LevelEnabled = (
//   target: ConsoleLogger,
//   propertyKey: LogLevel,
//   descriptor: PropertyDescriptor,
// ) => {
//   return (descriptor.value = (...args: any[]) => {
//     return descriptor.value.value.apply(this, args);
//   });
// };

// export const PrintLog = (target, methodName, descriptor) => {
//   const className = target.constructor;
//   const nnn = new className();
//   const original = descriptor.value;

//   descriptor.value = new Proxy(original, {
//     apply: function (target, thisArg, args) {
//       original(...args);
//       return nnn.logToFile(...args, methodName);
//       // Logger.log(
//       //   `Call with args: ${JSON.stringify(args)}`,
//       //   `${className}#${methodName}`,
//       // );
//       // const result = target.apply(thisArg, args);
//       // Logger.log(
//       //   `Return: ${JSON.stringify(result)}`,
//       //   `${className}#${methodName}`,
//       // );
//       // return result;
//     },
//   });
// };

// function consoleLogger(target: Function, key:string, value:any)
// {
//   return value: (...args: any[]) =>
//   {
//      var a = args.map(a => JSON.stringify(a)).join();
//      var result = value.value.apply(this, args);
//      var r = JSON.stringify(result);

//      console.log('called method' + key + ' with args ' + a + ' returned result ' + r);

//      return result;
//   }
// }
