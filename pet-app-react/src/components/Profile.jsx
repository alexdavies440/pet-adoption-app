import { useState, useEffect } from "react";

export default function Profile({ credentials }) {

    const [username, setUsername] = useState("");

    useEffect(() => {
        getPrincipal()
    }, [])

    function getPrincipal() {
        fetch("http://localhost:8080/principal", {
            credentials: credentials
        })
            .then(res => res.text())
            .then(data => setUsername(data))
    }
    return (
        <div className="profile">
            
            <div>
            <h1 className="profile-header">{username.toUpperCase()}</h1>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec dolor in neque tristique accumsan. Quisque vulputate ex accumsan, dignissim libero eget, pretium lectus. Integer molestie facilisis pulvinar. Ut id placerat quam. Suspendisse egestas laoreet eros, at pretium ipsum rutrum eu. Donec euismod a augue a bibendum. Curabitur molestie, dolor vitae sagittis eleifend, ligula eros posuere augue, nec sodales neque neque ac dolor. Mauris egestas neque leo, a molestie lacus eleifend ac. Quisque auctor, justo in ultrices hendrerit, turpis nibh feugiat orci, pulvinar tempor lacus mauris in tortor. Nulla sed interdum dui, sit amet fringilla nulla. Vestibulum tempor metus a ante fermentum cursus. Integer diam urna, imperdiet at pretium a, varius id nisl.
                </p>
                <p>
                Praesent aliquam quam dolor, ac vestibulum felis consectetur in. Ut eleifend erat ipsum, in condimentum turpis cursus id. Vivamus aliquam vitae orci sed iaculis. Vivamus ipsum quam, gravida eget euismod vitae, viverra non lorem. Sed pellentesque, justo vel rutrum gravida, libero nunc consequat nisi, non suscipit metus mauris sit amet tortor. Donec maximus augue ut sollicitudin posuere. Curabitur at laoreet ligula. Morbi at elit massa. Phasellus lobortis magna nec imperdiet consectetur. Sed pharetra est et urna hendrerit, sit amet commodo justo suscipit. Mauris in libero at mauris rutrum dictum et ut libero.
                </p>
                <p>
                Suspendisse lobortis nec quam ut sodales. Phasellus non nisi id dolor ornare imperdiet ut vitae leo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin nec bibendum metus. Nam sodales ullamcorper velit, vitae rhoncus tellus interdum non. Suspendisse arcu ante, aliquet sed rutrum at, faucibus ut massa. Sed sed hendrerit mi, eu dapibus elit. Aenean eu egestas enim. Donec vulputate urna dui, quis pretium neque suscipit at. Etiam elit magna, porta eget finibus at, mollis eu ligula. In ut orci id augue ultrices ornare eu eget massa. Donec rutrum vitae lacus sed laoreet. Morbi interdum cursus malesuada. Suspendisse potenti. Aliquam varius mattis metus at pharetra. Mauris ut lacinia leo.
                </p>
            </div>
            
        </div>   
    );
}