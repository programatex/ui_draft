
        var data = ''
        
        let list = [1,2,3,4,5,6,7,10,11,12,13,14]
        
        
        function read(file){
        }
        
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
            a2.innerHTML = list[i];
            a1.setAttribute('id', list[i]);
            div3.appendChild(a2);
            
            const a3 = document.createElement("br");
            div3.appendChild(a3);
        }
        function seiseis(){
        var downloads = ''
            for(i=0;i<10;i++){
                if(document.getElementById(list[i]).checked == true){
                    downloads = downloads + prog[i] + '\n\n';
                }
            }
        
            var content = downloads
        
            var blob = new Blob([ content ], { "type" : "text/plain" });
        
            if (window.navigator.msSaveBlob) { 
                window.navigator.msSaveBlob(blob, "test.txt"); // msSaveOrOpenBlobの場合はファイルを保存せずに開ける
                window.navigator.msSaveOrOpenBlob(blob, "test.txt"); 
            } else {
                document.getElementById("download").href = window.URL.createObjectURL(blob);
            }
            console.log(downloads)
        }