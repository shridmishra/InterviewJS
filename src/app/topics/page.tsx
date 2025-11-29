'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiMongodb, SiExpress, SiNodedotjs, SiPrisma, SiHtml5, SiPostgresql, SiCss3 } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { TopicModal } from '@/components/topics/TopicModal';
import type { TopicQuestion } from '@/data/topics/types';
import Header from '@/components/common/Header';
import { useChallenges } from '@/hooks/useChallenges';
import { ProblemStatus } from '@/types';

const CircularProgress = ({ value }: { value: number }) => (
  <div className="relative w-12 h-12">
    <svg className="h-full w-full" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-muted/20" strokeWidth="3"></circle>
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

// Define the 11 topics with React Icons
const topics = [
  { name: 'JavaScript', questions: jsQuestions, icon: SiJavascript, color: 'text-yellow-500', slug: 'js' },
  { name: 'TypeScript', questions: tsQuestions, icon: SiTypescript, color: 'text-blue-600', slug: 'ts' },
  { name: 'React', questions: reactQuestions, icon: SiReact, color: 'text-cyan-500', slug: 'react' },
  { name: 'Next.js', questions: nextjsQuestions, icon: SiNextdotjs, color: 'text-foreground', slug: 'nextjs' },
  { name: 'MongoDB', questions: mongoQuestions, icon: SiMongodb, color: 'text-green-600', slug: 'mongo' },
  { name: 'Express', questions: expressQuestions, icon: SiExpress, color: 'text-foreground', slug: 'express' },
  { name: 'Node.js', questions: backendQuestions, icon: SiNodedotjs, color: 'text-green-500', slug: 'nodejs' },
  { name: 'Prisma', questions: prismaQuestions, icon: SiPrisma, color: 'text-indigo-600', slug: 'prisma' },
  { name: 'PostgreSQL', questions: postgresQuestions, icon: SiPostgresql, color: 'text-blue-500', slug: 'postgres' },
  { name: 'HTML', questions: htmlQuestions, icon: SiHtml5, color: 'text-orange-600', slug: 'html' },
  { name: 'CSS', questions: cssQuestions, icon: SiCss3, color: 'text-blue-500', slug: 'css' }
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
  const { problems: allProblems } = useChallenges();

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Get all unique topic names from all questions
  const allTopicNames = Array.from(
    new Set([
      ...jsQuestions.map(q => q.topic),
      ...tsQuestions.map(q => q.topic),
      ...reactQuestions.map(q => q.topic),
      ...nextjsQuestions.map(q => q.topic),
      ...mongoQuestions.map(q => q.topic),
      ...expressQuestions.map(q => q.topic),
      ...backendQuestions.map(q => q.topic),
      ...prismaQuestions.map(q => q.topic),
      ...postgresQuestions.map(q => q.topic),
      ...htmlQuestions.map(q => q.topic),
      ...cssQuestions.map(q => q.topic)
    ])
  );

  const handleTopicClick = (topicQuestions: TopicQuestion[]) => {
    setSelectedQuestions(topicQuestions);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onBack={() => router.push('/practice/js')}
        problemTitle="Topic Questions"
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Topic Questions</h1>
          <p className="text-muted-foreground mb-8">
            Practice common questions across 9 different topics
          </p>

          {/* 3x3 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              // Show skeleton cards while loading
              Array.from({ length: 9 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            ) : (
              topics.map((topic) => {
                const Icon = topic.icon;
                return (
                  <Card
                    key={topic.name}
                    className="hover:border-primary/50 transition-all hover:shadow-md flex flex-col group relative"
                  >
                    <div className="absolute top-4 right-4">
                      <CircularProgress value={(() => {
                        const topicProblems = allProblems.filter(p => p.slug === topic.slug);
                        const total = topicProblems.length;
                        const solved = topicProblems.filter(p => p.status === ProblemStatus.Solved).length;
                        return total > 0 ? (solved / total) * 100 : 0;
                      })()} />
                    </div>
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                        <Icon className={`w-6 h-6 ${topic.color.replace('text-', 'text-')}`} />
                      </div>
                      <CardTitle className="text-xl">{topic.name}</CardTitle>
                      <CardDescription className="line-clamp-2 text-sm mt-2">
                        Practice {topic.name} questions
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto pt-0">
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                        <div className="flex gap-2 w-full">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleTopicClick(topic.questions)}
                          >
                            Interview Questions
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            className="flex-1"
                            onClick={() => router.push(`/practice/${topic.slug}`)}
                          >
                            Practice
                          </Button>
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
