import './css/SupportPopup.scss'

export default function SupportPopup(){
    return(
        <div className='support-popup'>
            <input type="text" className='support__email' placeholder='email'/>
            <textarea className='support__description' placeholder='description'/>
            <button className='support__send-btn'>Send</button>
        </div>
    )
}