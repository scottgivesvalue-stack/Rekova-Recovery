export interface RecoveryItem {
  id: string;
  name: string;
  short: string;
  usage: string;
  benefits: string[];
  imageUrl: string;
  videoUrl?: string;
}

export const recoveryItems: RecoveryItem[] = [
  {
    id: 'normatec',
    name: 'Normatec Compression Boots',
    short: 'Pneumatic compression for faster muscle recovery.',
    usage:
      'Wear the boots after training or travel. Start at a gentle pressure and allow the pulses to move fluid out of your legs to reduce soreness.',
    benefits: [
      'Reduces soreness and inflammation',
      'Flushes lactic acid buildup',
      'Supports faster recovery between sessions',
    ],
    imageUrl: 'https://www.rekovarecovery.com/normatec-kit.jpg',
  },
  {
    id: 'redlight',
    name: 'Clearlight Red Light Tower',
    short: 'Full-body red and near-infrared light therapy for cellular recovery.',
    usage:
      'Stand comfortably in front of the tower for 10-20 minutes. Keep skin exposed for best results and stay hydrated.',
    benefits: [
      'Speeds cellular repair',
      'Reduces inflammation',
      'Supports sleep and recovery regulation',
    ],
    imageUrl: 'https://www.rekovarecovery.com/redlight-kit.jpg',
  },
  {
    id: 'percussion',
    name: 'Theragun Prime Plus',
    short: 'Percussive therapy for targeted muscle relief.',
    usage:
      'Apply the device slowly to tight areas for 1-2 minutes. Start on low intensity and increase as tolerated.',
    benefits: [
      'Releases tight muscles',
      'Improves blood flow',
      'Speeds recovery and reduces soreness',
    ],
    imageUrl: 'https://www.therabody.com/cdn/shop/files/Theragun_prime_plus-1.png?v=1742150320',
    videoUrl: 'https://drive.google.com/file/d/1iRnXX4CewBxmg8MQTjkjHy08_LdxlY2L/view?usp=share_link',
  },
  {
    id: 'jetboots-prime',
    name: 'Jetboots Prime',
    short: 'Advanced compression boots that elevate recovery after hard training.',
    usage:
      'Slip into the jet boots after activity, choose your intensity, and let the pulsing compressions flush tired legs.',
    benefits: [
      'Speeds recovery with dynamic compression',
      'Reduces soreness and swelling',
      'Supports circulation after travel or training',
    ],
    imageUrl: 'https://www.therabody.com/cdn/shop/files/Jetboots-Prime-PLP-Thumbnail-1-New.webp',
    videoUrl: 'https://drive.google.com/file/d/1KyvJyNJstxEJgY1DhXNt_zyB1uKrtXbj/view?usp=share_link',
  },
  {
    id: 'maskglo',
    name: 'TheraFace Mask Glo',
    short: 'LED skin therapy for recovery and radiance.',
    usage:
      'Place the mask on clean skin and use the recommended light mode for 4-12 minutes before bed.',
    benefits: [
      'Enhances skin recovery',
      'Improves skin tone and texture',
      'Supports travel-ready glow',
    ],
    imageUrl: 'https://www.therabody.com/cdn/shop/files/Mask-Glo-PDP-New-Hero-1.webp?v=1761354804',
    videoUrl: 'https://drive.google.com/file/d/1SK-AF62hREQBorn3g16IG-vuZZKwRJBo/view?usp=share_link',
  },
  {
    id: 'thermback',
    name: 'Therabody ThermBack LED',
    short: 'Four therapies in one heated back wrap.',
    usage:
      'Wrap around the lower back, select the mode, and relax for up to 30 minutes. Use after long travel or heavy training.',
    benefits: [
      'Reduces stiffness',
      'Boosts circulation',
      'Delivers heat, vibration, and infrared therapy',
    ],
    imageUrl: 'https://www.therabody.eu/cdn/shop/files/ThermBack-LED-Hero-3.webp?v=1760130926&width=800',
    videoUrl: 'https://www.youtube.com/watch?v=rJkcRA6a1qo&t=31s',
  },
  {
    id: 'depuffing',
    name: 'TheraFace Depuffing Wand',
    short: 'Cold and heat therapy for under-eye recovery.',
    usage:
      'Glide gently beneath the eyes or across the face after charging. Use cool therapy for puffiness or heat for tension release.',
    benefits: [
      'Reduces puffiness',
      'Supports facial circulation',
      'Refreshes tired skin after travel',
    ],
    imageUrl: 'https://www.therabody.com/cdn/shop/files/Wand-PDP-Hero-5-New.webp?v=1772817596',
    videoUrl: 'https://drive.google.com/file/d/1xHlVgRRlfebIGEkK5WkU2p3Tk8ptP9Kw/view?usp=share_link',
  },
  {
    id: 'coldplunge',
    name: 'Cold Plunge Upgrade',
    short: 'Immersion therapy to accelerate recovery.',
    usage:
      'Use a cold plunge for 2-5 minutes after light movement. Start slowly and let the cold reset your circulation.',
    benefits: [
      'Reduces inflammation',
      'Boosts circulation',
      'Improves mental clarity and recovery feel',
    ],
    imageUrl: 'https://www.rekovarecovery.com/coldplunge-kit.jpg',
  },
];
