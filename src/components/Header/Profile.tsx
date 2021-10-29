import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";


export function Profile() {
  return (
    <Flex alignItems="center">
      <Box mr="4" textAlign="right">
        <Text>Ariane Brandão Lobo</Text>
        <Text color="gray.50" fontSize="small">
          arii.brandao@gmail.com
        </Text>
      </Box>

      <Avatar size="md" name="Ariane Brandão Lobo" src="https://github.com/arianebrandao.png" />
    </Flex>
  )
}