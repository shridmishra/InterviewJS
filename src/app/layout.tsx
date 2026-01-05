import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../styles/globals.css';
import { Providers } from './providers';
import { ModalProvider } from '../components/modals/ModalProvider';
import { Toaster } from '@/components/ui/sonner';

const satoshi = localFont({
  src: [
    {
      path: '../assets/fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Satoshi-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-satoshi',
});

const title = 'Practice JS';
const description =
  'The ultimate platform for developers to practice JavaScript, tackle coding challenges, and prepare for technical topics.';

export const metadata: Metadata = {
  metadataBase: new URL('https://practicejs.shrid.in'),
  title,
  description,
  keywords: [
    'JavaScript practice',
    'JS practice',
    'learn JavaScript',
    'JavaScript challenges',
    'coding challenges',
    'JavaScript quiz',
    'technical topics',
    'developer skills',
    'sum two numbers',
    'check if number is even',
    'string length',
    'get object keys',
    'simple for loop',
    'get object values',
    'concatenate strings',
    'check if positive',
    'get first element',
    'find max number',
    'filter positive numbers',
    'reverse an array',
    'remove duplicates from array',
    'find element index',
    'sort objects by property',
    'flatten nested array',
    'chunk array',
    'find first odd number',
    'group by property',
    'array intersection',
    'array difference',
    'check for all positive',
    'zip two arrays',
    'reverse string',
    'palindrome check',
    'count vowels',
    'capitalize string',
    'string to uppercase',
    'truncate string',
    'count character occurrences',
    'to camel case',
    'all unique characters',
    'merge objects',
    'debounce function',
    'currying',
    'deep clone',
    'check property',
    'object from entries',
    'throttle function',
    'memoize function',
    'object deep freeze',
    'create a simple promise',
    'fetch api data',
    'promise.all',
    'async with settimeout',
    'promise.race',
    'async/await error handling',
    'promise chaining',
    'dom change text',
    'dom add class',
    'dom set attribute',
    'dom get by id',
    'dom remove class',
    'dom toggle class',
    'dom get attribute',
    'dom update style',
    'dom create element',
    'dom append child',
    'dom query selector',
    'dom query selector all',
    'dom remove child',
    'dom create and append',
    'dom set inner html',
    'dom add event listener',
    'dom remove event listener',
    'dom get computed style',
    'dom traverse up',
    'dom form read value',
    'typescript basic types',
    'typescript interfaces',
    'typescript function types',
    'typescript generics',
    'declare a string type',
    'declare a number type',
    'declare a boolean type',
    'declare an array type',
    'declare a tuple type',
    'define a person interface',
    'define a point type alias',
    'optional interface property',
    'readonly interface property',
    'union type for id',
    'typed function for addition',
    'function with void return',
    'function with optional parameter',
    'function with default parameter',
    'function overloads',
    'basic class: greeter',
    'class with constructor',
    'numeric enum: directions',
    'string enum: status',
    'abstract class',
    'generic identity function',
    'generic array element getter',
    'generic interface: box',
    'generic class: stack',
    'generic constraints',
    'intersection type',
    'literal types',
    'type assertions',
    'non-null assertion operator',
    'keyof type operator',
    'utility type: partial',
    'utility type: readonly',
    'utility type: pick',
    'utility type: omit',
    'utility type: record',
    'type guards',
    'indexed access types',
    'conditional types',
    'template literal types',
    'mapped types',
  ],
  openGraph: {
    title,
    description,
    url: 'https://practicejs.shrid.in',
    siteName: 'Practice JS',
    images: [
      {
        url: 'https://practicejs.shrid.in/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@shridmishra',
    images: ['https://practicejs.shrid.in/twitter-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: 'any' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/favicon/apple-touch-icon.png',
    shortcut: '/favicon/favicon.ico',
  },
  manifest: '/manifest.json',
  authors: [{ name: 'Shrid', url: 'https://shrid.in' }],
  creator: 'Shrid',
  publisher: 'Shrid',
};

export const viewport = {
  themeColor: '#000000',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${satoshi.variable} bg-background text-foreground antialiased`}
      >
        <Providers>
          <ModalProvider>{children}</ModalProvider>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
