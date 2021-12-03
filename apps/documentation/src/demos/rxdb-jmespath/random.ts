import faker from 'faker'
import { RxDocument } from 'rxdb'
import { LIMITS } from './params'
import { Post, User, Comment } from './schema'

const address = () => ({
  street: faker.address.streetAddress(),
  city: faker.address.city(),
  country: faker.address.country(),
  zipcode: faker.address.zipCode()
})

export const createUser = (id: number): User => {
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()

  return {
    id: id.toString(),
    name: `${firstName} ${lastName}`,
    email: faker.internet.email(firstName, lastName),
    address: address(),
    posts: [],
    comments: []
  }
}

export const createPost = (id: number): Post => {
  const userId = faker.datatype.number(LIMITS.users - 1)
  return {
    id: id.toString(),
    user: userId.toString(),
    title: faker.lorem.words(3),
    body: faker.lorem.paragraph(),
    comments: []
  }
}

export const createComment = (id: number): Comment => {
  const userId = faker.datatype.number(LIMITS.users - 1)
  const postId = faker.datatype.number(LIMITS.posts - 1)
  return {
    id: id.toString(),
    user: userId.toString(),
    post: postId.toString(),
    body: faker.lorem.sentences(3)
  }
}

export const UPDATES = {
  users: () => {
    const first = faker.name.firstName()
    const last = faker.name.lastName()
    return {
      //   id: faker.datatype.number(LIMITS.users - 1).toString(),
      name: `${first} ${last}`,
      email: faker.internet.email(first, last),
      address: address()
    }
  },
  comments: () => ({
    // id: faker.datatype.number(LIMITS.comments - 1).toString(),
    body: faker.lorem.sentences(3)
  }),
  posts: () => ({
    // id: faker.datatype.number(LIMITS.posts - 1).toString(),
    title: faker.lorem.words(3),
    body: faker.lorem.paragraph()
  })
}
