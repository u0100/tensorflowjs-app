"use client";

import { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  description: string;
  buttonText: string;
  benefitList: string[];
}

const plans: PlanProps[] = [
  {
    title: "ML-предсказания",
    popular: 0,
    description: "Введите слово, и нейросеть определит его настроение.",
    buttonText: "Предсказать",
    benefitList: ["TensorFlow.js"],
  },
  {
    title: "Text",
    popular: 1,
    description: "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
    buttonText: "Начать",
    benefitList: ["Text"],
  },
  {
    title: "Text",
    popular: 0,
    description: "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
    buttonText: "Начать",
    benefitList: ["Text"],
  },
];

const words = {
  positive: [
    "счастливый", "любовь", "замечательный", "прекрасный", "радостный", "удивительный", "великолепный", "светлый",
    "добрый", "вдохновляющий", "красивый", "теплый", "позитивный", "веселый", "чудесный", "восторженный", "успешный",
    "классный", "любезный", "дружелюбный", "здорово", "свежий", "жизнерадостный", "активный", "энергичный", "стремительный",
    "герой", "достойный", "великодушный", "сильный", "творческий", "умный", "счастье", "любящий", "доверчивый", "уважаемый",
    "гостеприимный", "верный", "смешной", "обожаемый", "талантливый", "отличный", "вдохновленный", "мудрый", "выдающийся",
    "светлый", "интересный", "любопытный", "вдохновляющий", "заботливый", "счастливо", "позитив", "великолепие", "героический",
    "удачный", "доброжелательный", "чистосердечный", "счастлив", "комфортный", "мудрый", "необыкновенный", "радость", "доброта",
    "освежающий", "положительный", "сбалансированный", "свободный", "открытый", "креативный", "успех", "удовлетворенный",
    "искусный", "обнадеживающий", "прогрессивный", "достойный", "счастье", "щедрый", "очаровательный", "свежесть", "лучшая",
    "надежный", "вдохновен", "восторг", "симпатичный", "чистосердечный", "классно", "потрясающий", "блестящий", "дружелюбный",
    "помогающий", "обожаемый", "успешность", "трудолюбивый", "светлый", "позитивно", "сильный", "яркий"
  ],
  negative: [
    "грустный", "ненависть", "ужасный", "страшный", "тревожный", "отвратительный", "мерзкий", "плохой", "неприятный", "страшно",
    "печальный", "отчаянный", "неудачный", "отказ", "мучительный", "безнадежный", "бедный", "разочарованный", "терпеть", "неудовлетворенный",
    "худший", "злой", "страшно", "скучный", "позор", "обидный", "ненавижу", "жуткий", "вредный", "ужас", "неудача", "ужасно", "гневный",
    "усталый", "плохо", "депрессивный", "неприятно", "агрессивный", "подлый", "хамский", "разрушительный", "вредоносный", "болезненный",
    "невезучий", "неискренний", "непокорный", "бесполезный", "одинокий", "разочарование", "трудный", "злобный", "слабый", "деструктивный",
    "неприятный", "невыносимый", "тяжелый", "болезненно", "страдание", "грустно", "страшно", "неудачный", "виновный", "угроза", "несправедливость",
    "немощный", "сложный", "опасный", "непопулярный", "потеря", "гнев", "психоз", "жалкий", "мрачный", "неприятности", "неприязнь",
    "пессимистичный", "неверный", "несчастье", "обман", "покорность", "сложность", "крушение", "гнев", "грустно", "разрушение", "неудача",
    "рискованный", "позор", "пессимизм", "невыносимо", "ненавидеть", "раздражение", "тоска", "жалоба", "неадекватный", "неудачный",
    "негативный", "болезнь", "позор", "изоляция", "неспокойный", "крик", "обидный", "крах", "страшный", "унылый"
  ]
};

export const PricingSection = () => {
  const [model, setModel] = useState<tf.Sequential | null>(null);
  const [word, setWord] = useState("");
  const [prediction, setPrediction] = useState<string | null>(null);

  useEffect(() => {
    const newModel = tf.sequential();
    newModel.add(tf.layers.dense({ units: 1, inputShape: [1], activation: "sigmoid" }));
    newModel.compile({ optimizer: "sgd", loss: "binaryCrossentropy" });

    const xs = tf.tensor2d([
      ...words.positive.map((_, i) => [i + 1]),
      ...words.negative.map((_, i) => [i + 1 + words.positive.length]),
    ]);
    const ys = tf.tensor2d([
      ...words.positive.map(() => [1]),
      ...words.negative.map(() => [0]),
    ]);

    newModel.fit(xs, ys, { epochs: 200 }).then(() => setModel(newModel));
  }, []);

  const handlePredict = () => {
    if (model) {
      const index = 
      words.positive.includes(word.toLowerCase()) 
    ? words.positive.indexOf(word.toLowerCase()) + 1
    : words.negative.includes(word.toLowerCase()) 
    ? words.negative.indexOf(word.toLowerCase()) + 1 + words.positive.length
    : -1; // Если слово не найдено


      const inputTensor = tf.tensor2d([[index]]);
      const output = model.predict(inputTensor) as tf.Tensor;
      const probability = output.dataSync()[0];

      setPrediction(probability > 0.5 ? "Позитивное слово! 😊" : "Негативное слово... 😢");
    }
  };

  return (
    <section className="container py-24 sm:py-32">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg text-primary tracking-wider">ML TensorFlow.js project</h2>
        <Button asChild variant="secondary" className="w-5/6 md:w-1/4 font-bold">
          <Link href="https://github.com/u0100/tensorflowjs-app" target="_blank">
            Github проекта
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-8">
        {plans.map(({ title, popular, description, buttonText, benefitList }, index) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle className="pb-2 text-2xl">{title}</CardTitle>
              <CardDescription className="pb-4 text-lg">{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {index === 0 ? (
                <>
                  <Input
                    type="text"
                    placeholder="Введите слово"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                  />
                  <Button onClick={handlePredict} disabled={!model}>
                    {buttonText}
                  </Button>
                  {prediction !== null && <p className="text-lg font-semibold">Результат: {prediction}</p>}
                </>
              ) : (
                <div className="space-y-4">
                  {benefitList.map((benefit) => (
                    <span key={benefit} className="flex items-center">
                      <Check className="text-primary mr-2" />
                      <h3 className="text-lg">{benefit}</h3>
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
