import { MdOutlineLocationOn } from 'react-icons/md'
import { BiSolidPencil, BiErrorCircle } from 'react-icons/bi'
import { RxCross1 } from 'react-icons/rx'
import './LocationStyles.css'
import { useState } from 'react'
const Location = () => {
    const [inpSelect, setInpSelect] = useState(false)
    const handleInpSelect = (type) => {
        if (type === 'input') {
            setInpSelect(true)
        }
        if (type === 'cross' || type === 'body')
            setInpSelect(false)
    }

    document.body.addEventListener('click', (e) => {
        {
            if (e.target.className != "loc-inp-input")
                handleInpSelect('body')
        }
    })

    return (
        <div className="location">
            <div className='location-inp'>
                <MdOutlineLocationOn />
                <input type="text" className='loc-inp-input' placeholder='|Enter your location' onClick={() => { handleInpSelect('input') }} />
                {inpSelect ? <RxCross1 onClick={() => { handleInpSelect('cross') }} /> :
                    <BiSolidPencil />
                }
            </div>
            <hr />
            <div className='location-message'>
                <BiErrorCircle />
                <p>Your location will help us serve better and extend a personalised experience.</p>
            </div>
        </div>
    )
}
export default Location