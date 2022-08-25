function rep() {
    codeblks = document.getElementsByTagName("code"); // get code blocks
    let i = 0;
    console.log(codeblks)
    while (i<codeblks.length) {
        if (codeblks[i].className == "language-js") { // js highlight 対象
            let h = jshighlight(codeblks[i].innerText);
            codeblks[i].parentElement.replaceWith(h);
        }
        else {
            i++;
        }
    }
}