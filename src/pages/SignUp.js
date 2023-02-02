import { useEffect, useState } from "react"
import Helmet from "react-helmet"
import axiosInstance from "../axios"
import { toast } from "bulma-toast"
import { useNavigate } from "react-router-dom"
const SignUp = () => {
    const navigate = useNavigate()
    const [username,setUsername] = useState('')
    const [first_name,setFirstName] = useState('')
    const [email,setEmail] = useState('')
    const [last_name,setLastName] = useState('')
    const [password1,setPassword1] = useState('')
    const [password2,setPassword2] = useState('')
    const [images, setImages] = useState([]);
    const [imageURLS, setImageURLs] = useState([]);



    function handleChange(e){
        const {name,value} = e.target
        if (name === 'username'){
            setUsername(value)
        }
        if (name === 'first_name'){
            setFirstName(value)
        }
        if (name === 'last_name'){
            setLastName(value)
        }
        if (name === 'email'){
            setEmail(value)
        }
        if (name === 'password1'){
            setPassword1(value)
        }
        if (name === 'password2'){
            setPassword2(value)
        }

        if (name === 'images'){
            console.log(e.target.files)
            setImages([...images,...e.target.files]);
        }
    }



    const showImages = imageURLS.map((imageSrc,index) => (
                <div key={index} className="mySlides fade" style={index<1?{display:"block"}:{}}>
            <div className="numbertext">{index}/{imageURLS.length}</div>
            <img src={imageSrc} style={{width:"500px",}} />
        </div>
      ))


    const deleteImageButtons = images.map((img,index)=>(
        <span className="tag is-success">
    {img.name}
    <button className="delete is-small" onClick={(e)=>{deleteImage(e,index)}}></button>
  </span>
    ))


    function deleteImage(e,index){
        e.preventDefault()
        const updatedImages = images.filter((img,i)=>i!==index)
        setImages([...updatedImages])
    }

    useEffect(()=>{
        console.log(images)
        if (images.length <1) return
        const newImageUrls = []
        images.forEach(image=>newImageUrls.push(URL.createObjectURL(image)))
        setImageURLs(newImageUrls)
        console.log(newImageUrls)
    },[images])

    let slideIndex = 1;
    function plusSlides(n) {
        showSlides(slideIndex += n);
      }
    
    
      function showSlides(n) {
        if (images.length){
            let i;
        let slides = document.getElementsByClassName("mySlides");
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
        }

        slides[slideIndex-1].style.display = "block";
    }
      } 
    
    async function handleSubmit(e){
        e.preventDefault()
        if (password1===password2){
        const data = {
                username,
                email,
                first_name,
                last_name,
                password:password1,
            }
        let form_data = new FormData()
        images.forEach(image=>form_data.append('images[]',image,image.name))
        for (const key in data){
            form_data.append(key,data[key])
        }
        console.log(form_data)
        axiosInstance.post('/users/',form_data,{headers: {
                "Content-Type": `multipart/form-data`,
              }})
                         .then(response=>{
                            toast({
                                message:'Sign up successful',
                                dismissible:true,
                                pauseOnHover:true,
                                duration:1500,
                                type:'is-success',
                                position:'bottom-right'
                            })
                            navigate('/')
                         }).catch(error=>{
                            console.log(error)
                            toast({
                                message:'An error has occured',
                                type:'is-danger',
                                dismissible:true,
                                pauseOnHover:true,
                                duration:1500,
                                position:'bottom-right'
                            })
                        })
        }else{
            toast({
                message:'Please enter matching passwords',
                type:'is-danger',
                dismissible:true,
                pauseOnHover:true,
                duration:1500,
                position:'bottom-right'
            })
        }
    }


  return (
    <>

    <Helmet>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma-carousel@4.0.3/dist/css/bulma-carousel.min.css" />
    </Helmet>
        <div className="column is-fullwidth mt-6 columns is-justify-content-center" id="addForm">
        {images.length?<div className={"slideshow-container column is-4"}>

        {showImages}

        {images.length<=1?null:<><a className="prev" onClick={()=>{plusSlides(-1)}}>&#10094;</a>
        <a className="next" onClick={()=>{plusSlides(1)}}>&#10095;</a></>}
        </div>:<div className="column is-4"></div>}
            <form onSubmit={handleSubmit} className="column is-4">
                <h2 className="title">Sign Up</h2>
                <div className="field">
                    <label htmlFor="username">Username</label>
                    <div className="control">
                        <input required type="text" className="input" name="username" value={username} onChange={(e)=>{handleChange(e)}}/>
                    </div>
                </div>
                <div className="field">
                    <label htmlFor="email">Email</label>
                    <div className="control">
                        <input required type="email" className="input" name="email" value={email} onChange={(e)=>{handleChange(e)}}/>
                    </div>
                </div>
                <div className="field">
                    <label htmlFor="first_name">First Name</label>
                    <div className="control">
                        <input required type="text" className="input" name="first_name" value={first_name} onChange={(e)=>{handleChange(e)}}/>
                    </div>
                </div>
                <div className="field">
                    <label htmlFor="last_name">Last Name</label>
                    <div className="control">
                        <input required type="text" className="input" name="last_name" value={last_name} onChange={(e)=>{handleChange(e)}}/>
                    </div>
                </div>
                <div className="field">
                    <label htmlFor="password1">Password</label>
                    <div className="control">
                        <input required type="password" className="input" name="password1" value={password1} onChange={(e)=>{handleChange(e)}}/>
                    </div>
                </div>
                <div className="field">
                    <label htmlFor="password2">Confirm Password</label>
                    <div className="control">
                        <input required type="password" className="input" name="password2" value={password2} onChange={(e)=>{handleChange(e)}}/>
                    </div>
                </div>
                <div className="field">
                    <label htmlFor="images">Images</label>
                    <div className="control">
                        <input required type="file" multiple className="input" name="images" onChange={(e)=>{handleChange(e)}}/>
                    </div>
                    <div className="buttons is-flex mt-2" style={{columnGap:"1rem",rowGap:"0.5rem"}}>
                        {deleteImageButtons}
                    </div>
                </div>
                <hr />
                <button className="button is-dark" type="submit">Sign Up</button>

            </form>
            
        </div>


</>
  )
}


export default SignUp