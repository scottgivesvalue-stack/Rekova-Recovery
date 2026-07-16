export interface TutorialVideo {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail?: string;
}

// Add your actual educational video links here.
export const tutorialVideos: TutorialVideo[] = [
  {
    id: 'theragun-prime-plus',
    title: 'Theragun Prime Plus Guide',
    description: 'Learn how to use the Theragun Prime Plus for muscle recovery and tension relief.',
    url: 'https://drive.google.com/file/d/1iRnXX4CewBxmg8MQTjkjHy08_LdxlY2L/view?usp=share_link',
    thumbnail: '/guides/theragun-prime-plus.png',
  },
  {
    id: 'glo-led-mask',
    title: 'GLO LED Mask Guide',
    description: 'Get the best results from the GLO LED Mask with step-by-step usage and aftercare tips.',
    url: 'https://drive.google.com/file/d/1SK-AF62hREQBorn3g16IG-vuZZKwRJBo/view?usp=share_link',
    thumbnail: 'https://www.rekovarecovery.com/glo-led-mask.jpg',
  },
  {
    id: 'depuffing-wand',
    title: 'Depuffing Wand Guide',
    description: 'Discover how to use the Depuffing Wand for facial recovery and depuffing therapy.',
    url: 'https://drive.google.com/file/d/1xHlVgRRlfebIGEkK5WkU2p3Tk8ptP9Kw/view?usp=share_link',
    thumbnail: '/guides/depuffing-wand.webp',
  },
  {
    id: 'jetboots-prime',
    title: 'Jetboots Prime Guide',
    description: 'Explore the Jetboots Prime recovery experience and learn how to use it safely and effectively.',
    url: 'https://drive.google.com/file/d/1KyvJyNJstxEJgY1DhXNt_zyB1uKrtXbj/view?usp=share_link',
    thumbnail: 'https://www.rekovarecovery.com/jetboots-prime.jpg',
  },
  {
    id: 'thermback-led',
    title: 'ThermBack LED Guide',
    description: 'Watch the ThermBack LED tutorial to learn how to use the heated back wrap for recovery and comfort.',
    url: 'https://www.youtube.com/watch?v=rJkcRA6a1qo&t=31s',
    thumbnail: 'https://www.rekovarecovery.com/thermback-led.jpg',
  },
];
