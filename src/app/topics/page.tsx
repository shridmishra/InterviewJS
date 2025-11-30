'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiMongodb, SiExpress, SiNodedotjs, SiPrisma, SiHtml5, SiPostgresql, SiCss3 } from 'react-icons/si';
import { LayoutGrid, LayoutList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { TopicModal } from '@/components/topics/TopicModal';
import type { TopicQuestion } from '@/data/topics/types';
import Header from '@/components/common/Header';
import { useChallenges } from '@/hooks/useChallenges';
import { ProblemStatus } from '@/types';

const CircularProgress = ({ value }: { value: number }) => (
  <div className="relative w-12 h-12">
    <svg className="h-full w-full" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-muted/60" strokeWidth="3"></circle>
      <circle cx="18" cy="18" r="16" fill="none"
        className="stroke-current text-primary"
        strokeWidth="3"
        strokeDasharray={`${value}, 100`}
        strokeLinecap="round"
        transform="rotate(-90 18 18)"
      ></circle>
    </svg>
    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">
      {Math.round(value)}%
    </div>
  </div>
);

// Import questions from each file
import { jsQuestions } from '@/data/topics/javascript';
import { tsQuestions } from '@/data/topics/typescript';
import { reactQuestions } from '@/data/topics/react';
import { nextjsQuestions } from '@/data/topics/nextjs';
import { mongoQuestions } from '@/data/topics/mongo';
import { expressQuestions } from '@/data/topics/express';
import { backendQuestions } from '@/data/topics/nodejs';
import { prismaQuestions } from '@/data/topics/prisma';
import { postgresQuestions } from '@/data/topics/postgres';
import { htmlQuestions, cssQuestions } from '@/data/topics';

type FilterType = 'all' | 'completed' | 'ongoing' | 'not-started';

// Define the 11 topics with better descriptions
const topics = [
  {
    name: 'HTML',
    description: 'Master HTML5 semantics, forms, accessibility, and SEO best practices',
    questions: htmlQuestions,
    icon: SiHtml5,
    color: 'text-orange-600',
    slug: 'html',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLu71SKxNbfoDBNF5s-WH6aLbthSEIMhMI'
  },
  {
    name: 'CSS',
    description: 'Learn modern CSS including Flexbox, Grid, animations, and responsive design',
    questions: cssQuestions,
    icon: SiCss3,
    color: 'text-blue-500',
    slug: 'css'
  },
  {
    name: 'JavaScript',
    description: 'Deep dive into JS fundamentals, async patterns, DOM manipulation, and algorithms',
    questions: jsQuestions,
    icon: SiJavascript,
    color: 'text-yellow-500',
    slug: 'js'
  },
  {
    name: 'TypeScript',
    description: 'Type-safe JavaScript with generics, utility types, and advanced patterns',
    questions: tsQuestions,
    icon: SiTypescript,
    color: 'text-blue-600',
    slug: 'ts'
  },
  {
    name: 'React',
    description: 'Build modern UIs with hooks, context, lifecycle methods, and best practices',
    questions: reactQuestions,
    icon: SiReact,
    color: 'text-cyan-500',
    slug: 'react'
  },
  {
    name: 'Next.js',
    description: 'Full-stack React framework with routing, SSR, API routes, and optimization',
    questions: nextjsQuestions,
    icon: SiNextdotjs,
    color: 'text-foreground',
    slug: 'nextjs'
  },
  {
    name: 'Node.js',
    description: 'Server-side JavaScript with modules, streams, events, and HTTP servers',
    questions: backendQuestions,
    icon: SiNodedotjs,
    color: 'text-green-500',
    slug: 'nodejs'
  },
  {
    name: 'Express',
    description: 'Build robust APIs with middleware, routing, error handling, and security',
    questions: expressQuestions,
    icon: SiExpress,
    color: 'text-foreground',
    slug: 'express'
  },
  {
    name: 'MongoDB',
    description: 'NoSQL database fundamentals with CRUD, aggregation, and schema design',
    questions: mongoQuestions,
    icon: SiMongodb,
    color: 'text-green-600',
    slug: 'mongo'
  },
  {
    name: 'PostgreSQL',
    description: 'Relational database mastery with joins, transactions, and advanced SQL',
    questions: postgresQuestions,
    icon: SiPostgresql,
    color: 'text-blue-500',
    slug: 'postgres'
  },
  {
    name: 'Prisma',
    description: 'Modern ORM with type-safe queries, migrations, and database optimization',
    questions: prismaQuestions,
    icon: SiPrisma,
    color: 'text-indigo-600',
    slug: 'prisma'
  },
];

// Skeleton Card Component
function SkeletonCard() {
  return (
    <Card className="animate-pulse">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="w-8 h-8 bg-muted rounded" />
          <div className="h-6 bg-muted rounded w-32" />
        </CardTitle>
        <CardDescription>
          <div className="h-4 bg-muted rounded w-24" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <div className="h-9 bg-muted rounded flex-1" />
          <div className="h-9 bg-muted rounded flex-1" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function TopicsPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<TopicQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [filter, setFilter] = useState<FilterType>('all');
  const { problems: allProblems } = useChallenges();

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Compute filtered topics with status
  const filteredTopics = useMemo(() => {
    const topicsWithProgress = topics.map((topic) => {
      const topicProblems = allProblems.filter(p => p.slug === topic.slug);
      const total = topicProblems.length;
      const solved = topicProblems.filter(p => p.status === ProblemStatus.Solved).length;
      const progress = total > 0 ? (solved / total) * 100 : 0;

      let status: FilterType;
      if (progress === 0) {
        status = 'not-started';
      } else if (progress === 100) {
        status = 'completed';
      } else {
        status = 'ongoing';
      }

      return {
        ...topic,
        total,
        solved,
        progress,
        status
      };
    });

    if (filter === 'all') {
      return topicsWithProgress;
    }

    return topicsWithProgress.filter(t => t.status === filter);
  }, [allProblems, filter]);

  const handleTopicClick = (topicQuestions: TopicQuestion[]) => {
    setSelectedQuestions(topicQuestions);
    setIsModalOpen(true);
  };

  // Get all unique topic names from all questions
  const allTopicNames = useMemo(() => {
    return Array.from(
      new Set([
        ...htmlQuestions.map(q => q.topic),
        ...cssQuestions.map(q => q.topic),
        ...jsQuestions.map(q => q.topic),
        ...tsQuestions.map(q => q.topic),
        ...reactQuestions.map(q => q.topic),
        ...nextjsQuestions.map(q => q.topic),
        ...backendQuestions.map(q => q.topic),
        ...expressQuestions.map(q => q.topic),
        ...mongoQuestions.map(q => q.topic),
        ...postgresQuestions.map(q => q.topic),
        ...prismaQuestions.map(q => q.topic)
      ])
    );
  }, []);

  const filterButtons: { label: string; value: FilterType; count: number }[] = useMemo(() => {
    const completed = filteredTopics.filter(t => t.status === 'completed').length;
    const ongoing = filteredTopics.filter(t => t.status === 'ongoing').length;
    const notStarted = filteredTopics.filter(t => t.status === 'not-started').length;
    const all = topics.length;

    return [
      { label: 'All', value: 'all', count: all },
      { label: 'Completed', value: 'completed', count: completed },
      { label: 'Ongoing', value: 'ongoing', count: ongoing },
      { label: 'Not Started', value: 'not-started', count: notStarted },
    ];
  }, [filteredTopics]);

  return (
    <div className="min-h-screen bg-background">
      <Header
        onBack={() => router.push('/practice/js')}
        problemTitle="Topics"
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold">Topics</h1>
            <div className="flex items-center gap-3">
              {/* Filter dropdown */}
              <Select value={filter} onValueChange={(value) => setFilter(value as FilterType)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select filter" />
                </SelectTrigger>
                <SelectContent>
                  {filterButtons.map((btn) => (
                    <SelectItem key={btn.value} value={btn.value}>
                      <div className="flex items-center justify-between w-full gap-3">
                        <span>{btn.label}</span>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                          {btn.count}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as 'card' | 'list')} className="hidden md:inline-flex">
                <ToggleGroupItem value="card" aria-label="Card view">
                  <LayoutGrid className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="list" aria-label="List view">
                  <LayoutList className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
          <p className="text-muted-foreground mb-6">
            Practice common questions across different topics
          </p>

          {/* Grid or List View */}
          <div className={viewMode === 'card' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-4'}>
            {isLoading ? (
              // Show skeleton cards while loading
              Array.from({ length: 9 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            ) : filteredTopics.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground text-lg">No topics found matching your filter.</p>
              </div>
            ) : (
              filteredTopics.map((topic) => {
                const Icon = topic.icon;

                if (viewMode === 'list') {
                  return (
                    <Card
                      key={topic.name}
                      className="hover:border-primary/20 transition-all hover:shadow-md group overflow-hidden relative"
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-5 p-5 pb-6">
                        {/* Icon */}
                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                          <Icon className={`w-7 h-7 ${topic.color.replace('text-', 'text-')}`} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-foreground">{topic.name}</h3>
                            <div className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium border border-primary/20">
                              {topic.solved} / {topic.total} Solved
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed pr-2">
                            {topic.description}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-3 items-stretch justify-end flex-shrink-0 min-w-[280px] mt-4 pt-4 border-t border-border/50 md:mt-0 md:pt-0 md:border-t-0 md:pl-5 md:border-l md:border-border/50">
                          <div className="flex gap-2 w-full">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 border-border bg-transparent hover:bg-accent hover:text-accent-foreground"
                              onClick={() => handleTopicClick(topic.questions)}
                            >
                              Interview Questions
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                              onClick={() => router.push(`/practice/${topic.slug}`)}
                            >
                              Practice
                            </Button>
                          </div>

                          {topic.playlistUrl && (
                            <a
                              href={topic.playlistUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 py-2 text-sm font-medium text-foreground border border-border rounded-md hover:bg-accent transition-colors"
                            >
                              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#FF0000" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                              </svg>
                              <span>Watch Lectures</span>
                            </a>
                          )}

                        </div>
                      </div>

                      {/* Edge-to-edge Progress Bar */}
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-muted/50">
                        <div
                          className="h-full bg-primary transition-all duration-500 ease-out"
                          style={{ width: `${topic.progress}%` }}
                        />
                      </div>
                    </Card>
                  );
                }

                return (
                  <Card
                    key={topic.name}
                    className="hover:border-primary/20 transition-all hover:shadow-md flex flex-col group relative"
                  >
                    <div className="absolute top-4 right-4">
                      <CircularProgress value={topic.progress} />
                    </div>
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                        <Icon className={`w-6 h-6 ${topic.color.replace('text-', 'text-')}`} />
                      </div>
                      <CardTitle className="text-xl pr-16">{topic.name}</CardTitle>
                      <CardDescription className="line-clamp-2 text-sm mt-2">
                        {topic.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto pt-0">
                      <div className="space-y-3 mt-4 pt-4 border-t border-border/50">
                        <div className="flex gap-2 w-full">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 border-border bg-transparent hover:bg-accent hover:text-accent-foreground tr"
                            onClick={() => handleTopicClick(topic.questions)}
                          >
                            Interview Questions
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 text-primary"
                            onClick={() => router.push(`/practice/${topic.slug}`)}
                          >
                            Practice
                          </Button>
                        </div>

                        {topic.playlistUrl && (
                          <a
                            href={topic.playlistUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 py-2 text-sm font-medium text-foreground  bg-accent/80 border border-border rounded-md hover:bg-accent transition-colors"
                          >
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#FF0000" xmlns="http://www.w3.org/2000/svg">
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                            <span>Watch Lectures</span>
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TopicModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          questions={selectedQuestions}
          startIndex={0}
          allTopics={allTopicNames}
          onSelectTopic={(topicName) => {
            // Find the topic and its questions
            const allQuestions = [
              ...htmlQuestions,
              ...cssQuestions,
              ...jsQuestions,
              ...tsQuestions,
              ...reactQuestions,
              ...nextjsQuestions,
              ...mongoQuestions,
              ...expressQuestions,
              ...backendQuestions,
              ...prismaQuestions,
              ...postgresQuestions,

            ];
            const topicQuestions = allQuestions.filter(q => q.topic === topicName);
            if (topicQuestions.length > 0) {
              setSelectedQuestions(topicQuestions);
            }
          }}
        />
      )}
    </div>
  );
}
