import { createServer, Factory, Model, Response, ActiveModelSerializer } from 'miragejs'
import faker from 'faker'

interface User {
    name: string;
    email: string;
    created_at: string;
}

export function makeServer() {
    const server = createServer({
        serializers: {
            application: ActiveModelSerializer,
        },

        models: {
            // Usando Partial não precisa conter todos os dados da interface User
            user: Model.extend<Partial<User>>({}),
        },

        factories: {
            user: Factory.extend({
                name(i: number) {
                    return `User ${i + 1}`;
                },
                email() {
                    return faker.internet.email().toLocaleLowerCase();
                },
                createdAt() {
                    return faker.date.recent(10);
                },
            })
        },

        seeds(server) {
            server.createList('user', 30);
        },

        routes() {
            this.namespace = 'api'; // api/users/
            this.timing = 750; //delay nas requisições

            this.get('/users', function (schema, request) {
                const { page = 1, per_page = 10 } = request.queryParams

                const total = schema.all('user').length

                const pageStart = (Number(page) -1) * Number(per_page)
                const pageEnd = pageStart + Number(per_page)

                const users = this.serialize(schema.all('user'))
                    .users.slice(pageStart, pageEnd)

                return new Response(
                    200,
                    {'x-total-count': String(total)},
                    { users }
                )
            });

            this.get('/users/:id');
            this.post('/users');

            //QUANDO UTILIZA NEXT:
            this.namespace = ''; // volta às rotas default do next (/api/)
            this.passthrough();
        }
    })

    return server;
}