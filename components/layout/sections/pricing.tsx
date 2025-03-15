"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

enum PopularPlan {
  NO = 0,
  YES = 1,
}

interface PlanProps {
  title: string;
  popular: PopularPlan;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
}

const plans: PlanProps[] = [
  {
    title: "Text",
    popular: 0,
    price: 0,
    description: "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
    buttonText: "Начать",
    benefitList: ["Text"],
  },
  {
    title: "Text",
    popular: 1,
    price: 45,
    description: "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
    buttonText: "Начать",
    benefitList: ["Text"],
  },
  {
    title: "Text",
    popular: 0,
    price: 120,
    description: "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
    buttonText: "Начать",
    benefitList: ["Text"],
  },
];

export const PricingSection = () => {
  return (
    <section className="container py-24 sm:py-32">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg text-primary tracking-wider">Pricing Plans</h2>
        <Button asChild variant="secondary" className="w-5/6 md:w-1/4 font-bold">
          <Link href="https://github.com/u0100/tensorflowjs-app" target="_blank">
            Github проекта
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-8">
        {plans.map(({ title, popular, price, description, buttonText, benefitList }) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle className="pb-2 text-2xl">{title}</CardTitle>
              <CardDescription className="pb-4 text-lg">{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex">
              <div className="space-y-4">
                {benefitList.map((benefit) => (
                  <span key={benefit} className="flex items-center">
                    <Check className="text-primary mr-2" />
                    <h3 className="text-lg">{benefit}</h3>
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="secondary" className="w-fit text-lg py-6">
                {buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
