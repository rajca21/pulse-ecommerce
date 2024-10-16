export const BASE_URL = process.env.NODE_ENV === 'development' ? '' : '';
export const PRODUCTS_URL = `${BASE_URL}/api/products`;
export const USERS_URL = `${BASE_URL}/api/users`;
export const ORDERS_URL = `${BASE_URL}/api/orders`;
export const BRANDS_URL = `${BASE_URL}/api/brands`;
export const CATEGORIES_URL = `${BASE_URL}/api/categories`;
export const UPLOAD_URL = `${BASE_URL}/api/upload`;
