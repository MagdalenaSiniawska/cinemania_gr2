import { convertGenreIdsToNames } from './API.js';
import { displayStarRating } from './hero.js';

export const element = (tag, props) =>
  Object.assign(document.createElement(tag), props);

export const createElement = ({
  poster_path,
  title,
  genre_ids,
  release_date,
  vote_average,
}) => {
  const card = element('li', { className: 'catalog-card' });

  const poster = element('img', {
    className: 'catalog-card-poster',
    src: `https://image.tmdb.org/t/p/original/${poster_path}`,
  });

  const description = element('div', {
    className: 'catalog-card-description',
  });

  const filmTitle = element('p', {
    className: 'catalog-card-title',
    textContent: title.toUpperCase(),
  });
  const descriptionSub = element('div', {
    className: 'catalog-card-description-sub',
  });

  const genres = element('p', {
    className: 'catalog-card-description-element',
  });
  convertGenreIdsToNames(genre_ids).then(genreNames => {
    genres.textContent = `${genreNames
      .slice(0, 2)
      .join(', ')} | ${release_date.slice(0, 4)}`;
  });

  const descriptionSubSub = element('div', {
    className: 'catalog-card-description-sub-sub',
  });
  const stars = element('p', {
    className: 'catalog-star-rating',
    innerHTML: displayStarRating(vote_average),
  });

  descriptionSub.append(genres);
  descriptionSubSub.append(descriptionSub, stars);
  description.append(filmTitle, descriptionSubSub);
  card.append(poster, description);
  return card;
};
