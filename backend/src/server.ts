import 'dotenv/config'
import fastify from 'fastify'
import cors from '@fastify/cors'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'node:path'

const app = fastify()

app.register(multipart)
// app.register(require('@fastify/multipart'))
app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})
app.register(cors, { origin: true }) // origin: ['http://localhost:3333', 'http://meusite.com.br'],
app.register(jwt, { secret: 'spacetime' })
app.register(authRoutes)
app.register(memoriesRoutes)
app.register(uploadRoutes)

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('🚀 HTTP server running on http:localhost:3333')
})
