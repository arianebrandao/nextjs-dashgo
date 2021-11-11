import { useQuery } from "react-query"
import { api } from "../api"

type User = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

interface GetUserResponse {
    totalCount: number;
    users: User[];
}

export async function getUsers(currentPage: number): Promise<GetUserResponse> {
    const { data, headers } = await api.get('users', {
        params: {
            page: currentPage,
        }
    })

    const totalCount = Number(headers['x-total-count'])

    const users = data.users.map(user => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            })
        }
    })

    return {
        users,
        totalCount,
    }
}

export function useUsers(currentPage: number) {
    return (
        useQuery(['users', currentPage], () => getUsers(currentPage), {
            staleTime: 1000 * 5, // 5 sec
        })
    )
}



