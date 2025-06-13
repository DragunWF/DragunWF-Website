export function getBlogPostPageChunks(data, blogPostsPerPage) {
  let postPageChunks = [];
  let postsInOnePage = [];
  for (let i = 0, blogCount = 1; i < data.length; i++, blogCount++) {
    postsInOnePage.push(data[i]);
    if (blogCount % blogPostsPerPage === 0) {
      postPageChunks.push([...postsInOnePage]);
      postsInOnePage = [];
    }
  }
  if (postsInOnePage.length > 0) {
    postPageChunks.push([...postsInOnePage]);
  }
  return postPageChunks;
}
