


// start posts 

// console.log()
// infinte scrooll
let crentpage= 1
let lastpage = 1;
window.addEventListener("scroll",()=>{
  const endOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
  console.log(endOfPage)
  if(endOfPage && crentpage < lastpage){
    crentpage =  crentpage + 1
    getposts(false,crentpage)
  }
})
function getposts(reload=true,id=1){

fetch(`https://tarmeezacademy.com/api/v1/posts?limit=2&page=${id}`).then(response=>response.json())
.then(response =>{
  lastpage = response.meta.last_page



  if(reload){
   document.querySelector(".card").innerHTML =""
  }


let posts = response.data;
for(post of posts){
    document.querySelector(".card").innerHTML +=""
    let auth= post.title;
    console.log()
    let conternt = `
    <div class="card ">
    <div class="card-header">
     <img src=${post.image}  alt="" class="img-fluid border border-3" style="width: 6%; border-radius: 50%;">
     <span> ${post.author.name}</span>
    <img src=${post.image} class="img-fluid" alt="">
    <div class="card-body">
      <h5 class="card-title text-black-50">${post.created_at}</h5>
      <h5>${post.title}</h5>
      <p class="card-text">${post.body} </p>
      <hr>
      <a href="#" class="btn "><i class="fa-solid fa-pencil" style="padding:0 !important"></i> (${post.comments_count}) comments</a>
    </div>
    </div>

        `;
        
        
        document.querySelector(".card").innerHTML +=conternt
}

})

}


getposts(crentpage)






// end posts



// start login


let register = document.getElementById("register")
  let alertw = document.getElementById("alert")
     let out = document.getElementById("log-out")
      let  logininput = document.getElementById("login-input")

   function loginclick(){    
     let login = document.getElementById("User").value
     let pass = document.getElementById("password").value;
     let dataall = document.querySelector(".data-response");

     let body={
                    "username":login,
                    "password" : pass
                    }
                axios.post("https://tarmeezacademy.com/api/v1/login",body)
                .then(users=>{
                    
                   let namenuser =  users.data.user.name;
                   console.log(namenuser)
                  dataall.innerHTML +="";
                  
                  let conternt = `
                  <img src=${users.data.user.profile_image} style="border-radius: 50%; width: 60px; height: 60px;" alt="">
                  <p id="name" class="ms-5 me-5" >${namenuser}</p>
                  
                  
                  `;
                  dataall.innerHTML +=conternt
            

                   
                     localStorage.setItem("token",users.data.token)
                     localStorage.setItem("user",JSON.stringify(users.data.user))
                     
                     let myModal = document.getElementById("exampleModal") // اخفاء العنصر
                     bootstrap.Modal.getInstance(myModal).hide();
                     showsuccessfuly("loge in successfuly","success")
                     start_ui()
                
                  

                }).catch(error=>{
                  
                  let myModal = document.getElementById("exampleModal") 
                  bootstrap.Modal.getInstance(myModal).hide();
                  showsuccessfuly("Errore User or Pass","danger")
                })


    }

// end  login

function start_ui(){
    let token = localStorage.getItem("token")
    let register = document.getElementById("register")
      let out = document.getElementById("log-out")
      out.style.cssText="color:black; border-color:red";
         let  logininput = document.getElementById("login-input")
    let alert = document.querySelector(".success-alert")
    let addpost = document.querySelector(".main_add")




     
  if(token == null){
  
    out.style.display="none"
    logininput.style.display="block"
    register.style.display="block"
    alert.style.display="block"
    addpost.style.display="none"

  }
  else{ 
    
     getposts(crentpage)
    register.style.display="none"
    logininput.style.display="none"
    out.style.display="block"
    addpost.style.display="block"
    
    
  }
}

    // مهم لازم نعمل استدعاء في العام 
    start_ui()  
  
    function logout(){

  out.onclick =()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    showsuccessfuly("loge out successfuly","success")
    start_ui()
  
  }
}
logout()  

 //  show alert 
 function showsuccessfuly(customargment,choos){
 const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
const wrapper = document.createElement('div')
wrapper.innerHTML = [
  `<div class="alert alert-${type} alert-dismissible" role="alert">`,
  `   <div>${message}</div>`,
  '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
  '</div>'
].join('')

alertPlaceholder.append(wrapper)
}
appendAlert(customargment,choos)
//    todos:       setTimeout(()=>{

//             const alerttohide = bootstrap.Alert.getOrCreateInstance('#liveAlertPlaceholder')
//             alerttohide.close()
//  },2000)

}

// end alert 





function registerlogin(){

    let User_register= document.getElementById("User-register").value;
    let name_register= document.getElementById("name-register").value;
    let password_register= document.getElementById("password-register").value;
    let image_register = document.getElementById("file-register").files[0];
    let token = localStorage.getItem("token");

    let formdata  = new FormData();
    formdata.append("username",User_register)
    formdata.append("password",password_register)
    formdata.append("image",image_register)
    formdata.append("name",name_register)




    axios.post("https://tarmeezacademy.com/api/v1/register",formdata,{
      headers:{
         "Content-Type": "multipart/form-data" 
      }})
    .then(users=>{
                  localStorage.setItem("token",users.data.token)
                  localStorage.setItem("user",JSON.stringify(users.data.user))
                  
                  let myModal = document.getElementById("exampleModal-register") // اخفاء العنصر
                  bootstrap.Modal.getInstance(myModal).hide();
                  showsuccessfuly(" new user in successfuly","success")
                  start_ui()
              
})
.catch((Errore)=>{
  
    showsuccessfuly(Errore.response.data.message,"danger")

    let myModal = document.getElementById("exampleModal-register") // اخفاء العنصر
    bootstrap.Modal.getInstance(myModal).hide();
})
}



// add post 


function creatposts(){
   
    let title = document.getElementById("titlepost").value;
    let allbody = document.getElementById("post-body").value;
    let img = document.getElementById("img-posts").files[0];
    let token = localStorage.getItem("token");

    let formdata  = new FormData();
    formdata.append("image",img)
    formdata.append("title",title)
    formdata.append("body",allbody)

// مهمين
    let header = {                                                     
        "authorization":`Bearer ${token}`
    }

    
    axios.post("https://tarmeezacademy.com/api/v1/posts",formdata,{
        headers:{
          "authorization":`Bearer ${token}`,
           "Content-Type": "multipart/form-data" 
        }
    })
    .then(response =>{
        console.log(response)
        getposts(crentpage)
        let myModal = document.getElementById("exampleModal-posts") // اخفاء العنصر
        bootstrap.Modal.getInstance(myModal).hide();
        showsuccessfuly(" complete post successfuly","success")
        start_ui()

    })

    .catch((Errore)=>{
  
      showsuccessfuly(Errore.response.data.message,"danger")
  
      let myModal = document.getElementById("exampleModal-posts") // اخفاء العنصر
        bootstrap.Modal.getInstance(myModal).hide();
        showsuccessfuly(" complete post successfuly","success")
        
  })
}



