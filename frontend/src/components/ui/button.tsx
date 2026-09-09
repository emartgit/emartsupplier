import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]',
  {
    variants: {
      variant: {
        default: 'bg-blue-600 text-white hover:bg-blue-700',
        outline: 'border border-gray-300 bg-white hover:bg-gray-50',
        ghost:   'hover:bg-gray-100',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm:      'h-9 px-3',
        lg:      'h-11 px-8',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, onClick, children, ...props }, ref) => {
    const [iconKey, setIconKey] = React.useState(0);
    const [showIcon, setShowIcon] = React.useState(false);

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
      // Ripple
      const btn = e.currentTarget;
      const circle = document.createElement('span');
      const diameter = Math.max(btn.clientWidth, btn.clientHeight);
      const radius = diameter / 2;
      const rect = btn.getBoundingClientRect();
      circle.className = 'ripple';
      circle.style.width  = circle.style.height = `${diameter}px`;
      circle.style.left   = `${e.clientX - rect.left - radius}px`;
      circle.style.top    = `${e.clientY - rect.top  - radius}px`;
      btn.appendChild(circle);
      setTimeout(() => circle.remove(), 600);

      // Arrow icon burst
      setIconKey(k => k + 1);
      setShowIcon(true);
      setTimeout(() => setShowIcon(false), 500);

      onClick?.(e);
    }

    if (asChild) {
      return <Slot ref={ref} className={cn(buttonVariants({ variant, size, className }))} onClick={onClick} {...props}>{children}</Slot>;
    }

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }), 'btn-ripple')}
        onClick={handleClick}
        {...props}
      >
        {children}
        {showIcon && (
          <span key={iconKey} className="btn-arrow-icon">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </span>
        )}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
