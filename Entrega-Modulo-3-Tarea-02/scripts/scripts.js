const getvideos = async () => {
    try {
        const result = await fetch("./data/data.json").then((resp) => resp.json());
        return result;
    } catch (error){
        return console.error(error);
    }
}



const getVideosOld = async () => {
  try {
    const result = await fetch().then(
      (resp) => resp.json()
    );
    return result;
  } catch (error) {
    return console.error(error);
  }
};

//videos
const mostrarvideos = async (categorie) => {
  const contvideos = document.getElementById("todosvideos")
  const data = await getvideos();
    contvideos.innerHTML = "" ;
    const newdata = data.filter((video) => video.categorie === categorie) ;
    (!categorie ? data : newdata).forEach((video) => {
        const { id, nombre, autor, vistas, fecha, poster } = video;
        contvideos.innerHTML += `
        <div class="contvideos" onclick="irVideo(${id})">
                <img class="imgPortada" src="${poster}" alt="...">
                <p class="textMinutos">99:30</p>
                <div class="contInfo">
                    <img class="avatar" src="./imagenes/avatar.png" alt="...">
                    <div class="contDescripcion">
                        <h2 class="titleVideo">${nombre}</h2>
                        <h4 class="titleAutor">${autor}</h4>
                        <h4 class="vistas">${vistas} vistas - ${fecha}</h4>
                    </div>
                </div>
            </div>
        `;
        
    });
}

const cambiarCategoria = (element, categoria = undefined) => {
  const btn = document.querySelector(".active");
  btn?.classList.remove("active"); // si el ? no existe , no lo ejecutara
  element.classList.add("active");

  mostrarvideos(categoria);
} 


// Ver Videos
const irVideo = async(id) => {
  const data = await getvideos();  
  const result = data.find((video) => video.id === id);
  
    localStorage.setItem("video", JSON.stringify(result));
  
    window.location.replace( "./pages/verVideo.html");
  };

  const verVideo = () => {
    const video = JSON.parse(localStorage.getItem("video"))
    const {url,name} = video
    const element = document.querySelector(".video")
    element.innerHTML = `
    <iframe width="560" height="315" src="${url}" title="${name}"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>
    `
}