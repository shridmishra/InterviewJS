import { redirect } from 'next/navigation';

export default function ChallengesRootPage() {
  redirect('/challenges/list');
}
