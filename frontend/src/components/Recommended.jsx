import './RecommendedStyles.css'
import { FaRegThumbsUp } from 'react-icons/fa'
const Recommended = () => {
    return (
        <div className='recommended'>
            <p className='recommended-heading'><FaRegThumbsUp />RECOMMENDED GROUPS</p>
            <div className='recommended-list'>
                <div className='items'>
                    <div >
                        <img src="/assets/leisure.png" alt="" />
                        <p>Leisure</p>
                    </div>
                    <span>Follow</span>
                </div>
                <div className='items'>
                    <div >
                        <img src="/assets/activism.png" alt="" />
                        <p>Activism</p>
                    </div>
                    <span>Follow</span>
                </div>
                <div className='items'>
                    <div >
                        <img src="/assets/mba.png" alt="" />
                        <p>MBA</p>
                    </div>
                    <span>Follow</span>
                </div>
                <div className='items'>
                    <div >
                        <img src="/assets/philosophy.png" alt="" />
                        <p>Philosophy</p>
                    </div>
                    <span>Follow</span>
                </div>
            </div>
            <p className='see-more'>See More...</p>
        </div>
    )
}
export default Recommended