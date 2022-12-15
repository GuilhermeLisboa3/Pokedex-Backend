export default {
  PostgresUrl: process.env.DATABASE_URL ?? 'postgres://postgres:<Senha>@localhost:5432/pokemon_development',
  port: process.env.PORT ?? 3001,
  jwtSecret: process.env.JWT_SECRET || 'jdksafgjuISUFGBIS==1'
}
