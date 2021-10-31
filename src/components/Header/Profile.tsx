import { Flex, Box, Text, Avatar } from '@chakra-ui/react'

interface ProfileProps {
    showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
    return (
        <Flex alignItems="center">
            {showProfileData && (
                <Box mr="4" textAlign="right">
                    <Text>Ariane Brandão Lobo</Text>
                    <Text color="gray.50" fontSize="small">
                        arii.brandao@gmail.com
                    </Text>
                </Box>
            )}

            <Avatar size="md" name="Ariane Brandão Lobo" src="https://github.com/arianebrandao.png" />
        </Flex>
    )
}