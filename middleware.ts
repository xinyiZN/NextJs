import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  //使用了 Middleware 中的 matcher 选项来指定它应在特定路径上运行
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
