function Card({
    children,
    className ="",
    style ={}
}) {
    return (
        <div
            style={style}
            className={`rounded-3xl shadow-xl p-6 ${className}`}
        >
            {children}
        </div>
    );
}

export default Card;