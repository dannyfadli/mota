export interface PostMedia {
  id: number;
  media_url: string;   // <- dipakai di ProfilePage dan PostDetailModal
}

export interface PostDetail {
  id: number;
  user_id: number;
  content: string;     // <- dipakai sebagai caption di kedua komponen
  created_at: string;
  like_count: number;  // <- dipakai di modal
  media: PostMedia[];  // <- dipakai untuk grid
}
