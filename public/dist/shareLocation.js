function getLocation(){
    const roomName = document.querySelector("#roomName h3").getAttribute("roomName")
    const endpoint = document.querySelector("#roomName h3").getAttribute("endpoint")
    const userID = document.getElementById("userID").value;
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const {latitude: lat, longitude: long} = position.coords;
            const latlong = new google.maps.LatLng(lat, long)
            const myOptions = {
                center: latlong,
                zoom: 14,
                mapTypeId:  google.maps.MapTypeId.ROADMAP,
                mapTypeControl: false,
                navigationControlOptions: {
                    style:  google.maps.NavigationControlStyle.SMALL
                },
            }
            namespaceSocket.emit("newLocation", {
                location: myOptions,
                roomName,
                endpoint,
                sender: userID
            })
            namespaceSocket.off("confirmLocation")
            namespaceSocket.on("confirmLocation", data => {
                const li = stringToHTML(`
                    <li class="${(userID == data.sender)? 'sent' : 'replies'}">
                        <img src="https://media-exp1.licdn.com/dms/image/C5603AQE3g9gHNfxGrQ/profile-displayphoto-shrink_200_200/0/1645507738281?e=1659571200&v=beta&t=wtwELdT1gp6ICp3UigC2EgutGAQgDP2sZKUx0mjCTwI"
                            alt="" />
                    </li>   
                `)
                const p = stringToHTML(`<p id="location-me" style="width: 200px; height:150px;"></p>`)
                const map = new google.maps.Map(p, data.location)
                li.appendChild(p)
                document.querySelector(".messages ul").appendChild(li)
                new google.maps.Marker({
                    position: data.location.center,
                    map,
                    title: "You are here"
                })
                const messagesElement = document.querySelector("div.messages");
                messagesElement.scrollTo(0, messagesElement.scrollHeight);
            })
        }, 
        (error) => {
            const li = stringToHTML(`
                <li class="sent">
                    <img src="https://media-exp1.licdn.com/dms/image/C5603AQE3g9gHNfxGrQ/profile-displayphoto-shrink_200_200/0/1645507738281?e=1659571200&v=beta&t=wtwELdT1gp6ICp3UigC2EgutGAQgDP2sZKUx0mjCTwI"
                        alt="" />
                </li>   
            `)
            const p = stringToHTML(`<p id="location-me" style="width: 200px; height:150px;">${error.message}</p>`)
            li.appendChild(p)
            document.querySelector(".messages ul").appendChild(li)
        })
}