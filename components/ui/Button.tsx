import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        yellow: 'bg-[var(--color-button-yellow)] text-[var(--color-foreground-base)] shadow-[0px_0px_0px_1px_rgba(229,225,146,0.8),0px_1px_2px_rgba(0,0,0,0.2),inset_0px_0.75px_0px_rgba(255,255,255,0.2)] hover:brightness-95',
        dark: 'bg-[var(--color-foreground-base)] text-white shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_2px_rgba(0,0,0,0.12)] hover:bg-[#2a2924]',
        white: 'bg-white text-[var(--color-foreground-base)] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_2px_rgba(0,0,0,0.12)] hover:bg-gray-50',
        'dark-blur': 'bg-[var(--color-foreground-base)]/80 backdrop-blur-[20px] text-white hover:bg-[var(--color-foreground-base)]/90',
        'white-blur': 'bg-white/80 backdrop-blur-[20px] text-[var(--color-foreground-base)] hover:bg-white/90',
        outline: 'border border-[var(--color-border-base)] bg-transparent text-[var(--color-foreground-base)] hover:bg-[var(--color-background-muted)]',
      },
      size: {
        xs: 'h-[30px] px-3 text-xs rounded-[var(--radius-8)]',
        s: 'h-9 px-4 text-sm rounded-[var(--radius-8)]',
        m: 'h-[42px] px-5 text-base rounded-[var(--radius-12)]',
        l: 'h-[50px] px-6 text-base rounded-[var(--radius-12)]',
      },
    },
    defaultVariants: {
      variant: 'yellow',
      size: 'm',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, children, ...props }, ref) => {
    if (href) {
      return (
        <a
          href={href}
          className={buttonVariants({ variant, size, className })}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
