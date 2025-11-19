'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { interviewQuestions, type InterviewQuestion } from '@/data/interviews';
import { InterviewModal } from '@/components/interview/InterviewModal';

export default function InterviewPage() {
  const router = useRouter();
  const [questions] = useState<InterviewQuestion[]>(interviewQuestions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<InterviewQuestion[]>([]);

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">No interview questions available.</p>
          <Button onClick={() => router.push('/challenges')} className="mt-4">
            Back to Challenges
          </Button>
        </div>
      </div>
    );
  }

  const allTopics = Array.from(new Set(questions.map((q) => q.topic)));

  return (
    <div className="min-h-screen bg-background">
      {/* Header islands */}
      <div className="sticky top-0 z-10 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="secondary"
              onClick={() => router.push('/challenges')}
              className="rounded-full gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Challenge
            </Button>
            <div className="rounded-full bg-card border border-border px-4 py-2 text-sm font-medium">
              JavaScript
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Interview Topics</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(() => {
              const groupedTopics: Record<string, string[]> = {
                'JavaScript': ['JavaScript Basics', 'Asynchronous JavaScript', 'DOM & Events'],
                'React': ['React'],
                'TypeScript': ['TypeScript'],
                'HTML & CSS': ['HTML & CSS'],
                'Backend': ['Express', 'MongoDB', 'Node.js']
              };

              // Get all available topics from questions to ensure we don't miss any
              // const allTopics = Array.from(new Set(questions.map(q => q.topic))); // This line is now moved outside

              // Add any topics not explicitly grouped to "Other"
              const groupedSet = new Set(Object.values(groupedTopics).flat());
              const otherTopics = allTopics.filter(t => !groupedSet.has(t));
              if (otherTopics.length > 0) {
                groupedTopics['Other'] = otherTopics;
              }

              return Object.entries(groupedTopics).map(([category, categoryTopics]) => {
                const categoryQuestions = questions.filter((q) => categoryTopics.includes(q.topic));

                if (categoryQuestions.length === 0) return null;

                return (
                  <Card
                    key={category}
                    className="hover:border-primary/50 transition-all cursor-pointer hover:shadow-md group"
                    onClick={() => {
                      setSelectedQuestions(categoryQuestions);
                      setIsModalOpen(true);
                    }}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-xl">
                        {category}
                      </CardTitle>
                      <CardDescription>
                        {categoryQuestions.length} Questions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground">
                        Includes: {categoryTopics.filter(t => questions.some(q => q.topic === t)).join(', ')}
                      </div>
                    </CardContent>
                  </Card>
                );
              });
            })()}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <InterviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          questions={selectedQuestions}
          startIndex={0}
          allTopics={allTopics}
          onSelectTopic={(topic) => {
            // Find questions for this topic
            const topicQuestions = questions.filter(q => q.topic === topic);
            if (topicQuestions.length > 0) {
              setSelectedQuestions(topicQuestions);
              // Modal is already open, but state update will trigger re-render with new questions
            }
          }}
        />
      )}
    </div>
  );
}
