export default class Post {
    constructor(userId, title, description, createdAt, updatedAt, media, likes) {
      this.userId = userId;
      this.title = title;
      this.description = description;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.media = media;
      this.likes = likes;
    }
  }