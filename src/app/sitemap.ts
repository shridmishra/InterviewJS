import { MetadataRoute } from 'next';
import { learnTheBasics } from '@/data/problems/1-basics-1';
import { arrayManipulation } from '@/data/problems/2-basics-2';
import { step3Basics3 } from '@/data/problems/3-basics-3';
import { asynchronousJavaScript } from '@/data/problems/4-asynchronous-javascript';
import { domManipulation } from '@/data/problems/5-dom-manipulation';
import { advancedDomAndEvents } from '@/data/problems/6-advanced-dom-and-events';
import { typescriptFundamentals } from '@/data/problems/7-typescript-fundamentals';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://practicejs.shrid.in'; 

  const problemRoutes = [
    ...learnTheBasics,
    ...arrayManipulation,
    ...step3Basics3,
    ...asynchronousJavaScript,
    ...domManipulation,
    ...advancedDomAndEvents,
    ...typescriptFundamentals,
  ].map((problem) => ({
    url: `${siteUrl}/challenges/detail/${problem.id}`,
    lastModified: new Date(),
  }));

  const staticRoutes = [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/challenges`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/quiz`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/profile`,
      lastModified: new Date(),
    },
  ];

  return [...staticRoutes, ...problemRoutes];
}
