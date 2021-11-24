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
        
        const response = await fetch("http://itunes.apple.com/search?term=" + movie_list + "&entity=movie");       
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
   

function displayMovie()
{
    console.log(movie_list);
    let len = movie_list.results.length;
    //alert(len); takes time to load the file based on search key
    for (let i = 0; i < len; i++)// only 10 movies
    {
        var divTag = document.createElement("div");
        divTag.classList.add("wrapper");//class name for div elemeent
        var ul_list = document.createElement('ul');
        
            var liTag = document.createElement("li");
            var txtNode = movie_list.results[i].artistName;//artist name
            liTag.innerHTML = txtNode;
            console.log("artistname", liTag);
            ul_list.appendChild(liTag);
            console.log("ul tag", ul_list);
            divTag.appendChild(ul_list);
            console.log("div", divTag);
            document.body.appendChild(divTag);
            console.log("body");
        
        
        
        
        
        
        
        
        
    }
}