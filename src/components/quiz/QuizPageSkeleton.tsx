import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

const QuizPageSkeleton = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="mb-8 space-y-2">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-6 w-96" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                    <Card key={index} className="flex flex-col">
                        <CardHeader>
                            <Skeleton className="w-12 h-12 rounded-lg mb-4" />
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-full mt-2" />
                            <Skeleton className="h-4 w-2/3 mt-1" />
                        </CardHeader>
                        <CardContent className="mt-auto pt-0">
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                                <Skeleton className="h-5 w-24" />
                                <Skeleton className="h-9 w-24" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default QuizPageSkeleton;
