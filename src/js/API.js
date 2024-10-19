import axios from 'axios';

const API_KEY =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Y2IxMWQ4ZGE0NTZlOGI5OTIxM2EyNDk4ODM4OGQyNSIsIm5iZiI6MTcyODcyMDEzMC44MDY0Niwic3ViIjoiNjcwYTJiNDEzYmI0NTU3YzY2OWFmYzM5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Pgojbxf9JKo_J1qf6Qmglon5qZgkr9wpZ4I978dGQU8';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Authorization'] = API_KEY;

//pozyskanie wszystkich filmów - do wykorzystania przy populowania katalogu
//time_window to string "day" albo "week"
export const getTrending = async (time_window = 'day') => {
  const response = await axios.get(`/trending/movie/${time_window}`);
  return response.data;
};

//pozyskiwanie nadchodzących
export const getUpcoming = async () => {
  const response = await axios.get(`movie/upcoming`);
  return response.data;
};

//pozyskiwanie szczegółów
export const getDetails = async movie_id => {
  const response = await axios.get(`/movie/${movie_id}`);
  return response.data;
};

//trailer
export const getTrailer = async movie_id => {
  const response = await axios.get(`/movie/${movie_id}/videos`);
  return response.data;
};

//gatunki
const getGenres = async () => {
  try {
    const response = await axios.get(`/genre/movie/list`);
    const genres = response.data.genres;
    return new Map(genres.map(genre => [genre.id, genre.name]));
  } catch (error) {
    console.log(error);
  }
};
export const convertGenreIdsToNames = async genreIds => {
  try {
    const genreMap = await getGenres();
    const genreNames = genreIds.map(id => genreMap.get(id) || 'Unknow genre');
    return genreNames;
  } catch (error) {
    console.log(error);
  }
};

//kraje
export const getCountries = async () => {
  try {
    const response = await axios.get(`/configuration/countries`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// //logowanie danych do konsoli
// export const logData = async fn => {
//   try {
//     const data = await fn;
//     console.log(data);
//   } catch (error) {
//     console.log(error.message);
//   }
// };
