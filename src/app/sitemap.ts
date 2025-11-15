import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = 'https://practicejs.shrid.in';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date() },
    { url: `${siteUrl}/challenges`, lastModified: new Date() },
    { url: `${siteUrl}/quiz`, lastModified: new Date() },
    { url: `${siteUrl}/profile`, lastModified: new Date() },
  ];

  // Try to include problem detail pages; if anything goes wrong, fall back to static routes only.
  try {
    const [m1, m2, m3, m4, m5, m6, m7] = await Promise.all([
      import('@/data/problems/1-basics-1'),
      import('@/data/problems/2-basics-2'),
      import('@/data/problems/3-basics-3'),
      import('@/data/problems/4-asynchronous-javascript'),
      import('@/data/problems/5-dom-manipulation'),
      import('@/data/problems/6-advanced-dom-and-events'),
      import('@/data/problems/7-typescript-fundamentals'),
    ]);

    const problems = [
      ...(m1.learnTheBasics ?? []),
      ...(m2.arrayManipulation ?? []),
      ...(m3.step3Basics3 ?? []),
      ...(m4.asynchronousJavaScript ?? []),
      ...(m5.domManipulation ?? []),
      ...(m6.advancedDomAndEvents ?? []),
      ...(m7.typescriptFundamentals ?? []),
    ];

    const problemRoutes: MetadataRoute.Sitemap = problems.map((p: { id: string }) => ({
      url: `${siteUrl}/challenges/detail/${p.id}`,
      lastModified: new Date(),
    }));

    return [...staticRoutes, ...problemRoutes];
  } catch (err) {
    console.error('[sitemap] Falling back to static routes only:', err instanceof Error ? err.message : err);
    return staticRoutes;
  }
}
