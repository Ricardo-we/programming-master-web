import Link from "next/dist/client/link";

function CustomLink({ children, to = "", ...props }) {
    return (
        <>
            <style jsx>{`
            .base-anchor {
                text-decoration: none;
            }
        `}</style>
            <Link href={to}>
                <a style={props?.style} className={`base-anchor ${props.className}`}>
                    {children}
                </a>
            </Link>
        </>
    );
}


export default CustomLink;