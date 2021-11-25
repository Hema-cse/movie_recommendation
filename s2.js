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

var count = 1;
// add button
function onClickAdd(event)
{
    
    let btns = document.getElementById("btn_id");
    
   if(count<5)
   {
        alert("dssada");
        let pTag = document.createElement('p');
        pTag.className = "p_class";
        let txt1 = document.createElement('p');
        let divT = document.getElementsByClassName("wrapper");
        //console.log("wrapper childered", event.target.parentElement.parentElement);
        txt1.innerHTML = event.target.parentElement.parentElement.children[1].innerHTML;
        pTag.appendChild(txt1);
        console.log("element added", pTag);

        let txt2 = document.createElement('p');
        txt2.innerHTML = '[' + event.target.parentElement.parentElement.children[2].innerHTML + ']';
        pTag.appendChild(txt2);
        document.body.appendChild(pTag);
        count += 1;
    }
    /*else
    {
         alert("titles cannot be inserted in watch list");
    }*/
   
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
        ul_list.setAttribute('class', 'ul_class'); //ul_class
        
        let p1 = document.createElement('li');
        p1.setAttribute('class', 'li_class'); // li_class
        let img = document.createElement("img");// album cover      
        img.setAttribute('src', movie_list.results[i].artworkUrl60);
        img.setAttribute('alt', 'Movie album');
        img.setAttribute('height', '50px');
        img.setAttribute('width', '50px');        
        p1.appendChild(img);
        ul_list.appendChild(p1);
              

        let p2 = document.createElement("li");// movie title
        let mve_title = movie_list.results[i].trackName;
        p2.innerHTML = mve_title;
        ul_list.appendChild(p2);

        let p3 = document.createElement("li");
        let artistName = movie_list.results[i].artistName;//artist name
        p3.innerHTML = artistName;
        ul_list.appendChild(p3);

        let p4 = document.createElement("li");
        let btn = document.createElement("button");// button
        btn.setAttribute('id', 'btn_id');
        btn.setAttribute('class', 'btn_class'); // btn_class
        btn.innerHTML = "ADD";
        btn.setAttribute("onclick", "onClickAdd(event)");// onclick event
        p4.appendChild(btn);
        ul_list.appendChild(p4);

        let p5 = document.createElement("li");
        var a = document.createElement('a');// Create anchor element   
        var link = document.createTextNode("Read more");// Create the text node for anchor element.       
        a.appendChild(link);// Append the text node to anchor element
        a.href = "movie_list.results[i].longDescription;";// Set the href property.
        p5.appendChild(a);
        ul_list.appendChild(p5);
    
      
        divTag.appendChild(ul_list);
        console.log(divTag);
        
        let x=document.body.appendChild(divTag);
        console.log("final",x);

       

    }

}


