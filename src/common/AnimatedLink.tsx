import React from 'react';
import { useNavigate } from 'react-router';

interface Props {
    to: string;
    children: React.ReactNode;
    onClick?: (to: string) => void;
}

const AnimatedLink = (props: Props) => {
    const { to, children, onClick } = props;
    const navigate = useNavigate();

    const handleClick = (
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        event.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (document as any).startViewTransition(() => {
            if (onClick) {
                onClick(to);
            }
            navigate(to);
        });
    };

    return (
        <a href={to} onClick={handleClick}>
            {children}
        </a>
    );
};

export default AnimatedLink;
