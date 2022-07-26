// ----------------------------------------------------------
// Operation type for handling bookmarks' PATCH requests
export enum RequestOperationType {
  ADD = 'add',
  REMOVE = 'remove',
}

// ----------------------------------------------------------
// Sorting data - bookmarks
export enum SortOptions {
  addedAt = 'addedAt',
  createdAt = 'createdAt',
  likes = 'likes',
  author = 'author',
  language = 'language',
}

export enum SortDirection {
  asc = 'asc',
  desc = 'desc',
}

// ----------------------------------------------------------
// Update user data endpoints
export enum UpdateUserEndpoint {
  username = 'username',
  backgroundImage = 'backgroundImage',
  motto = 'motto',
  bio = 'bio',
  likedPosts = 'likedPosts',
  bookmarkedPosts = 'bookmarkedPosts',
  createdPosts = 'createdPosts',
}

// ----------------------------------------------------------
// Update post data endpoints
export enum UpdatePostEndpoint {
  backgroundImage = 'backgroundImage',
  comment = 'comment',
  hashtags = 'hashtags',
}
