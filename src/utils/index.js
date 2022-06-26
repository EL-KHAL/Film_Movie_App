import { css } from 'styled-components';
import { config } from '../config';

export function getGenres(genreIds) {
    return genreIds.map(id => config.movieGenres.filter(genre => genre.id === id));
}

export function urlTitle(title) {
    return title
        .toLowerCase()
        .split(' ')
        .join('-');
}

export function checkIfInCache(url) {
    return caches
        .match(url)
        .then(response => {
            return (
                response ||
                fetch(url).then(function(r) {
                    caches.open('v1').then(function(cache) {
                        cache.put(url, r);
                    });
                    return r.clone();
                })
            );
        })
        .then(r => r.json())
        .catch(e => console.log(e));
}

export function addToList(movie) {
    if (!localStorage.getItem('savedMovies')) {
        const savedMovies = { [movie.id]: movie };
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
    } else {
        const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
        savedMovies[movie.id] = movie;
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
    }
}

export function removeFromList(movie) {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    delete savedMovies[movie.id];
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
}

export function isSaved(movie) {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    if (savedMovies) {
        const savedMovieIds = Object.keys(savedMovies);
        return savedMovieIds.includes(movie.id.toString());
    } else {
        return false;
    }
}

/* Responsive Ya khali Size */
const sizes = {
    giant: 1170,
    desktop: 992,
    tablet: 768,
    phone: 376
};


export const media = Object.keys(sizes).reduce((accumulator, label) => {
    const emSize = sizes[label] / 16;
    accumulator[label] = (...args) => css`
        @media (max-width: ${emSize}em) {
            ${css(...args)};
        }
    `;
    return accumulator;
}, {});
