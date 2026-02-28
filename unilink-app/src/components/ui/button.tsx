import * as React from "react"

type ClassValue = ClassArray | ClassDictionary | string | number | null | boolean | undefined;
interface ClassDictionary {
    [id: string]: any;
}
interface ClassArray extends Array<ClassValue> { }

const clsx = (...classes: ClassValue[]): string => {
    let i = 0, tmp, x, str = '';
    while (i < classes.length) {
        if (tmp = classes[i++]) {
            if (x = toVal(tmp)) {
                str && (str += ' ');
                str += x
            }
        }
    }
    return str;
}

const toVal = (mix: any): string => {
    let k, y, str = '';
    if (typeof mix === 'string' || typeof mix === 'number') {
        str += mix;
    } else if (typeof mix === 'object') {
        if (Array.isArray(mix)) {
            for (k = 0; k < mix.length; k++) {
                if (mix[k] && (y = toVal(mix[k]))) {
                    str && (str += ' ');
                    str += y;
                }
            }
        } else {
            for (k in mix) {
                if (mix[k]) {
                    str && (str += ' ');
                    str += k;
                }
            }
        }
    }
    return str;
}
export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline' | 'ghost' | 'link'
    size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={clsx(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50",
                    {
                        "bg-primary-600 text-white hover:bg-neutral-900 hover:text-white shadow-sm hover:shadow-lg": variant === "default",
                        "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-900 hover:text-white shadow-sm hover:shadow-lg": variant === "outline",
                        "hover:bg-neutral-100 hover:text-neutral-900": variant === "ghost",
                        "text-primary-600 underline-offset-4 hover:underline": variant === "link",
                        "h-9 px-4 py-2": size === "default",
                        "h-8 rounded-md px-3 text-xs": size === "sm",
                        "h-10 rounded-md px-8": size === "lg",
                        "h-9 w-9": size === "icon",
                    },
                    className
                )}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, clsx as cn }
