import { createServer, Factory, Model } from 'miragejs'
import faker from 'faker'

interface User {
    name: string;
    email: string;
    created_at: string;
}

export function makeServer() {
    const server = createServer({
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
            server.createList('user', 50);
        },

        routes() {
            this.namespace = 'api'; // api/users/
            this.timing = 750; //delay nas requisições

            this.get('/users');
            this.post('/users');

            //QUANDO UTILIZA NEXT:
            this.namespace = ''; // volta às rotas default do next (/api/)
            this.passthrough();
        }
    })

    return server;
}