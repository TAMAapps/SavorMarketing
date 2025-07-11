// WordPress API Client for Savor SEO Project
// Handles all WordPress.com REST API interactions

const API_BASE = import.meta.env.WORDPRESS_API || 'https://savorcms.wpcomstaging.com/wp-json/wp/v2';

// Helper function to decode HTML entities
export function decodeHtmlEntities(text: string): string {
  const entities: { [key: string]: string } = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
    '&apos;': "'",
    '&nbsp;': ' ',
    '&8211;': '\u2013', // em-dash
    '&8212;': '\u2014', // en-dash
    '&8216;': '\u2018', // left single quote
    '&8217;': '\u2019', // right single quote
    '&8218;': '\u201A', // single low quote
    '&8220;': '\u201C', // left double quote
    '&8221;': '\u201D', // right double quote
    '&8222;': '\u201E', // double low quote
    '&8230;': '\u2026', // ellipsis
    '&8242;': '\u2032', // prime
    '&8243;': '\u2033', // double prime
    '&8249;': '\u2039', // left angle quote
    '&8250;': '\u203A', // right angle quote
    '&8364;': '\u20AC', // euro
    '&8482;': '\u2122', // trademark
    '&8594;': '\u2192', // right arrow
    '&8592;': '\u2190', // left arrow
    '&8593;': '\u2191', // up arrow
    '&8595;': '\u2193', // down arrow
  };

  let decodedText = text;
  
  // Replace numeric entities first
  decodedText = decodedText.replace(/&#(\d+);/g, (match, dec) => {
    return String.fromCharCode(dec);
  });
  
  // Replace hex entities
  decodedText = decodedText.replace(/&#x([0-9a-f]+);/gi, (match, hex) => {
    return String.fromCharCode(parseInt(hex, 16));
  });
  
  // Replace named entities
  Object.keys(entities).forEach(entity => {
    const regex = new RegExp(entity.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    decodedText = decodedText.replace(regex, entities[entity]);
  });
  
  return decodedText;
}

// Helper function to clean WordPress content
export function cleanWordPressContent(content: string): string {
  let cleaned = decodeHtmlEntities(content);
  
  // Remove WordPress-specific artifacts
  cleaned = cleaned.replace(/\[caption[^\]]*\]/g, '');
  cleaned = cleaned.replace(/\[\/caption\]/g, '');
  
  // Clean up extra whitespace
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  
  return cleaned;
}

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