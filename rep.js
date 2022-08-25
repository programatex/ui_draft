function rep() {
    codeblks = document.getElementsByTagName("code"); // get code blocks
    let i = 0;
    console.log(codeblks)
    while (i<codeblks.length) {
        let coded = codeblks[i].innerText
        let lang = codeblks[i].className.slice(9)
        switch (lang) {
            case "js":
                let jsh = jshighlight(coded);
                codeblks[i].parentElement.replaceWith(jsh);
                break;
            case "math":
                let mth = document.createElement("math");
                mth.className = "mathml";
                mth.innerHTML = coded;
                codeblks[i].parentElement.replaceWith(mth);
                break;
            case "txt":
                let txth = txthighlight(coded);
                codeblks[i].parentElement.replaceWith(txth);
                break;
            default:
                let ch = txthighlight(coded,lang);
                codeblks[i].parentElement.replaceWith(ch);
                break;
        }
    }
}