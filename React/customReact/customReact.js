function customRendor (reactElement, mainContainer) {
    const domElement = document.createElement(reactElement.type);

    domElement.innerHTML = reactElement.txt;
    domElement.setAttribute("href", reactElement.props.href);
    domElement.setAttribute("target", reactElement.props.target);

    mainContainer.appendChild(domElement);
};

const reactElement = {
    type: 'a',
    props: {
        href: "https:mdrana.com",
        target: "_blank"
    },
    txt: "Click me to visit my Portfolio"
};

const mainContainer = document.querySelector("#root");

customRendor (reactElement, mainContainer)