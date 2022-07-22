// ----------------------------------------------------------
// Operation type for handling bookmarks' PATCH requests
export enum OperationType {
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
  likedPosts = 'likedPosts',
  bookmarkedPosts = 'bookmarkedPosts',
  createdPosts = 'createdPosts',
}
