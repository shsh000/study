// Card라는 이름의 함수 컴포넌트
function Card(props) {
    // children : containment
    // title, backgroundColor : specialization
    const {title, backgroundColor, children} = props;

    return (
        <div
            style={{
                margin:8,
                padding:8,
                borderRadius:8,
                boxShadow: "0px 0px 4px grey",
                backgroundColor: backgroundColor || "white"
            }}>
            {title && <h1>{title}</h1>}
            {children}
        </div>
    );
}

export default Card;