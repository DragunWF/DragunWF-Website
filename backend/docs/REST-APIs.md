# REST API Endpoints

## Table of Contents

- [Blog Posts](#blog-posts)
  - [Get All Blogs](#get-all-blog-posts)
  - [Get Blog Post by ID](#get-blog-post-by-id)
- [Anonymous Messages](#anonymous-messages)
  - [Send Anonymous Message](#send-anonymous-message)

# Blog Posts

## Get All Blog Posts

- **Method:** `GET`
- **Endpoint:** `/api/blog_posts`
- **Successful HTTP Status Code:** `200`

### Return Body

```json
[
  {
    "id": 1,
    "title": "My First Post",
    "description": "This is my first blog post",
    "date_created": "2025-06-13T10:30:00Z",
    "date_updated": "2025-06-13T10:30:00Z"
  }
]
```

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
