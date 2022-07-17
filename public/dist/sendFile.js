function sendFile(files){
    namespaceSocket.emit("upload", {file : files[0], filename: files[0].name}, (status) => {
        console.log(status);
    });
}