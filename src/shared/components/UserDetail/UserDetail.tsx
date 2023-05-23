import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { ArrowForwardIcon, Box, HStack, Link, VStack, Text } from 'native-base';
import { Avatar } from 'native-base';
import { UserDetailProps } from '../../../models/UserDetailProps';
import { palette } from '../../palette';

const UserDetail: FC<UserDetailProps> = ({user, onPress}) => {
  
  return (
    <Box
      marginY='24px'
      bg='white'
      px='5'
      py='6'
      rounded='2xl'
      _text={{
        fontSize: 'md',
        fontWeight: 'medium',
        color: 'black',
        textAlign: 'center',
      }}
    >
      <HStack justifyContent={'space-around'}>
        <Box>
          <VStack space={2}>
            <HStack space={3} alignItems='center'>
              <Avatar bg='primary.600' alignSelf='center' size='sm'>
                <Text color='white' fontSize='xs'>
                  {user.displayName.split(' ')[0].charAt(0) +
                    user.displayName.split(' ')[1].charAt(0)}
                </Text>
              </Avatar>
              <Text fontSize='lg' style={styles.title}>
                {user.displayName.length >= 15 ? user.displayName.substring(0,13) + '...' : user.displayName}
              </Text>
            </HStack>
            <Text fontSize='lg' color={'gray.500'} style={[styles.text]}>
              {user.username}@gmail.com
            </Text>
          </VStack>
        </Box>
        <Box style={{padding: 1}}>
            <Link
              alignItems='center'
              onPress={onPress}
              _text={{
                color: 'primary.600',
              }}
            >
              <Text style={styles.text}>Log Out</Text>
              <ArrowForwardIcon ml={1} size='sm' color={palette.primary.default} />
            </Link>
        </Box>
      </HStack>
    </Box>
    
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Inter-SemiBold'
  },
  text: {
    color: palette.primary.default,
    fontSize: 16,
    fontFamily: 'Inter-Regular'
  }
})

export default UserDetail;
