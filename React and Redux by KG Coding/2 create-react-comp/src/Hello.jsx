function Hello() {
    const myName = "Danyal";
    const fullName = () => {
        return "Danyal Rana";
    }
    return (
        <h3>Hellow, this is the future speaking, I'm {fullName()}</h3>
    )
}

export default Hello;