import Link from "next/dist/client/link";

function CustomLink({ children, to = "", ...props }) {
    return (
        <>
            <style jsx>{`
            .base-anchor {
                text-decoration: none;
                color: var(--primary);
            }
            .base-anchor:hover {
                text-decoration: underline;
            }
        `}</style>
            <Link href={to}>
                <a className={`base-anchor ${props.className}`}>
                    {children}
                </a>
            </Link>
        </>
    );
}


export default CustomLink;