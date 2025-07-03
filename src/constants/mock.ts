import { v4 as uuidv4 } from 'uuid'
import type { Post, PostRow } from '@/types/post';
import type { Comment } from '@/types/comment';

const topics = ['藝術', '旅遊', '科技', '心理健康', '美食', '音樂', '設計', '電影', '攝影', '歷史']
const descriptions = {
  '藝術': '藝術是一種表達與感受的方式，涵蓋繪畫、雕塑、裝置等各類型態，帶來視覺與心靈的震撼。',
  '旅遊': '旅遊能開闊眼界、增廣見聞，探索不同文化與風景，是放鬆與學習的完美結合。',
  '科技': '科技改變生活，從人工智慧、區塊鏈到太空探索，科技推動著人類文明不斷前進。',
  '心理健康': '心理健康是現代人關注的重要課題，從自我覺察到療癒，每一步都值得關心與練習。',
  '美食': '美食是文化的體現，也是生活的享受，探索各地料理，滿足味蕾與好奇心。',
  '音樂': '音樂跨越語言與國界，是情感的共鳴，從古典到流行，各自動人。',
  '設計': '設計講求美感與功能的融合，從產品到空間，都關乎生活體驗的品質。',
  '電影': '電影是時間的藝術，透過畫面與劇情傳遞故事與情感，是娛樂也是思考。',
  '攝影': '攝影捕捉瞬間，凝結記憶，也是觀察世界的一種方式。',
  '歷史': '歷史是一面鏡子，了解過去才能看清未來，從古文明到近代史皆值得探索。'
}

const generateTextRows = (topic: string, index: number): PostRow[] => {
  const base = descriptions[topic] || '這是有關某個主題的內容。'
  const numParagraphs = Math.floor(Math.random() * 3) + 2 // 2~4 段
  return Array.from({ length: numParagraphs }, (_, pIdx) => ({
    id: uuidv4(),
    type: 'text',
    content: `${base}\n\n段落 ${pIdx + 1}：我們在這篇第 ${index + 1} 號「${topic}」文章中，將深入探索不同面向的觀點與經驗。`
  }))
}

const generateImageRows = (index: number): PostRow[] => {
  const numImages = Math.floor(Math.random() * 3) + 1 // 1~3 張圖
  return Array.from({ length: numImages }, (_, j) => ({
    id: uuidv4(),
    type: 'image',
    content: `https://picsum.photos/seed/${index * 10 + j}/400/300`
  }))
}

const mixRows = (textRows: PostRow[], imageRows: PostRow[]): PostRow[] => {
  const all = [...textRows, ...imageRows]
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[all[i], all[j]] = [all[j], all[i]]
  }
  return all
}

export const MOCK_POSTS: Post[] = Array.from({ length: 20 }, (_, i) => {
  const topic = topics[i % topics.length]
  const textRows = generateTextRows(topic, i)
  const imageRows = generateImageRows(i)
  const allRows = mixRows(textRows, imageRows)
  const randomSeconds = Math.floor(Math.random() * 60); //隨機增加一些秒數，形成差異
  const now = new Date()
  now.setSeconds(randomSeconds)

  return {
    id: `post-${i + 1}`,
    postTitle: `${topic}探索 #${i + 1}`,
    rows: allRows,
    isRecommend: i % 2 === 0,
    time: now.toLocaleString(),
    themeTag: topic,
    author: 'Rose',
  }
})

const authors = ['小明', '阿花', 'David', 'Lily', '匿名者', '阿強']
const commentsText = [
  '這篇寫得真好！',
  '受教了，謝謝分享。',
  '我也有類似的經驗。',
  '想了解更多這方面的內容。',
  '超實用！已收藏！',
  '讚讚讚！！',
]

const getRandomItem = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)]

export const MOCK_COMMENTS: Comment[] = MOCK_POSTS.flatMap(post => {
  const numComments = Math.floor(Math.random() * 4) + 1 // 每篇 1~4 則留言
  const randomSeconds = Math.floor(Math.random() * 60); //隨機增加一些秒數，形成差異
  const now = new Date();
  now.setSeconds(randomSeconds);

const time = now.toLocaleString()
  return Array.from({ length: numComments }, () => ({
    id: uuidv4(),
    postId: post.id,
    author: getRandomItem(authors),
    content: getRandomItem(commentsText),
    time: now.toLocaleString(),
  }))
})

