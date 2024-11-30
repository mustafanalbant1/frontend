const textInput = document.getElementById("textInput")
const fontStyle = document.getElementById("fontStyle")
const output = document.getElementById("output")

function updateStyle(){
    const text = textInput.value
    const style = fontStyle.value

    switch (style) {
        case "normal":
            output.style.fontStyle ="normal";
            output.style.fontWeight ="normal";
            output.textContent =text;
            break;
        case "italic":
            output.style.fontStyle ="italic";
            output.style.fontWeight ="normal";
            output.textContent =text;
            break;
        case "bold":
            output.style.fontStyle ="normal";
            output.style.fontWeight ="bold";
            output.textContent =text;
            break;
        case "uppercase":
            output.style.fontStyle ="normal";
            output.style.fontWeight ="normal";
            output.textContent =text.toUpperCase();
            break;
    
        default:
            output.textContent=text
            break;
    }
}


textInput.addEventListener("input",updateStyle)
fontStyle.addEventListener("change",updateStyle)