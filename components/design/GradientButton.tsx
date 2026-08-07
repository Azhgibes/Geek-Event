import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GradientButtonProps
  extends React.ComponentProps<typeof Button> {}

export default function GradientButton({
  className,
  children,
  ...props
}: GradientButtonProps) {
  return (
    <Button
      {...props}
      className={cn(
        "rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 text-white shadow-lg shadow-violet-500/30 transition-all duration-300 hover:scale-105 hover:shadow-violet-500/50",
        className
      )}
    >
      {children}
    </Button>
  );
}