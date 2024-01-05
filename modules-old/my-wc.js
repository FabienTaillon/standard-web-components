class MyElement extends HTMLElement {

    constructor() {
        super();
        
        //let template = document.getElementById("my-paragraph");
        //let templateContent = template.content;
  
        const myDiv = document.createElement("div");
        const myContent = document.createTextNode("This is my web component 🎉");
        myDiv.appendChild(myContent);

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(myDiv);
    }
}

customElements.define("my-element", MyElement);