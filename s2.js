movie_list = [];

async function apiCall()
{
    var movie_name = document.getElementById("myInput").value;
    //console.log(movie_list);
    
    if (!movie_name)
    {
        //alert("enter the movie title");
    }
    else
    {
        
        const response = await fetch("http://itunes.apple.com/search?term=" + movie_name + "&entity=movie");       
        const data = await response.json();
        
        //console.log(data);
        movie_list = data;
     
        displayMovie();
    }
   
}

// error handling 
apiCall()      
.catch(error => {
        console.log("error occured while loading the movies file");
       
        console.error(error);
        });

// add button
function onClickAdd(event)
{
    console.log(event);
}

function displayMovie()
{
    
    
    let len = movie_list.results.length;
   // alert(len); takes time to load the file based on search key
    for (let i = 0; i < len; i++)// only 10 movies
    {
        console.log(movie_list.results[i]);
        let divTag = document.createElement("div");
        divTag.classList.add("wrapper");//class name for div elemeent
        let ul_list = document.createElement('ul');


        let img = document.createElement("img");// album cover
       
        img.setAttribute('src', movie_list.results[i].artworkUrl60);
        img.setAttribute('alt', 'Movie album');
        img.setAttribute('height', '50px');
        img.setAttribute('width', '50px');
        document.body.appendChild(img);
        
        

        let liTag2 = document.createElement("li");// movie title
        let mve_title = movie_list.results[i].trackName;
        liTag2.innerHTML = mve_title;

        let liTag3 = document.createElement("li");
        let artistName = movie_list.results[i].artistName;//artist name
        liTag3.innerHTML = artistName;

        let btn = document.createElement("button");// button
        btn.setAttribute('id', 'add_btn');
        btn.innerHTML = "ADD";
        btn.setAttribute("onclick", "onClickAdd(event)");
        document.body.appendChild(btn);


        // Create anchor element.
        var a = document.createElement('a');

        // Create the text node for anchor element.
        var link = document.createTextNode("Read more");

        // Append the text node to anchor element.
        a.appendChild(link);

        // Set the title.
        a.title = "This is Link";

        // Set the href property.
        a.href = "movie_list.results[i].longDescription;";

        // Append the anchor element to the body.
        document.body.appendChild(a);
        console.log("image", img);
        ul_list.appendChild(img);
        ul_list.appendChild(liTag2);
        ul_list.appendChild(liTag3);
        ul_list.appendChild(btn);
        ul_list.appendChild(a);
        console.log("ul tag", ul_list);
        divTag.appendChild(ul_list);
        console.log("div", divTag);
        document.body.appendChild(divTag);
        console.log("body");


    }

}


