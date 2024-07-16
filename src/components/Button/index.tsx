import cn from "classnames";
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import s from "./styles.module.scss";

interface ButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    icon: ReactNode;
    className?: string;
}

export default function Button({ icon, className, ...props }: ButtonProps): JSX.Element {
    return (
        <button className={cn(s.button, className)} {...props}>{icon}</button>
    )
}