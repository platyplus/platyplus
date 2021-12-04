import { CollectionNames } from './types'

export const LIMITS: Record<CollectionNames, number> = {
  users: 10,
  posts: 100,
  comments: 1000
}

export const EXPRESSIONS: Record<
  CollectionNames,
  { value: string; label: string }[]
> = {
  users: [
    { value: 'posts[].title', label: `Title of all the user's posts` },
    {
      value: 'posts[].comments[] | length(@)',
      label: `Total number of comments of the user's posts`
    },
    {
      value: 'comments[].post.user.name',
      label: `Name of the author of the posts the user commented`
    }
  ],
  posts: [
    {
      value: 'user.name',
      label: `Name of the post's author`
    }
  ],
  comments: [{ value: 'user.name', label: `Name of the author of the comment` }]
}
