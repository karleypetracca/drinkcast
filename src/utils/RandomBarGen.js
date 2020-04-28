import { get } from './apiConn';


const RandomBarGen = async () => {
  const adj = ['Rusty', 'Heartless', 'Fiery', 'Speckled', 'Grizzled', 'Thoughtful', 'Wandering', 'Gnarled', 'Antiquated', 'Lonely', 'Squeeky', 'Greasy', 'Sullen'];
  const rand = Math.floor(Math.random() * 13);
  const name = await get('https://random-word-api.herokuapp.com/word?number=1');
  return [adj[rand], name[0].slice(0, 1).toUpperCase() + name[0].slice(1)];
};

export default RandomBarGen;
