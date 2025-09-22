"use client";

import { useEffect, useRef, useState } from "react";
import { Users, GraduationCap, Briefcase, Heart, Search, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";

export function GlowingCardsDemo() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={sectionRef}
      className={cn(
        "w-full max-w-7xl mx-auto px-4 py-16 transition-all duration-1000 ease-out",
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-8"
      )}
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Why Choose Alumni Connect?
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Discover the power of meaningful connections between students and alumni
        </p>
      </div>
      
      <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
        <GridItem
          area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
          icon={<Users className="h-4 w-4" />}
          title="Connect with Alumni"
          description="Find and connect with successful alumni from your university who are ready to mentor and guide you."
          delay={0}
          isVisible={isVisible}
        />
        <GridItem
          area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
          icon={<GraduationCap className="h-4 w-4" />}
          title="Career Guidance"
          description="Get personalized career advice from professionals who have walked the same path you're on."
          delay={200}
          isVisible={isVisible}
        />
        <GridItem
          area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
          icon={<Briefcase className="h-4 w-4" />}
          title="Job Opportunities"
          description="Discover exclusive job openings and internship opportunities shared by alumni in your field."
          delay={400}
          isVisible={isVisible}
        />
        <GridItem
          area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
          icon={<Heart className="h-4 w-4" />}
          title="Mentorship Programs"
          description="Join structured mentorship programs designed to accelerate your professional growth."
          delay={600}
          isVisible={isVisible}
        />
        <GridItem
          area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
          icon={<Search className="h-4 w-4" />}
          title="Industry Insights"
          description="Stay updated with the latest industry trends and insights from experienced professionals."
          delay={800}
          isVisible={isVisible}
        />
      </ul>
    </div>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  delay?: number;
  isVisible?: boolean;
}

const GridItem = ({ area, icon, title, description, delay = 0, isVisible = false }: GridItemProps) => {
  return (
    <li className={cn("min-h-[14rem] list-none", area)}>
      <div 
        className={cn(
          "relative h-full rounded-[1.25rem] border-[0.75px] border-gray-700 p-2 md:rounded-[1.5rem] md:p-3 transition-all duration-700 ease-out",
          isVisible 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-4"
        )}
        style={{
          transitionDelay: `${delay}ms`
        }}
      >
        <GlowingEffect
          spread={60}
          glow={true}
          disabled={false}
          proximity={80}
          inactiveZone={0.01}
          borderWidth={4}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-gray-900/50 backdrop-blur-sm p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border-[0.75px] border-gray-600 bg-gray-800/50 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-white">
                {title}
              </h3>
              <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-gray-300">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
