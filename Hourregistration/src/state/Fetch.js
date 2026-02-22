// --- Configuration ---
const BASE_URL = import.meta.env.VITE_API_URL;

/**
 * A wrapper around the native fetch API that automatically prepends
 * a base URL to the endpoint.
 *
 * @param {string} endpoint - The relative path (e.g., '/posts/1').
 * @param {object} [options] - Standard fetch options (method, headers, body, etc.).
 * @returns {Promise<Response>} The native Response object from fetch.
 */
export function fetchWithBaseUrl(endpoint, options = {}) {

    // 1. Construct the full URL
    // Ensure the endpoint starts with a slash if needed, but combining 
    // BASE_URL + endpoint works well if BASE_URL doesn't end in a slash.
    const fullUrl = `${BASE_URL}${endpoint}`;

    // 2. Call the native fetch function
    return fetch(fullUrl, options);
}

// Optional: Export the base URL if other parts of the app need it
// export const API_BASE_URL = BASE_URL;