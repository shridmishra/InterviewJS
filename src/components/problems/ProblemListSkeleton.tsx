import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/Card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

const ProblemListSkeleton = () => {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <main className="grow container mx-auto p-0 md:p-6 lg:p-8 flex flex-col">
                {/* Progress Summary Skeleton */}
                <Card className="mb-6">
                    <div className="p-4 md:p-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
                        <div className="flex items-center justify-between md:justify-start gap-6">
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-16 w-16 md:h-20 md:w-20 rounded-full" />
                                <div>
                                    <Skeleton className="h-4 w-24 mb-2" />
                                    <Skeleton className="h-8 w-32" />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-0 md:flex md:items-center md:gap-x-8 md:gap-y-4">
                            <div className="border-t border-border pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-6">
                                <Skeleton className="h-4 w-12 mb-2" />
                                <Skeleton className="h-6 w-20" />
                            </div>
                            <div className="border-t border-border pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-6">
                                <Skeleton className="h-4 w-16 mb-2" />
                                <Skeleton className="h-6 w-24" />
                            </div>
                            <div className="border-t border-border pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-6">
                                <Skeleton className="h-4 w-10 mb-2" />
                                <Skeleton className="h-6 w-16" />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Filters Skeleton */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-2 p-1 bg-secondary rounded-full">
                        <Skeleton className="h-8 w-24 rounded-full" />
                        <Skeleton className="h-8 w-24 rounded-full" />
                    </div>
                    <div className="flex flex-row gap-2 items-center md:gap-4">
                        <Skeleton className="h-10 w-32" />
                        <Skeleton className="h-10 w-24" />
                        <Skeleton className="h-10 w-40" />
                    </div>
                </div>

                {/* Problem Groups Skeleton */}
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-card rounded-lg mb-4 border border-border">
                        <div className="p-4 font-semibold text-foreground rounded-t-lg">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                <div className="flex items-center gap-4">
                                    <Skeleton className="h-5 w-5" />
                                    <Skeleton className="h-6 w-40" />
                                </div>
                                <Skeleton className="h-4 w-16 mt-2 sm:mt-0" />
                            </div>
                        </div>
                        <div className="border-t border-border overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead className="w-12 hidden sm:table-cell"><Skeleton className="h-5 w-5" /></TableHead>
                                        <TableHead><Skeleton className="h-5 w-32" /></TableHead>
                                        <TableHead className="hidden md:table-cell w-32 text-center"><Skeleton className="h-5 w-24 mx-auto" /></TableHead>
                                        <TableHead className="w-32 text-center"><Skeleton className="h-5 w-20 mx-auto" /></TableHead>
                                        <TableHead className="w-32 text-center"><Skeleton className="h-5 w-16 mx-auto" /></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {[...Array(3)].map((_, j) => (
                                        <TableRow key={j}>
                                            <TableCell className="hidden sm:table-cell"><Skeleton className="h-5 w-5" /></TableCell>
                                            <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                                            <TableCell className="hidden md:table-cell w-32 text-center"><Skeleton className="h-5 w-20 mx-auto" /></TableCell>
                                            <TableCell className="w-32 text-center"><Skeleton className="h-5 w-16 mx-auto" /></TableCell>
                                            <TableCell className="w-32 text-center">
                                                <div className="flex items-center justify-center gap-1">
                                                    <Skeleton className="h-7 w-7 rounded-full" />
                                                    <Skeleton className="h-7 w-7 rounded-full" />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
};

export default ProblemListSkeleton;
