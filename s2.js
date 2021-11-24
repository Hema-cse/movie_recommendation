movie_list = [];

async function apiCall()
{
    
        

    var movie_list = document.getElementById("myInput").value;
    console.log(movie_list);
    
    if (movie_list==false)
    {
        alert("enter the movie title");
    }
    else {
        const response = await fetch("http://itunes.apple.com/search?term=" + movie_list + "&entity=movie");
        
        const data = await response.json();
        
        console.log(data);
        movie_list = data;
    }
    displayMovie();
}

apiCall()      
.catch(error => {
          	console.log("error occured while loading the movies file!");
          	console.error(error);
        });
   
// error handling .apiCall()
/*function displayMovie()
{
    
    for (let i = 0; i < movie_list.length && i < 10; i++)
    {
       
        var divTag = document.createElement("div");
        divTag.classList.add("wrapper");//class name for div elemeent
        var list = document.getElementsByClassName('wrapper'); appendChild(txtNode);
        var liTag = document.createElement("li");
        var txtNode = movie_list.results[i].artistName;
        
        
        li.appendChild(txtNode);
        list.appendChild(liTag);
        divTag.appendChild(list);
        document.body.appendChild(divTag);
    }
}*/