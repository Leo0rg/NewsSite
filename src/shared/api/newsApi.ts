import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { NewsResponse, Article } from '@/app/types';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

if (!API_KEY) {
  throw new Error('NEWS_API_KEY is not defined in environment variables');
}

const BASE_URL = 'https://newsapi.org/v2';

const ARTICLES_PER_PAGE = 36;

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('X-Api-Key', API_KEY);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopHeadlines: builder.query<NewsResponse, string>({
      query: (country = 'us') => `/top-headlines?country=${country}`,
      keepUnusedDataFor: 300,
    }),
    getNewsByCategory: builder.query<NewsResponse, string>({
      query: (category) => `/top-headlines?category=${category}`,
      keepUnusedDataFor: 300,
    }),
    searchNews: builder.query<NewsResponse, { searchTerm: string; page: number }>({
      query: ({ searchTerm, page = 1 }) => 
        `/everything?q=${searchTerm}&pageSize=${ARTICLES_PER_PAGE}&page=${page}`,
      serializeQueryArgs: ({ queryArgs }) => {
        return { searchTerm: queryArgs.searchTerm };
      },
      merge: (currentCache, newItems) => {
        if (currentCache) {
          return {
            ...newItems,
            articles: [...currentCache.articles, ...newItems.articles]
          };
        }
        return newItems;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      }
    }),
    getArticlesByUrls: builder.query<Article[], string[]>({
      async queryFn(urls, _queryApi, _extraOptions, baseQuery) {
        try {
          // Получаем статьи из всех категорий
          const categories = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];
          const results = await Promise.all(
            categories.map(async (category) => {
              const result = await baseQuery(`/top-headlines?category=${category}&country=us`);
              if (result.error) {
                throw result.error;
              }
              return (result.data as NewsResponse)?.articles || [];
            })
          );
          
          // Объединяем все статьи и фильтруем по URL
          const allArticles = results.flat();
          return {
            data: allArticles.filter((article: Article) => urls.includes(article.url))
          };
        } catch (error) {
          return { error: { status: 500, data: error } };
        }
      }
    }),
  }),
});

export const { 
  useGetTopHeadlinesQuery,
  useGetNewsByCategoryQuery,
  useSearchNewsQuery,
  useGetArticlesByUrlsQuery,
} = newsApi; 