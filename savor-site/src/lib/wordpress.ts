// WordPress API Client for Savor SEO Project
// Handles all WordPress.com REST API interactions

const API_BASE = import.meta.env.WORDPRESS_API || 'https://savorcms.wpcomstaging.com/wp-json/wp/v2';

// TypeScript interfaces for WordPress API responses
export interface WordPressPost {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: {
    [key: string]: any;
  };
  categories: number[];
  tags: number[];
  _links: {
    [key: string]: any;
  };
}

export interface WordPressCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
  meta: any[];
  _links: {
    [key: string]: any;
  };
}

export interface WordPressApiError {
  code: string;
  message: string;
  data: {
    status: number;
  };
}

// API Client Functions
export async function getPosts(params = ""): Promise<WordPressPost[]> {
  try {
    const url = `${API_BASE}/posts${params ? `?${params}` : ''}`;
    console.log(`Fetching posts from: ${url}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`WordPress API Error: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }
    
    const posts = await response.json();
    console.log(`Successfully fetched ${posts.length} posts`);
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  try {
    const url = `${API_BASE}/posts?slug=${slug}`;
    console.log(`Fetching post by slug: ${url}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`WordPress API Error: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }
    
    const posts = await response.json();
    
    if (posts.length === 0) {
      console.log(`No post found with slug: ${slug}`);
      return null;
    }
    
    console.log(`Successfully fetched post: ${posts[0].title.rendered}`);
    return posts[0];
  } catch (error) {
    console.error(`Error fetching post by slug ${slug}:`, error);
    throw error;
  }
}

export async function getCategories(): Promise<WordPressCategory[]> {
  try {
    const url = `${API_BASE}/categories`;
    console.log(`Fetching categories from: ${url}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`WordPress API Error: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }
    
    const categories = await response.json();
    console.log(`Successfully fetched ${categories.length} categories`);
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

export async function getPostsByCategory(categoryId: number): Promise<WordPressPost[]> {
  try {
    return await getPosts(`categories=${categoryId}`);
  } catch (error) {
    console.error(`Error fetching posts for category ${categoryId}:`, error);
    throw error;
  }
}

// Helper function to test API connectivity
export async function testApiConnection(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/posts?per_page=1`);
    return response.ok;
  } catch (error) {
    console.error('API connection test failed:', error);
    return false;
  }
}

// Helper function to get category by slug
export async function getCategoryBySlug(slug: string): Promise<WordPressCategory | null> {
  try {
    const url = `${API_BASE}/categories?slug=${slug}`;
    console.log(`Fetching category by slug: ${url}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`WordPress API Error: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }
    
    const categories = await response.json();
    
    if (categories.length === 0) {
      console.log(`No category found with slug: ${slug}`);
      return null;
    }
    
    console.log(`Successfully fetched category: ${categories[0].name}`);
    return categories[0];
  } catch (error) {
    console.error(`Error fetching category by slug ${slug}:`, error);
    throw error;
  }
}