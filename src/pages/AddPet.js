import { useEffect, useState } from "react"
import Helmet from "react-helmet"
import axiosInstance from "../axios"
import { toast } from "bulma-toast"

const AddPet = () => {
    const [name,setName] = useState('')
    const [birthDate,setBirthDate] = useState('')
    const [breed,setBreed] = useState('')
    const [images, setImages] = useState([]);
    const [imageURLS, setImageURLs] = useState([]);
    const [kinds,setKinds] = useState([])
    const [kind,setKind] = useState('')
    const [breedOptions,setBreedOptions] = useState([])
    const [newKind,setNewKind] = useState('')
    const [newBreed,setNewBreed] = useState('')

    useEffect(() => {
        axiosInstance.get('/kinds/')
                     .then(response=>setKinds(response.data))
                     .catch(error=>console.log(error))
      }, []);

    function handleChange(e){
        const {name,value} = e.target
        if (name === 'name'){
            setName(value)
        }
        if (name === 'birthDate'){
            setBirthDate(value)
        }
        if (name === 'kind'){
            if (value !=='1' && value !== ''){
            const kindObj = kinds.filter(k=>k.id===value)
            console.log(kindObj)
            setKind(kindObj[0])
            setBreedOptions(kindObj[0].breeds)
        }else if (value === ''){
            setKind('')
        }
        else{
            setKind('addNewKind')
        }
        }
        if (name === 'breed'){
            if (value !=='1' && value !== ''){

                setBreed(value)
            }else if (value === ''){
                setBreed('')
            }
            else{
                setBreed('addNewBreed')
            }
        }
        if (name === 'images'){
            console.log(e.target.files)
            setImages([...images,...e.target.files]);
        }
    }

    useEffect(()=>{
        if (kind==='addNewKind'){
            setBreed('addNewBreed')
        }else{
            setBreed('')
        }
    },[kind])

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
        const data = {
                name,
                birth_date:birthDate,
                kind_new: (kind === 'addNewKind')?true:false,
                breed_new: (breed === 'addNewBreed')?true:false,
                breed:(breed === 'addNewBreed')?newBreed:breed,
                kind: (kind === 'addNewKind')?newKind:kind.id,
            }
        let form_data = new FormData()
        images.forEach(image => {
            form_data.append(image.name,image);
        });
        form_data.append('data',JSON.stringify(data))
        console.log(form_data)
        axiosInstance.post('/add-pet/',form_data,{headers: {
                "Content-Type": `multipart/form-data`,
                "Access-Control-Allow-Origin":"https://pet-list-react.vercel.app"
              }})
                         .then(response=>{
                            toast({
                                message:'Pet Added To List.',
                                dismissible:true,
                                pauseOnHover:true,
                                duration:1500,
                                type:'is-success',
                                position:'bottom-right'
                            })
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
        }


  return (
    <>

    <Helmet>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma-carousel@4.0.3/dist/css/bulma-carousel.min.css" />
    </Helmet>
        <div className="column is-fullwidth mt-6 columns is-justify-content-center" id="addForm">
            <form onSubmit={handleSubmit} className="column is-4">
                <h2 className="title">Add Pet</h2>
                <div className="field">
                    <label htmlFor="name">Name</label>
                    <div className="control">
                        <input required type="text" className="input" name="name" value={name} onChange={(e)=>{handleChange(e)}}/>
                    </div>
                </div>
                <div className="field is-flex is-flex-direction-column">
                    <label htmlFor="kind">kind</label>
                    <div className="select is-fullwidth">
                        <select required name="kind" id="kind" value={kind.id} onChange={e=>{handleChange(e)}}>
                            <option value=''>Select Kind</option>
                            {kinds.map(k=><option key={k.id} value={k.id}>{k.name}</option>)}
                            <option value={1}>Add a new Kind</option>
                        </select>
                    </div>
                    {kind==='addNewKind'?<input required type="text" name="newKind" className="input mt-2" placeholder="Add New Kind" value={newKind} onChange={e=>{setNewKind(e.target.value)}} />:null}

                </div>
                <div className="fieldis-flex is-flex-direction-column">
                    <label htmlFor="breed">Breed</label>
                    {kind!=='addNewKind'?<><div className="select is-fullwidth">
                        <select required name="breed" id="breed" value={breed} onChange={e=>{handleChange(e)}}>
                            <option value=''>Select Breed</option>
                            {breedOptions.length?breedOptions.map((b)=><option key={b.id} value={b.id}>{b.name}</option>):null}
                            <option value={1}>Add a new Breed</option>
                        </select>
                    </div>{breed!=='addNewBreed'?null:<div className="control">
                        <input required type="text" name="newBreed" className="input mt-2" placeholder="Add New Breed" value={newBreed} onChange={e=>{setNewBreed(e.target.value)}} />
                    </div>}</>:
                    <div className="control">
                        <input required type="text" name="newBreed" className="input mt-2" placeholder="Add New Breed" value={newBreed} onChange={e=>{setNewBreed(e.target.value)}} />
                    </div>}
                </div>
                <div className="field">
                    <label htmlFor="birthDate">Date Of Birth</label>
                    <div className="control">
                        <input required type="date" className="input" id="birthDate" name="birthDate" value={birthDate} onChange={(e)=>{handleChange(e)}}/>
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
                <button className="button is-dark" type="submit">Add Pet</button>

            </form>
            {images.length?<div className={"slideshow-container column is-4"}>

        {showImages}

        {images.length<=1?null:<><a className="prev" onClick={()=>{plusSlides(-1)}}>&#10094;</a>
        <a className="next" onClick={()=>{plusSlides(1)}}>&#10095;</a></>}
        </div>:<div className="column is-4"></div>}
            
        </div>


</>
  )
}


export default AddPet