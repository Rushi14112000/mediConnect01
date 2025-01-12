export const Addition = (props) => {
    return (
        <div>
            <h1>Result</h1>
            <p> The addition is :{props.a + props.b}</p>
        </div>
    );
};


export const multiplication = (props) => {
    return (
        <>
            <p> The product is :{props.a * props.b}</p>
        </>
    )
}

const Subtraction = (props) => {
    return (
        <>
            <p> The subtraction is :{props.a - props.b}</p>
        </>
    )
}
export default Subtraction
