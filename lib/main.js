var data = ''
        
function show(){
    for(i=0;i<10;i++){
        const div3 = document.getElementById("div3");
        // 要素の追加
        const a1 = document.createElement("input");
        a1.type = "checkbox";
        // a1.lavel = "ee";
        a1.innerText = list[i];
        a1.setAttribute('id', list[i]);
        div3.appendChild(a1);
        
        const a2 = document.createElement("lavel");
        a2.innerHTML = list[i] + '&nbsp;---&nbsp;' + japlist[i];
        a1.setAttribute('id', list[i]);
        div3.appendChild(a2);
        
        const a3 = document.createElement("br");
        div3.appendChild(a3);
    }
    document.getElementById('download').style.display = 'block'
}

function seiseis(){
    let filename = document.getElementById("filename").value+".js"
    var downloads = ''
    for(i=0;i<10;i++){
        if(document.getElementById(list[i]).checked == true){
            downloads = downloads + prog[i] + '\n\n';
        }
    }

    var content = downloads

    var blob = new Blob([ content ], { "type" : "text/plain" });

    if (window.navigator.msSaveBlob) { 
        window.navigator.msSaveBlob(blob, filename); // msSaveOrOpenBlobの場合はファイルを保存せずに開ける
        window.navigator.msSaveOrOpenBlob(blob, filename); 
    } else {
        document.getElementById("download").href = window.URL.createObjectURL(blob);
        document.getElementById("download").download = filename
    }
    console.log(downloads)
}