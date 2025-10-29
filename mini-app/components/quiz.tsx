"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

interface Option {
  label: string;
  princess: string;
}

interface Question {
  text: string;
  options: Option[];
}

const questions: Question[] = [
  {
    text: "What is your favorite type of adventure?",
    options: [
      { label: "Exploring new lands", princess: "Mulan" },
      { label: "Underwater quests", princess: "Ariel" },
      { label: "Reading and learning", princess: "Belle" },
      { label: "Finding true love", princess: "Cinderella" },
    ],
  },
  {
    text: "Which trait do you value most?",
    options: [
      { label: "Bravery", princess: "Mulan" },
      { label: "Curiosity", princess: "Ariel" },
      { label: "Intelligence", princess: "Belle" },
      { label: "Kindness", princess: "Cinderella" },
    ],
  },
  {
    text: "What is your ideal setting?",
    options: [
      { label: "A bustling city", princess: "Mulan" },
      { label: "A magical forest", princess: "Rapunzel" },
      { label: "A grand library", princess: "Belle" },
      { label: "A cozy cottage", princess: "Cinderella" },
    ],
  },
  {
    text: "How do you handle challenges?",
    options: [
      { label: "Face them head‑on", princess: "Mulan" },
      { label: "Seek help from friends", princess: "Ariel" },
      { label: "Solve them with knowledge", princess: "Belle" },
      { label: "Stay hopeful and patient", princess: "Cinderella" },
    ],
  },
  {
    text: "What is your favorite pastime?",
    options: [
      { label: "Training and discipline", princess: "Mulan" },
      { label: "Singing and dancing", princess: "Ariel" },
      { label: "Reading stories", princess: "Belle" },
      { label: "Helping others", princess: "Cinderella" },
    ],
  },
];

export default function Quiz() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [scores, setScores] = useState<Record<string, number>>({});

  const handleSelect = (qIndex: number, princess: string) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: princess }));
    setScores((prev) => ({
      ...prev,
      [princess]: (prev[princess] ?? 0) + 1,
    }));
  };

  const handleSubmit = () => {
    const maxScore = Math.max(...Object.values(scores));
    const topPrincesses = Object.entries(scores)
      .filter(([, score]) => score === maxScore)
      .map(([name]) => name);
    const chosen = topPrincesses[0];
    router.push(`/result?prince=${encodeURIComponent(chosen)}`);
  };

  return (
    <div className="flex flex-col gap-6">
      {questions.map((q, idx) => (
        <Card key={idx} className="bg-gradient-to-r from-indigo-100 to-purple-100">
          <CardHeader>
            <h3 className="text-lg font-semibold">{q.text}</h3>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[idx] ?? ""}
              onValueChange={(value) => handleSelect(idx, value)}
            >
              {q.options.map((opt, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <RadioGroupItem value={opt.princess} id={`${idx}-${i}`} />
                  <Label htmlFor={`${idx}-${i}`}>{opt.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      ))}
      <Button
        onClick={handleSubmit}
        disabled={Object.keys(answers).length < questions.length}
        className="self-center"
      >
        Find My Princess
      </Button>
    </div>
  );
}
