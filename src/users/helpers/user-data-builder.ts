import { faker } from '@faker-js/faker'
import { UserDTO } from '@/users/dto/user.dto'

export function UserDataBuilder(props: Partial<UserDTO>): Omit<UserDTO, 'id'> {
  return {
    username: props.username ?? faker.internet.username(),
    email: props.email ?? faker.internet.email(),
    bio: props.bio ?? faker.lorem.paragraphs(5),
    isVerified: props.isVerified ?? faker.datatype.boolean(),
    createdAt: props.createdAt ?? new Date(),
  }
}
