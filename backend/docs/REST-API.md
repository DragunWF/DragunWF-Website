# REST API Endpoints

## Table of Contents

- [Blog Posts](#blog-posts)
  - [Get All Blogs (Paginated)](#get-all-blog-posts-paginated)
  - [Get Blog Post by ID](#get-blog-post-by-id)
- [Anonymous Messages](#anonymous-messages)
  - [Send Anonymous Message](#send-anonymous-message)

# Blog Posts

## Get All Blog Posts (Paginated)

- **Method:** `GET`
- **Endpoint:** `/api/blog_posts`
- **Successful HTTP Status Code:** `200`

### Query Parameters

| Parameter   | Type    | Default | Description                        |
| ----------- | ------- | ------- | ---------------------------------- |
| `page`      | integer | 1       | The page number to retrieve        |
| `page_size` | integer | 4       | Number of posts per page (max: 20) |

### Examples

- Get first page: `/api/blog_posts`
- Get page 2 with 6 posts: `/api/blog_posts?page=2&page_size=6`
- Get specific page: `/api/blog_posts?page=3`

### Return Body

```json
{
  "results": [
    {
      "id": 1,
      "title": "My First Post",
      "description": "This is my first blog post",
      "image_link": "https://example.com/image.jpg",
      "date_created": "2025-06-13T10:30:00Z",
      "date_updated": "2025-06-13T10:30:00Z"
    },
    {
      "id": 2,
      "title": "My Second Post",
      "description": "This is my second blog post",
      "image_link": null,
      "date_created": "2025-06-14T15:45:00Z",
      "date_updated": "2025-06-14T15:45:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 5,
    "total_count": 18,
    "page_size": 4,
    "has_next": true,
    "has_previous": false,
    "next_page": 2,
    "previous_page": null
  }
}
```

### Pagination Object Fields

| Field           | Type         | Description                                     |
| --------------- | ------------ | ----------------------------------------------- |
| `current_page`  | integer      | Current page number                             |
| `total_pages`   | integer      | Total number of pages available                 |
| `total_count`   | integer      | Total number of blog posts                      |
| `page_size`     | integer      | Number of posts per page                        |
| `has_next`      | boolean      | Whether there is a next page                    |
| `has_previous`  | boolean      | Whether there is a previous page                |
| `next_page`     | integer/null | Next page number (null if no next page)         |
| `previous_page` | integer/null | Previous page number (null if no previous page) |

## Get Blog Post by ID

- **Method:** `GET`
- **Endpoint:** `/api/blog_posts/<int:post_id>`
- **Successful HTTP Status Code:** `200`

### Return Body

```json
{
  "id": 1,
  "title": "My First Post",
  "description": "This is my first blog post",
  "date_created": "2025-06-13T10:30:00Z",
  "date_updated": "2025-06-13T10:30:00Z"
}
```

# Anonymous Messages

## Send Anonymous Message

- **Method:** `POST`
- **Endpoint:** `/api/send_anonymous_message`
- **Successful HTTP Status Code:** `201`

### Return Body

```json
{
  "message": "Message sent successfully",
  "data": {
    "id": 1,
    "content": "Hello, this is my anonymous message!",
    "date_sent": "2025-06-13T10:30:00Z"
  }
}
```
