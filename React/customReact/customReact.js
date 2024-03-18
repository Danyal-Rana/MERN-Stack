function customRender (reactElement, mainContainer) {
    const domElement = document.createElement(reactElement.type);

    domElement.innerHTML = reactElement.txt;

    /*
    domElement.setAttribute("href", reactElement.props.href);
    domElement.setAttribute("target", reactElement.props.target);
    */

    for (const prop in reactElement.props) {
        if (prop === 'children') {
            continue;
        }

        domElement.setAttribute(prop, reactElement.props[prop]);
    }

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

const mainContainer = document.getElementById("root");

customRender (reactElement, mainContainer);

// here, we are rendering an object, while in react, only functions are rendered 