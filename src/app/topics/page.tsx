'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiMongodb, SiExpress, SiNodedotjs, SiPrisma, SiHtml5, SiPostgresql, SiCss3 } from 'react-icons/si';
import { FaYoutube } from 'react-icons/fa';
import { LayoutGrid, LayoutList, Play, Code, MessageCircleQuestion } from 'lucide-react';
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
  <div className="relative w-10 h-10 flex-shrink-0">
    <svg className="h-full w-full" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-muted/40" strokeWidth="3"></circle>
      <circle cx="18" cy="18" r="16" fill="none"
        className="stroke-current text-primary"
        strokeWidth="3"
        strokeDasharray={`${value}, 100`}
        strokeLinecap="round"
        transform="rotate(-90 18 18)"
      ></circle>
    </svg>
    <div className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold text-foreground">
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
    playlistUrl: 'https://www.youtube.com/playlist?list=PLu71SKxNbfoDBNF5s-WH6aLbthSEIMhMI',
    backupPlaylistUrl: 'https://www.youtube.com/playlist?list=PL0b6OzIxLPbz1cgxiH5KCBsyQij1HsPtG'
  },
  {
    name: 'CSS',
    description: 'Learn modern CSS including Flexbox, Grid, animations, and responsive design',
    questions: cssQuestions,
    icon: SiCss3,
    color: 'text-blue-500',
    slug: 'css',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLu71SKxNbfoDBNF5s-WH6aLbthSEIMhMI',
    backupPlaylistUrl: 'https://www.youtube.com/playlist?list=PL0b6OzIxLPbz1cgxiH5KCBsyQij1HsPtG'
  },
  {
    name: 'JavaScript',
    description: 'Deep dive into JS fundamentals, async patterns, DOM manipulation, and algorithms',
    questions: jsQuestions,
    icon: SiJavascript,
    color: 'text-yellow-500',
    slug: 'js',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37',
    backupPlaylistUrl: 'https://www.youtube.com/playlist?list=PLu0W_9lII9ahR1blWXxgSlL4y9iQBnLpR'
  },
  {
    name: 'TypeScript',
    description: 'Type-safe JavaScript with generics, utility types, and advanced patterns',
    questions: tsQuestions,
    icon: SiTypescript,
    color: 'text-blue-600',
    slug: 'ts',
    playlistUrl: 'https://www.youtube.com/watch?v=30LWjhZzg50',
    backupPlaylistUrl: 'https://www.youtube.com/playlist?list=PLu0W_9lII9agwhy658ZPA0MTStKUJTWPi'
  },
  {
    name: 'React',
    description: 'Build modern UIs with hooks, context, lifecycle methods, and best practices',
    questions: reactQuestions,
    icon: SiReact,
    color: 'text-cyan-500',
    slug: 'react',
    playlistUrl: 'https://www.youtube.com/watch?v=vz1RlUyrc3w&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige',
    backupPlaylistUrl: 'https://www.youtube.com/playlist?list=PLu0W_9lII9agx66oZnT6IyhcMIbUMNMdt'
  },
  {
    name: 'Next.js',
    description: 'Full-stack React framework with routing, SSR, API routes, and optimization',
    questions: nextjsQuestions,
    icon: SiNextdotjs,
    color: 'text-foreground',
    slug: 'nextjs',
    playlistUrl: 'https://www.youtube.com/watch?v=AR6eQCi_Me4&list=PLu71SKxNbfoDWGIwaEwhTUR40AbH8qsTo',
    backupPlaylistUrl: 'https://www.youtube.com/playlist?list=PLu0W_9lII9agtWvR_TZdb_r0dNI8-lDwG'
  },
  {
    name: 'Node.js',
    description: 'Server-side JavaScript with modules, streams, events, and HTTP servers',
    questions: backendQuestions,
    icon: SiNodedotjs,
    color: 'text-green-500',
    slug: 'nodejs',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW',
    backupPlaylistUrl: 'https://www.youtube.com/playlist?list=PLu0W_9lII9agiCUZYRsvtGTXdxkzPyItg'
  },
  {
    name: 'Express',
    description: 'Build robust APIs with middleware, routing, error handling, and security',
    questions: expressQuestions,
    icon: SiExpress,
    color: 'text-foreground',
    slug: 'express',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW',
    backupPlaylistUrl: 'https://www.youtube.com/playlist?list=PLu0W_9lII9aiQehcKXYgkRcpfXA39GqfA'
  },
  {
    name: 'MongoDB',
    description: 'NoSQL database fundamentals with CRUD, aggregation, and schema design',
    questions: mongoQuestions,
    icon: SiMongodb,
    color: 'text-green-600',
    slug: 'mongo',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW',
    backupPlaylistUrl: 'https://www.youtube.com/playlist?list=PL4cUxeGkcC9h77dJ-QJlwGlZlTd4ecZOA'
  },
  {
    name: 'PostgreSQL',
    description: 'Relational database mastery with joins, transactions, and advanced SQL',
    questions: postgresQuestions,
    icon: SiPostgresql,
    color: 'text-blue-500',
    slug: 'postgres',
    playlistUrl: 'https://www.youtube.com/watch?v=cnzka7kF5Zk',
    backupPlaylistUrl: 'https://www.youtube.com/playlist?list=PLVlQHNRLflP8IGz5OwhsqPFw3SX3EN16v'
  },
  {
    name: 'Prisma',
    description: 'Modern ORM with type-safe queries, migrations, and database optimization',
    questions: prismaQuestions,
    icon: SiPrisma,
    color: 'text-indigo-600',
    slug: 'prisma',
    playlistUrl: 'https://www.youtube.com/watch?v=-_nz4q_Cyr4',
    backupPlaylistUrl: 'https://www.youtube.com/watch?v=RebA5J-rlwg'
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
                          <Button
                            size="default"
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium h-10"
                            onClick={() => router.push(`/practice/${topic.slug}`)}
                          >
                            <Code className="h-4 w-4 mr-2" />
                            Start Practice
                          </Button>
                          <div className="flex gap-2 w-full">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 text-foreground/80 hover:text-foreground border-border/60 hover:bg-accent h-9"
                              onClick={() => handleTopicClick(topic.questions)}
                            >
                              <MessageCircleQuestion className="h-4 w-4 mr-1.5" />
                              Interview Q&A
                            </Button>
                            {topic.playlistUrl && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 text-foreground/80 hover:text-foreground border-border/60 hover:bg-accent h-9"
                                asChild
                              >
                                <a
                                  href={topic.playlistUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Play className="h-4 w-4 mr-1.5" />
                                  Lectures
                                </a>
                              </Button>
                            )}
                          </div>
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
                    className="hover:border-primary/40 transition-all hover:shadow-lg flex flex-col group relative overflow-hidden"
                  >


                    <CardHeader className="py-2 px-4">
                      {/* Header row: Icon + Title + Progress */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 flex-shrink-0`}>
                            <Icon className={`w-6 h-6 ${topic.color}`} />
                          </div>
                          <div>
                            <CardTitle className="text-lg font-semibold leading-tight text-foreground">{topic.name}</CardTitle>
                            <span className="text-xs text-muted-foreground mt-0.5 block">
                              {topic.solved}/{topic.total} completed
                            </span>
                          </div>
                        </div>
                        <CircularProgress value={topic.progress} />
                      </div>

                      {/* Description */}
                      <CardDescription className="line-clamp-2 text-sm mt-4 leading-relaxed text-foreground/70">
                        {topic.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="mt-auto py-0 px-4 ">
                      {/* Actions with clear hierarchy */}
                      <div className="space-y-4 pt-4 border-t border-border/50">
                        {/* Primary CTA - Practice */}
                        <Button
                          size="default"
                          className="w-full bg-primary  text-primary-foreground hover:bg-primary/90 font-m h-10"
                          onClick={() => router.push(`/practice/${topic.slug}`)}
                        >
                          <Code className="h-4 w-4 mr-2" />
                          Start Practice
                        </Button>

                        {/* Secondary actions row */}
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 text-foreground/80 hover:text-foreground border-border/60 hover:bg-accent h-9"
                            onClick={() => handleTopicClick(topic.questions)}
                          >
                            <MessageCircleQuestion className="h-4 w-4 mr-1.5" />
                            Interview Q&A
                          </Button>
                          {topic.playlistUrl && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 text-foreground/80 hover:text-foreground border-border/60 hover:bg-accent h-9"
                              asChild
                            >
                              <a
                                href={topic.playlistUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Play className="h-4 w-4 mr-1.5" />
                                Lectures
                              </a>
                            </Button>
                          )}
                        </div>
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
