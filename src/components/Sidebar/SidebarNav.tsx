import { Stack, Box } from '@chakra-ui/react'

import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from 'react-icons/ri'

import { NavLink } from './NavLink'
import { NavSection } from './NavSection'

export function SidebarNav() {
    return (
        <Box spacing="12" align="self-start" >
            <NavSection title="Geral">
                <NavLink icon={RiDashboardLine}>Dashboard</NavLink>
                <NavLink icon={RiContactsLine}>Usuários</NavLink>
            </NavSection>

            <NavSection title="Automação">
                <NavLink icon={RiInputMethodLine}>Formulários</NavLink>
                <NavLink icon={RiGitMergeLine}>Automação</NavLink>
            </NavSection>
        </Box>
    )
}