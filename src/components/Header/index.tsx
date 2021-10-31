import { Flex, useBreakpointValue } from '@chakra-ui/react'

import { SearchBox } from './SearchBox'
import { NotificationsNav } from './NotificationsNav'
import { Profile } from './Profile'
import { Logo } from './Logo'

export function Header() {

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      alignItems="center"
      px="6"
    >
      <Logo />

      { isWideVersion && <SearchBox /> }

      <Flex alignItems="center" ml="auto">
        <NotificationsNav />
        <Profile showProfileData={isWideVersion} />
      </Flex>

    </Flex>
  )
}