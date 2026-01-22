import * as LucideIcons from 'lucide-react';
import { LucideProps } from 'lucide-react';

interface IconProps extends LucideProps {
  name: string;
  fallback?: string;
}

export default function Icon({ name, fallback = 'CircleAlert', ...props }: IconProps) {
  const IconComponent = (LucideIcons as any)[name] || (LucideIcons as any)[fallback];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found, fallback "${fallback}" also not found`);
    return null;
  }
  
  return <IconComponent {...props} />;
}
