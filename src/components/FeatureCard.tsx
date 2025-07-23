import React from "react";
import {
  AnimatedFeatureCard,
  AnimatedFeatureCardProps,
} from "@/components/ui/animated";

const FeatureCard = (props: Omit<AnimatedFeatureCardProps, "variant">) => (
  <AnimatedFeatureCard {...props} variant="simple" />
);

export default FeatureCard;
