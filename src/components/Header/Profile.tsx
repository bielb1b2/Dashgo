import { Box, Flex, Text, Avatar } from "@chakra-ui/react";

interface ProfileProps {
    showProfileData?: boolean;
}

export function Profile({ showProfileData }: ProfileProps) {
    return(
        <Flex
            align="center"
        >
            {showProfileData && (
                <Box mr="4" textAlign="right">
                    <Text>Gabriel Vitor De Souza</Text>
                    <Text
                        color="gray.300" 
                        fontSize="small" 
                    >
                        Gabrielvt.souza@hotmail.com
                    </Text>
                </Box>
            )}
            <Avatar size="md" name="Gabriel Vitor" src="https://github.com/bielb1b2.png"/>
        </Flex>
    );
}