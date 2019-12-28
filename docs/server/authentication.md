# Authentication

## Login Mutation

The 1st step in the authentication flow is to perform the login action.

To login, users call the `login` mutation and pass `username` and `password`. This mutation is handled by the [`UserResolver`](../server/src/resolvers/user.resolver.ts) and uses the [`UserService.login`](../server/src/services/user.service.ts) method.

## Assign JWT Tokens

After the credentials verification passes, a JWT token is generated, stored in the database and returned in the `login` mutation.

## Authenticated Requests

After obtaining a JWT token, the user can perform authenticated requests passing the JWT token as a Basic Authorization header.

```json
"headers": {
  "authorization": "Basic <jwt_token>"
}
```

## Authentication Middleware

When an HTTP request is received, the [`AuthMiddleware`](../server/src/middlewares/auth.middleware.ts) verifies the JWT token, extracts the assigned `User` from the database, and injects the user in the `Request` object as `req.user` so it can be used by anywhere in the app.

This middleware is needed by the [`GraphqlAuthChecker`](../server/src/middlewares/auth.middleware.ts) to get the user from the HTTP request and inject it into the GraphQL context.

## GraphQL Authentication

We can authorize GraphQL queries, mutations and even specific fields in the schema. This is thanks to the `Authorize` decorator in `type-graphql` and the [`GraphqlAuthChecker`](../server/src/middlewares/auth.middleware.ts).

This is an example on the way it's used:

```typescript
@Resolver()
export class SomeResolver {
  @Authorized() // <-- Add this decorator to any query, mutation or field to run the GraphqlAuthChecker on it
  @Query(returns => String)
  protectedQuery() {
    return "This query only runs for authorized users";
  }
}
```
