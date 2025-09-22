import React from 'react';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'motion/react';
import {
	FacebookIcon,
	GraduationCap,
	InstagramIcon,
	LinkedinIcon,
	YoutubeIcon,
	Users,
	Briefcase,
	Heart,
	Search,
	Mail,
	Phone,
	MapPin,
} from 'lucide-react';
import { Button } from './button';

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}
interface FooterLinkGroup {
	label: string;
	links: FooterLink[];
}

type StickyFooterProps = React.ComponentProps<'footer'>;

export function StickyFooter({ className, ...props }: StickyFooterProps) {
	return (
		<footer
			className={cn('relative h-[720px] w-full', className)}
			style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
			{...props}
		>
			<div className="fixed bottom-0 h-[720px] w-full">
				<div className="sticky top-[calc(100vh-720px)] h-full overflow-y-auto">
					<div className="relative flex size-full flex-col justify-between gap-5 border-t border-gray-800 bg-black px-4 py-8 md:px-12">
						<div
							aria-hidden
							className="absolute inset-0 isolate z-0 contain-strict"
						>
							<div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(255,255,255,0.06)_0,rgba(140,140,140,0.02)_50%,rgba(255,255,255,0.01)_80%)] absolute top-0 left-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full" />
							<div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.04)_0,rgba(255,255,255,0.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 [translate:5%_-50%] -rotate-45 rounded-full" />
							<div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.04)_0,rgba(255,255,255,0.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 -translate-y-87.5 -rotate-45 rounded-full" />
						</div>
						<div className="mt-10 flex flex-col gap-8 md:flex-row xl:mt-0">
							<AnimatedContainer className="w-full max-w-sm min-w-2xs space-y-4">
								<div className="flex items-center gap-2">
									<GraduationCap className="size-8 text-white" />
									<span className="text-2xl font-bold text-white">Alumni Connect</span>
								</div>
								<p className="text-gray-400 mt-8 text-sm md:mt-0">
									Connecting today's students with tomorrow's trailblazers. 
									Building meaningful relationships between current students and successful alumni worldwide.
								</p>
								<div className="flex gap-2">
									{socialLinks.map((link) => (
										<Button key={link.title} size="icon" variant="outline" className="size-8 border-gray-700 text-gray-400 hover:text-white hover:border-white">
											<link.icon className="size-4" />
										</Button>
									))}
								</div>
							</AnimatedContainer>
							{footerLinkGroups.map((group, index) => (
								<AnimatedContainer
									key={group.label}
									delay={0.1 + index * 0.1}
									className="w-full"
								>
									<div className="mb-10 md:mb-0">
										<h3 className="text-sm uppercase text-white font-semibold">{group.label}</h3>
										<ul className="text-gray-400 mt-4 space-y-2 text-sm md:text-xs lg:text-sm">
											{group.links.map((link) => (
												<li key={link.title}>
													<a
														href={link.href}
														className="hover:text-white inline-flex items-center transition-all duration-300"
													>
														{link.icon && <link.icon className="me-1 size-4" />}
														{link.title}
													</a>
												</li>
											))}
										</ul>
									</div>
								</AnimatedContainer>
							))}
						</div>
						<div className="text-gray-400 flex flex-col items-center justify-between gap-2 border-t border-gray-800 pt-2 text-sm md:flex-row">
							<p>© 2025 Alumni Connect. All rights reserved.</p>
							<p>Building bridges between generations</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

const socialLinks = [
	{ title: 'Facebook', href: '#', icon: FacebookIcon },
	{ title: 'Instagram', href: '#', icon: InstagramIcon },
	{ title: 'Youtube', href: '#', icon: YoutubeIcon },
	{ title: 'LinkedIn', href: '#', icon: LinkedinIcon },
];

const footerLinkGroups: FooterLinkGroup[] = [
	{
		label: 'Platform',
		links: [
			{ title: 'Student Portal', href: '#' },
			{ title: 'Alumni Directory', href: '#' },
			{ title: 'Mentorship Programs', href: '#' },
			{ title: 'Career Guidance', href: '#' },
			{ title: 'Job Opportunities', href: '#' },
			{ title: 'Industry Insights', href: '#' },
			{ title: 'Networking Events', href: '#' },
			{ title: 'Success Stories', href: '#' },
			{ title: 'Alumni Spotlights', href: '#' },
			{ title: 'University Partnerships', href: '#' },
		],
	},
	{
		label: 'Resources',
		links: [
			{ title: 'Career Resources', href: '#' },
			{ title: 'Interview Prep', href: '#' },
			{ title: 'Resume Building', href: '#' },
			{ title: 'Industry Reports', href: '#' },
			{ title: 'Webinars', href: '#' },
			{ title: 'Blog', href: '#' },
			{ title: 'Case Studies', href: '#' },
			{ title: 'Documentation', href: '#' },
			{ title: 'Help Center', href: '#' },
			{ title: 'Community Forum', href: '#' },
		],
	},
	{
		label: 'Connect',
		links: [
			{ title: 'Find Alumni', href: '#', icon: Users },
			{ title: 'Career Opportunities', href: '#', icon: Briefcase },
			{ title: 'Mentorship', href: '#', icon: Heart },
			{ title: 'Industry Research', href: '#', icon: Search },
			{ title: 'Contact Us', href: '#', icon: Mail },
			{ title: 'Phone Support', href: '#', icon: Phone },
			{ title: 'Office Locations', href: '#', icon: MapPin },
		],
	},
	{
		label: 'Company',
		links: [
			{ title: 'About Us', href: '#' },
			{ title: 'Our Mission', href: '#' },
			{ title: 'Leadership Team', href: '#' },
			{ title: 'Careers', href: '#' },
			{ title: 'Press & Media', href: '#' },
			{ title: 'Partnerships', href: '#' },
			{ title: 'Privacy Policy', href: '#' },
			{ title: 'Terms of Service', href: '#' },
			{ title: 'Cookie Policy', href: '#' },
			{ title: 'Data Protection', href: '#' },
		],
	},
];

type AnimatedContainerProps = React.ComponentProps<typeof motion.div> & {
	children?: React.ReactNode;
	delay?: number;
};

function AnimatedContainer({
	delay = 0.1,
	children,
	...props
}: AnimatedContainerProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return children;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			{...props}
		>
			{children}
		</motion.div>
	);
}
