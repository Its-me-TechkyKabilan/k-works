// K-Works experiment card data.
// Place your experiment cover images inside public/experiments/[experiment-folder]/cover.jpg
// For now, each experiment card supports one cover image only. Multi-photo galleries can be added later.
// Or update the coverImage path in this data file if you use different folder names.
// This page does not need a backend; it reads this simple frontend data file.
// Images are not analyzed automatically. Edit titles, descriptions, tags, coverImage, and status manually here.
export const experiments = [
  {
    id: 'color-grading',
    title: 'Color Grading',
    description: 'Testing tones, moods, shadows, highlights, and cinematic color styles.',
    tags: ['Edit', 'Mood', 'Color'],
    coverImage: '/experiments/color-grading/cover.jpg',
    status: 'In progress',
  },
  {
    id: 'before-after',
    title: 'Before / After',
    description: 'Comparing raw captures with edited final visuals.',
    tags: ['Retouch', 'Edit', 'Comparison'],
    coverImage: '/experiments/before-after/cover.jpg',
    status: 'Study',
  },
  {
    id: 'ai-visual-ideas',
    title: 'AI Visual Ideas',
    description: 'Exploring how AI can support visual storytelling, mood creation, and creative direction.',
    tags: ['AI', 'Concept', 'Visual'],
    coverImage: '/experiments/ai-visual-ideas/cover.jpg',
    status: 'Concept',
  },
  {
    id: 'poster-edits',
    title: 'Poster Edits',
    description: 'Turning photos into cinematic posters, event posters, and creative compositions.',
    tags: ['Poster', 'Design', 'Edit'],
    coverImage: '/experiments/poster-edits/cover.jpg',
    status: 'Design lab',
  },
  {
    id: 'reel-covers',
    title: 'Reel Covers',
    description: 'Designing thumbnails and covers for Instagram reels and short-form videos.',
    tags: ['Reels', 'Thumbnail', 'Social'],
    coverImage: '/experiments/reel-covers/cover.jpg',
    status: 'Drafting',
  },
  {
    id: 'cinematic-crops',
    title: 'Cinematic Crops',
    description: 'Experimenting with aspect ratios, framing, and movie-style compositions.',
    tags: ['Frame', 'Crop', 'Cinema'],
    coverImage: '/experiments/cinematic-crops/cover.jpg',
    status: 'Frame test',
  },
  {
    id: 'motion-concepts',
    title: 'Motion Concepts',
    description: 'Ideas for video edits, transitions, slow motion, and visual rhythm.',
    tags: ['Video', 'Motion', 'Edit'],
    coverImage: '/experiments/motion-concepts/cover.jpg',
    status: 'Motion lab',
  },
  {
    id: 'web-visual-experiments',
    title: 'Web Visual Experiments',
    description: 'Creative UI, gallery layouts, hover effects, and interactive photo displays.',
    tags: ['Web', 'UI', 'Interaction'],
    coverImage: '/experiments/web-visual-experiments/cover.jpg',
    status: 'Prototype',
  },
]
