import { HTMLAttributes, memo } from "react";
import './ScreenReaderText.css';

interface ScreenReaderTextProps extends HTMLAttributes<HTMLSpanElement> {
    children: string;
}

export const ScreenReaderText = memo((props: ScreenReaderTextProps) => (
    <span className="screen-reader-text" {...props}>
        {props.children}
    </span>
))