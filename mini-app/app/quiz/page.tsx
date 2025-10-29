import { title } from "@/lib/metadata";
import Quiz from "@/components/quiz";

export default function QuizPage() {
  return (
    <main className="flex flex-col gap-6 p-4">
      <h1 className="text-3xl font-bold text-center">{title} - Quiz</h1>
      <Quiz />
    </main>
  );
}
