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
    {
      value: 'posts[].title | sort(@)',
      label: `Title of all the user's posts`
    },
    {
      value: 'posts[].comments[] | length(@)',
      label: `Total number of comments of the user's posts`
    },
    {
      value:
        'comments[].post.{author:user.name, title:title} | sort_by(@, &author)',
      label:
        'Author and title of the posts commented by the current user, ordered by author name'
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
