import { cn } from '@/lib/utils';

interface AgentFabricLogoProps {
  className?: string;
}

export function AgentFabricLogo({ className }: AgentFabricLogoProps) {
  return (
    <span className={cn('text-base font-semibold tracking-tight', className)}>Agent Fabric</span>
  );
}
