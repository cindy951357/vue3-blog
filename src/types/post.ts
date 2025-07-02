export type PostRow = {
  id: string;
  type: 'text' | 'image';
  content: string; // 文字內容或 blob URL
};

export interface Post {
  id: string;
  postTitle: string;
  rows: PostRow[];
  isRecommend: boolean;
  time: string;
}
