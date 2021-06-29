// used for posts, profile images, banners
// returns the address of the image in Cloudinary to be stored in DB
export const uploadImage = (dataURL) => {
    const data = new FormData();
    data.append("file", dataURL);
    data.append("upload_preset", "twitter-clone-react");
    data.append("cloud_name", "kyle-twitter-clone");

    return fetch("https://api.cloudinary.com/v1_1/kyle-twitter-clone/image/upload", {
        method: "post",
        body: data
    })
        .then(res => res.json())
        .then(data => { return data.url })
        .catch(error => console.log(error))
}