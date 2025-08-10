/**
 * AI-powered SEO content generator for HoeWasHetOokAlWeer.nl
 * Generates optimized content descriptions, meta descriptions, and social media content
 */

export interface SEOContentData {
  date: string;
  year: number;
  yearsAgo: number;
  musicData?: any;
  movieData?: any;
  sportData?: any;
  weatherData?: any;
  politicalData?: any;
  otherHistoricalData?: any;
}

export interface GeneratedSEOContent {
  metaDescription: string;
  socialMediaTitle: string;
  socialMediaDescription: string;
  contentSummary: string;
  hashtags: string[];
  structuredData: any;
}

export class SEOContentGenerator {
  private static readonly MAX_DESCRIPTION_LENGTH = 160;
  private static readonly MAX_SOCIAL_TITLE_LENGTH = 60;
  private static readonly MAX_SOCIAL_DESCRIPTION_LENGTH = 200;

  /**
   * Generate AI-optimized SEO content based on historical data
   */
  static generateContent(data: SEOContentData): GeneratedSEOContent {
    const { date, year, yearsAgo, musicData, movieData, sportData, weatherData, politicalData, otherHistoricalData } = data;

    // Generate meta description
    const metaDescription = this.generateMetaDescription(data);
    
    // Generate social media content
    const socialMediaTitle = this.generateSocialMediaTitle(data);
    const socialMediaDescription = this.generateSocialMediaDescription(data);
    
    // Generate content summary
    const contentSummary = this.generateContentSummary(data);
    
    // Generate hashtags
    const hashtags = this.generateHashtags(data);
    
    // Generate structured data
    const structuredData = this.generateStructuredData(data);

    return {
      metaDescription,
      socialMediaTitle,
      socialMediaDescription,
      contentSummary,
      hashtags,
      structuredData,
    };
  }

  /**
   * Generate optimized meta description
   */
  private static generateMetaDescription(data: SEOContentData): string {
    const { date, year, yearsAgo } = data;
    const yearContext = yearsAgo > 0 ? `${yearsAgo} jaar geleden` : 'dit jaar';
    
    let description = `Ontdek wat er gebeurde op ${date} in ${year}! `;
    
    // Add specific content highlights
    const highlights: string[] = [];
    
    if (data.musicData) highlights.push('muziek hits');
    if (data.movieData) highlights.push('films');
    if (data.sportData) highlights.push('sport resultaten');
    if (data.weatherData) highlights.push('weer data');
    if (data.politicalData) highlights.push('politieke gebeurtenissen');
    
    if (highlights.length > 0) {
      description += `Bekijk historische ${highlights.join(', ')} en meer uit ${year}. `;
    }
    
    description += `${yearContext} - Duik in de geschiedenis met HoeWasHetOokAlWeer.nl.`;
    
    // Ensure description fits within limits
    if (description.length > this.MAX_DESCRIPTION_LENGTH) {
      description = description.substring(0, this.MAX_DESCRIPTION_LENGTH - 3) + '...';
    }
    
    return description;
  }

  /**
   * Generate social media title
   */
  private static generateSocialMediaTitle(data: SEOContentData): string {
    const { date, year } = data;
    
    let title = `${date} - Wat gebeurde er in ${year}?`;
    
    // Add emoji for engagement
    title = `🗓️ ${title}`;
    
    if (title.length > this.MAX_SOCIAL_TITLE_LENGTH) {
      title = title.substring(0, this.MAX_SOCIAL_TITLE_LENGTH - 3) + '...';
    }
    
    return title;
  }

  /**
   * Generate social media description
   */
  private static generateSocialMediaDescription(data: SEOContentData): string {
    const { date, year, yearsAgo } = data;
    const yearContext = yearsAgo > 0 ? `${yearsAgo} jaar geleden` : 'dit jaar';
    
    let description = `Reis terug naar ${date} en ontdek wat er gebeurde in ${year}! `;
    
    // Add engaging content preview
    const contentTypes: string[] = [];
    if (data.musicData) contentTypes.push('🎵 Muziek hits');
    if (data.movieData) contentTypes.push('🎬 Films');
    if (data.sportData) contentTypes.push('⚽ Sport');
    if (data.weatherData) contentTypes.push('🌤️ Weer');
    
    if (contentTypes.length > 0) {
      description += `${contentTypes.slice(0, 3).join(' • ')} en meer! `;
    }
    
    description += `${yearContext} - Duik in de geschiedenis! 📚`;
    
    if (description.length > this.MAX_SOCIAL_DESCRIPTION_LENGTH) {
      description = description.substring(0, this.MAX_SOCIAL_DESCRIPTION_LENGTH - 3) + '...';
    }
    
    return description;
  }

  /**
   * Generate content summary for internal use
   */
  private static generateContentSummary(data: SEOContentData): string {
    const { date, year, yearsAgo } = data;
    const yearContext = yearsAgo > 0 ? `${yearsAgo} jaar geleden` : 'dit jaar';
    
    let summary = `Historische data voor ${date} (${year})`;
    
    const availableData: string[] = [];
    if (data.musicData) availableData.push('muziek');
    if (data.movieData) availableData.push('films');
    if (data.sportData) availableData.push('sport');
    if (data.weatherData) availableData.push('weer');
    if (data.politicalData) availableData.push('politiek');
    if (data.otherHistoricalData) availableData.push('andere historische gebeurtenissen');
    
    if (availableData.length > 0) {
      summary += ` - Beschikbare data: ${availableData.join(', ')}`;
    }
    
    summary += ` (${yearContext})`;
    
    return summary;
  }

  /**
   * Generate relevant hashtags
   */
  private static generateHashtags(data: SEOContentData): string[] {
    const { year, yearsAgo } = data;
    const baseHashtags = ['#geschiedenis', '#nostalgie', '#vroeger', '#retro'];
    
    const yearHashtags = [
      `#${year}`,
      yearsAgo > 0 ? `#${yearsAgo}jaargeleden` : '#ditjaar'
    ];
    
    const contentHashtags: string[] = [];
    if (data.musicData) contentHashtags.push('#muziek', '#hits');
    if (data.movieData) contentHashtags.push('#films', '#cinema');
    if (data.sportData) contentHashtags.push('#sport', '#voetbal');
    if (data.weatherData) contentHashtags.push('#weer', '#klimaat');
    if (data.politicalData) contentHashtags.push('#politiek', '#nieuws');
    
    return [...baseHashtags, ...yearHashtags, ...contentHashtags].slice(0, 15);
  }

  /**
   * Generate structured data for search engines
   */
  private static generateStructuredData(data: SEOContentData): any {
    const { date, year, yearsAgo } = data;
    
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": `Wat gebeurde er op ${date} in ${year}?`,
      "description": this.generateMetaDescription(data),
      "datePublished": new Date(year, 0, 1).toISOString(),
      "dateModified": new Date().toISOString(),
      "author": {
        "@type": "Organization",
        "name": "HoeWasHetOokAlWeer.nl"
      },
      "publisher": {
        "@type": "Organization",
        "name": "HoeWasHetOokAlWeer.nl",
        "url": "https://hoewashetookalweer.nl"
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://hoewashetookalweer.nl?date=${year}-${date.split(' ')[1]}-${date.split(' ')[0]}`
      },
      "articleSection": "History",
      "keywords": this.generateHashtags(data).map(tag => tag.replace('#', '')),
      "temporalCoverage": `${year}`,
      "spatialCoverage": "Netherlands",
      "inLanguage": "nl-NL"
    };
  }

  /**
   * Generate content for specific social media platforms
   */
  static generatePlatformSpecificContent(data: SEOContentData, platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin'): string {
    const baseContent = this.generateSocialMediaDescription(data);
    
    switch (platform) {
      case 'facebook':
        return `${baseContent}\n\nBekijk meer op HoeWasHetOokAlWeer.nl! 🚀`;
      
      case 'twitter':
        return `${baseContent}\n\n#geschiedenis #nostalgie`;
      
      case 'instagram':
        return `${baseContent}\n\n📚 Duik in de geschiedenis op HoeWasHetOokAlWeer.nl`;
      
      case 'linkedin':
        return `${baseContent}\n\nOntdek historische inzichten en trends op HoeWasHetOokAlWeer.nl`;
      
      default:
        return baseContent;
    }
  }
}
