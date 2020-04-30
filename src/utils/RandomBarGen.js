import { get } from './apiConn';

const RandomBarGen = async () => {
  const adj = ['Rusty', 'Heartless', 'Fiery', 'Speckled', 'Grizzled', 'Thoughtful',
    'Wandering', 'Gnarled', 'Antiquated', 'Lonely', 'Squeeky', 'Greasy', 'Sullen', 'Annoying',
    'Doubtful', 'Innocent', 'Shiny', 'Anxious', 'Drab', 'Inquisitive', 'Shy', 'Arrogant', 'Dull',
    'Itchy', 'Silly', 'Uninterested', 'Frantic', 'Nice', 'Ugly', 'Clever', 'Friendly', 'Nutty',
    'Cloudy', 'Frightened', 'Unsightly', 'Fantastic', 'Muddy', 'Thoughtful', 'Calm', 'Fierce', 'Mushy',
    'Careful', 'Filthy', 'Mysterious', 'Tired', 'Cautious', 'Fine', 'Tough', 'Charming', 'Foolish',
    'Nasty', 'Troubled', 'Cheerful', 'Fragile', 'Naughty', 'Clean', 'Frail', 'Nervous', 'Ugliest', 'Clear',
  ];
  const rand = Math.floor(Math.random() * (adj.length + 1));
  const name = await get('https://random-word-api.herokuapp.com/word?number=1');
  return [adj[rand], name[0].slice(0, 1).toUpperCase() + name[0].slice(1)];
};

export default RandomBarGen;
