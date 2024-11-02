// /**
//  * This script handles cookies and Watch List operations for the movie streaming application.
//  * It provides utility functions to create, read, add to, and remove from cookies.
//  */

// /**
//  * Sets a cookie with a given name, value, and expiration time in days.
//  * @param {string} name - The name of the cookie.
//  * @param {string} value - The value of the cookie.
//  * @param {number} days - The number of days until the cookie expires.
//  */
// export function setCookie(name, value, days) {
//     const date = new Date();
//     date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
//     const expires = "expires=" + date.toUTCString();
//     document.cookie = name + "=" + value + ";" + expires + ";path=/";
// }

// /**
//  * Reads the value of a cookie by name.
//  * @param {string} name - The name of the cookie to read.
//  * @returns {string|null} - The value of the cookie, or null if it doesn't exist.
//  */
// export function getCookie(name) {
//     const nameEQ = name + "=";
//     const decodedCookie = decodeURIComponent(document.cookie);
//     const cookieArray = decodedCookie.split(';');
//     for (let i = 0; i < cookieArray.length; i++) {
//         let cookie = cookieArray[i].trim();
//         if (cookie.indexOf(nameEQ) === 0) {
//             return cookie.substring(nameEQ.length, cookie.length);
//         }
//     }
//     return null;
// }

// /**
//  * Adds a movie ID to the Watch List stored in cookies.
//  * @param {number} movieId - The ID of the movie to add.
//  */
// export function addToWatchList(movieId) {
//     let watchList = getCookie("watchList");
//     watchList = watchList ? JSON.parse(watchList) : [];
//     if (!watchList.includes(movieId)) {
//         watchList.push(movieId);
//         setCookie("watchList", JSON.stringify(watchList), 7);
//     }
// }

// /**
//  * Removes a movie ID from the Watch List stored in cookies.
//  * @param {number} movieId - The ID of the movie to remove.
//  */
// export function removeFromWatchList(movieId) {
//     let watchList = getCookie("watchList");
//     if (watchList) {
//         watchList = JSON.parse(watchList);
//         const updatedWatchList = watchList.filter(id => id !== movieId);
//         setCookie("watchList", JSON.stringify(updatedWatchList), 7);
//     }
// }

// /**
//  * Checks if a movie ID is already in the Watch List stored in cookies.
//  * @param {number} movieId - The ID of the movie to check.
//  * @returns {boolean} - True if the movie is in the Watch List, false otherwise.
//  */
// export function isInWatchList(movieId) {
//     let watchList = getCookie("watchList");
//     if (watchList) {
//         watchList = JSON.parse(watchList);
//         return watchList.includes(movieId);
//     }
//     return false;
// }

// /**
//  * Retrieves all movie IDs from the Watch List stored in cookies.
//  * @returns {number[]} - An array of movie IDs from the Watch List.
//  */
// export function getWatchList() {
//     let watchList = getCookie("watchList");
//     return watchList ? JSON.parse(watchList) : [];
// }


// window.addToWatchList = addToWatchList;
// window.removeFromWatchList = removeFromWatchList;
// window.isInWatchList = isInWatchList;
// window.getWatchList = getWatchList;