export const quotes = [
  {
    id: '1',
    text: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
    category: 'motivation'
  },
  {
    id: '2',
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: 'Cory House',
    category: 'programming'
  },
  {
    id: '3',
    text: 'Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.',
    author: 'Patrick McKenzie',
    category: 'inspiration'
  },
  {
    id: '4',
    text: 'The best way to predict the future is to invent it.',
    author: 'Alan Kay',
    category: 'innovation'
  },
  {
    id: '5',
    text: 'Learning never exhausts the mind.',
    author: 'Leonardo da Vinci',
    category: 'learning'
  }
];

export const getRandomQuote = () => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};
