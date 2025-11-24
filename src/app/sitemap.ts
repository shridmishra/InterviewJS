import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = 'https://practicejs.shrid.in';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date() },
    { url: `${siteUrl}/practice/js`, lastModified: new Date() },
    { url: `${siteUrl}/practice/ts`, lastModified: new Date() },
    { url: `${siteUrl}/quiz`, lastModified: new Date() },
    { url: `${siteUrl}/profile`, lastModified: new Date() },
  ];

  // Try to include problem detail pages; if anything goes wrong, fall back to static routes only.
  try {
    const [m1, m2, m3, m4, m5, m6, t1, t2, t3, t4, t5, t6] = await Promise.all([
      import('@/data/problems/js/1-basics-1'),
      import('@/data/problems/js/2-basics-2'),
      import('@/data/problems/js/3-basics-3'),
      import('@/data/problems/js/4-asynchronous-javascript'),
      import('@/data/problems/js/5-dom-manipulation'),
      import('@/data/problems/js/6-advanced-dom-and-events'),
      import('@/data/problems/ts/1-basics-typescript'),
      import('@/data/problems/ts/2-classes-interfaces-enums-typescript'),
      import('@/data/problems/ts/3-generics-utility-types-typescript'),
      import('@/data/problems/ts/4-advanced-types-patterns-typescript'),
      import('@/data/problems/ts/5-modules-async-typescript'),
      import('@/data/problems/ts/6-real-world-typescript'),
    ]);

    const jsProblems = [
      ...(m1.learnTheBasics ?? []),
      ...(m2.arrayManipulation ?? []),
      ...(m3.step3Basics3 ?? []),
      ...(m4.asynchronousJavaScript ?? []),
      ...(m5.domManipulation ?? []),
      ...(m6.advancedDomAndEvents ?? []),
    ];

    const tsProblems = [
      ...(t1.typescriptBasics ?? []),
      ...(t2.typescriptClassesInterfacesEnums ?? []),
      ...(t3.typescriptGenericsUtilityTypes ?? []),
      ...(t4.typescriptAdvancedTypesPatterns ?? []),
      ...(t5.typescriptModulesAsync ?? []),
      ...(t6.typescriptRealWorld ?? []),
    ];

    const jsProblemRoutes: MetadataRoute.Sitemap = jsProblems.map((p: { id: string }) => ({
      url: `${siteUrl}/practice/js/${p.id}`,
      lastModified: new Date(),
    }));

    const tsProblemRoutes: MetadataRoute.Sitemap = tsProblems.map((p: { id: string }) => ({
      url: `${siteUrl}/practice/ts/${p.id}`,
      lastModified: new Date(),
    }));

    return [...staticRoutes, ...jsProblemRoutes, ...tsProblemRoutes];
  } catch (err) {
    console.error('[sitemap] Falling back to static routes only:', err instanceof Error ? err.message : err);
    return staticRoutes;
  }
}
