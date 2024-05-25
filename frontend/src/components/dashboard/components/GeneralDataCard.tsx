import { Card, CardDescription } from "@/components/ui/card"
import React from 'react';

interface CardProps {
  title: string,
  icon: React.ElementType,
  text: string,
  paragraph: string
}

export function GeneralDataCard({title, icon: Icon, text, paragraph}: CardProps) {
  return (
    <Card className="flex flex-col gap-2 w-72 p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        <Icon size={20} className="text-slate-700" />
      </div>

      <h2 className="text-2xl font-bold inline">{text}</h2>
      <CardDescription className="">{paragraph}</CardDescription>
    </Card>
  )
}