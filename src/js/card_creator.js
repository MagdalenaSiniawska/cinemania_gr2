import { convertGenreIdsToNames } from './API.js';

export const element = (tag, props) =>
  Object.assign(document.createElement(tag), props);

export const createElement = ({
  poster_path,
  title,
  genre_ids,
  release_date,
}) => {
  const card = element('li', { className: 'card' });

  const poster = element('img', {
    className: 'card-poster',
    src: `https://image.tmdb.org/t/p/original/${poster_path}`,
    width: 200,
    height: 300,
  });

  const description = element('div', {
    className: 'card-description',
  });

  const filmTitle = element('p', {
    className: 'card-title',
    textContent: title,
  });

  const genres = element('p', {
    className: 'card-description-element',
  });
  convertGenreIdsToNames(genre_ids).then(genreNames => {
    genres.textContent = `${genreNames.join(', ')} |`;
  });

  const year = element('p', {
    className: 'card-description-element',
    textContent: release_date.slice(0, 4),
  });

  description.append(genres, year);
  card.append(poster, filmTitle, description);
  return card;
};
