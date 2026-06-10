function Badge({
    children,
    className = ""
}) {

    return(
        <span
            className={`px-4 py-2 rounded-full text-md font-medium ${className}`}
        >
            {children}
        </span>
    );
    
}

export default Badge;