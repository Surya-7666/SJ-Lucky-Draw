// Fisher-Yates shuffle to randomize the 5 gifts behind the boxes every session
export function shuffleGifts(gifts) {
  const shuffled = [...gifts];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}