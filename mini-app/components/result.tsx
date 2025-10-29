"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Share } from "@/components/share";

interface Princess {
  name: string;
  image: string;
  description: string;
}

const princesses: Princess[] = [
  {
    name: "Mulan",
    image: "/images/mulan.png",
    description:
      "A brave warrior who defies expectations to protect her family and country.",
  },
  {
    name: "Ariel",
    image: "/images/ariel.png",
    description:
      "A curious mermaid who dreams of exploring the human world beyond the sea.",
  },
  {
    name: "Belle",
    image: "/images/belle.png",
    description:
      "A book lover who values knowledge and kindness over appearances.",
  },
  {
    name: "Cinderella",
    image: "/images/cinderella.png",
    description:
      "A kind‑hearted girl who finds hope and love despite adversity.",
  },
  {
    name: "Rapunzel",
    image: "/images/rapunzel.png",
    description:
      "A free spirit who seeks adventure and connection beyond her tower.",
  },
];

export default function Result() {
  const params = useSearchParams();
  const [princess, setPrincess] = useState<Princess | null>(null);

  useEffect(() => {
    const name = params.get("prince");
    if (name) {
      const found = princesses.find((p) => p.name === name);
      setPrincess(found ?? null);
    }
  }, [params]);

  if (!princess) {
    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-xl">Unable to determine your princess.</p>
      </div>
    );
  }

  const shareUrl = `${process.env.NEXT_PUBLIC_URL}/result?prince=${encodeURIComponent(
    princess.name
  )}`;

  return (
    <Card className="max-w-md mx-auto bg-gradient-to-r from-pink-100 to-yellow-100">
      <CardHeader>
        <h2 className="text-2xl font-bold">{princess.name}</h2>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <img
          src={princess.image}
          alt={princess.name}
          className="w-48 h-48 rounded-full object-cover"
        />
        <p className="text-center">{princess.description}</p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Share
          title={`I am ${princess.name}!`}
          description={princess.description}
          imageUrl={princess.image}
          url={shareUrl}
        />
      </CardFooter>
    </Card>
  );
}
