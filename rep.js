function rep(info) {
    let writing = document.createElement("p"); // get code blocks
    writing.className = "writing";
    let page = document.getElementById("page");
    switch (info.split(",")[2]) {
        case "1":
            writing.innerHTML = "書きかけの記事です";
            page.insertBefore(writing,page.firstChild);
            break;
        case "2":
            writing.innerHTML = "追記予定があります";
            page.insertBefore(writing,page.firstChild);
            break;
        default:
            break;
    }
    let codeblks = document.getElementsByTagName("code"); // get code blocks
    let i = 0;
    while (i<codeblks.length) {
        let coded = codeblks[i].innerText
        if (codeblks[i].parentElement.nodeName == "PRE") {
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
                case "svggraph":
                    console.log("aaafewagawe")
                    const svgg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    svgg.setAttribute("script", coded);
                    svgg.className = "svggraph"
                    codeblks[i].parentElement.replaceWith(svgg);
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
        else {
            let inline = codeblks[i];
            inline.className = "inline"
            codeblks[i].replaceWith(inline);
            i++;
        }
    }
}