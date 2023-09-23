import { useState } from 'react'
import './CreatePostStyles.css'
import { BiImageAdd, BiArrowBack } from 'react-icons/bi'
import { Link } from 'react-router-dom'
const CreatePost = () => {
    const [image, setImage] = useState(null)
    const [imgFit, setImgFit] = useState('cover')
    const [postData, setPostData] = useState({
        caption: '',
        imageFit: imgFit,
        location: ''
    })

    const handleDataChange = (e) => {
    }

    const handleImgChange = (e) => {
        let reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            let base64 = (reader.result);
            setImage(base64)
        }
    }

    const handleImgFit = (e) => {
        setImgFit(e.target.name);
    }

    return (
        <div className="createpost-wrapper">
            <div className="createpost-cover">
                <div className='createpost-header'>
                    <Link to={'/'}>
                        <BiArrowBack />
                    </Link>
                    <div>
                        <p >Create new post</p>
                    </div>
                </div>
                <div className="createpost">


                    <div className='createpost-img'>
                        {(image) &&
                            <img src={image} alt="" style={{ objectFit: imgFit }} />
                        }
                        {(!image) &&
                            <div className='input-file'>
                                <BiImageAdd />
                                <label htmlFor="file">Choose a Picture</label>
                                <input id='file' className="file" type="file" onChange={handleImgChange} />
                            </div>
                        }
                    </div>

                    <div className='createpost-post-info'>
                        <div className='user-info'>
                            <img src="/assets/man.png" alt="" />
                            <p>ksdxnawk;ndkw;</p>
                        </div>
                        <textarea value={postData.caption} onChange={handleDataChange} name="" id="" cols="30" rows="10" placeholder='Write a caption ...'></textarea>
                        <div className='img-fit'>
                            <p>Choose Image Fit</p>
                            <div className='img-fit-buttons'>
                                <button name='cover' onClick={handleImgFit} className={(imgFit === 'cover') ? 'btn-selected' : ''}>Cover</button>
                                <button name='contain' onClick={handleImgFit} className={(imgFit === 'contain') ? 'btn-selected' : ''}>Contain</button>
                            </div>
                        </div>
                        <div className='create-post-location'>
                            <input type="text" placeholder='Add location' />
                        </div>
                    </div>


                </div>
            </div>
        </div >
    )
}
export default CreatePost