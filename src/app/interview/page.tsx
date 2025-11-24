'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiMongodb, SiExpress, SiNodedotjs, SiPrisma, SiHtml5 } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { InterviewModal } from '@/components/interview/InterviewModal';
import type { InterviewQuestion } from '@/data/interviews/types';
import Header from '@/components/common/Header';

// Import questions from each file
import { jsQuestions } from '@/data/interviews/javascript';
import { tsQuestions } from '@/data/interviews/typescript';
import { reactQuestions } from '@/data/interviews/react';
import { nextjsQuestions } from '@/data/interviews/nextjs';
import { mongoQuestions } from '@/data/interviews/mongo';
import { expressQuestions } from '@/data/interviews/express';
import { backendQuestions } from '@/data/interviews/backend';
import { prismaPostgresQuestions } from '@/data/interviews/prisma-postgres';
import { htmlCssQuestions } from '@/data/interviews/html-css';

// Define the 9 topics with React Icons
const topics = [
  { name: 'JavaScript', questions: jsQuestions, icon: SiJavascript, color: 'text-yellow-500' },
  { name: 'TypeScript', questions: tsQuestions, icon: SiTypescript, color: 'text-blue-600' },
  { name: 'React', questions: reactQuestions, icon: SiReact, color: 'text-cyan-500' },
  { name: 'Next.js', questions: nextjsQuestions, icon: SiNextdotjs, color: 'text-foreground' },
  { name: 'MongoDB', questions: mongoQuestions, icon: SiMongodb, color: 'text-green-600' },
  { name: 'Express', questions: expressQuestions, icon: SiExpress, color: 'text-foreground' },
  { name: 'Node.js', questions: backendQuestions, icon: SiNodedotjs, color: 'text-green-500' },
  { name: 'Prisma & PostgreSQL', questions: prismaPostgresQuestions, icon: SiPrisma, color: 'text-indigo-600' },
  { name: 'HTML & CSS', questions: htmlCssQuestions, icon: SiHtml5, color: 'text-orange-600' }
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

export default function InterviewPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<InterviewQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
      ...prismaPostgresQuestions.map(q => q.topic),
      ...htmlCssQuestions.map(q => q.topic)
    ])
  );

  const handleTopicClick = (topicQuestions: InterviewQuestion[]) => {
    setSelectedQuestions(topicQuestions);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onBack={() => router.push('/practice/js')}
        problemTitle="Interview Questions"
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Interview Questions</h1>
          <p className="text-muted-foreground mb-8">
            Practice common interview questions across 9 different topics
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
                    className="hover:border-primary/50 transition-all hover:shadow-md flex flex-col group"
                  >
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                        <Icon className={`w-6 h-6 ${topic.color.replace('text-', 'text-')}`} />
                      </div>
                      <CardTitle className="text-xl">{topic.name}</CardTitle>
                      <CardDescription className="line-clamp-2 text-sm mt-2">
                        Practice {topic.name} interview questions
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto pt-0">
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                        <span className="text-sm text-muted-foreground font-medium bg-secondary/50 px-2 py-1 rounded">
                          {topic.questions.length} Questions
                        </span>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleTopicClick(topic.questions)}
                        >
                          Start Practice
                        </Button>

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
        <InterviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          questions={selectedQuestions}
          startIndex={0}
          allTopics={allTopicNames}
          onSelectTopic={(topicName) => {
            // Find the topic and its questions
            const allQuestions = [
              ...htmlCssQuestions,
              ...jsQuestions,
              ...tsQuestions,
              ...reactQuestions,
              ...nextjsQuestions,
              ...mongoQuestions,
              ...expressQuestions,
              ...backendQuestions,
              ...prismaPostgresQuestions,

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
