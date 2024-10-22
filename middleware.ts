import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
/**
 * NextAuth(authConfig)：初始化 NextAuth.js 实例，使用 authConfig 中的参数配置身份验证逻辑，比如 OAuth 提供商和自定义回调等。

NextAuth(authConfig).auth：auth 是 NextAuth.js 中的一个函数，它用于处理身份验证请求。它接管了请求中的身份验证逻辑，比如 OAuth 登录、会话管理等。
 */
export default NextAuth(authConfig).auth;


/**
 * 通过使用 NextAuth(authConfig).auth，中间件会在匹配的路径下执行 NextAuth.js 的身份验证逻辑。在 Next.js 中，中间件执行的顺序是在页面或 API 路由处理之前，确保用户的身份信息在进入目标路径前已验证完毕。
 */
export const config = {
  //使用了 Middleware 中的 matcher 选项来指定它应在特定路径上运行
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
