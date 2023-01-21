import { useState, FormEvent } from 'react'
import {
  FaEnvelope,
  FaLocationArrow,
  FaPhoneAlt,
  FaTwitter,
} from 'react-icons/fa'
import Card from '../../components/card/Card'
import { contactUs } from '../../services/authService'
import './Contact.scss'
const Contact = () => {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const sendMail = async (e: FormEvent) => {
    e.preventDefault()
    await contactUs({ subject, message })
    setSubject('')
    setMessage('')
  }
  return (
    <div className='contact'>
      <h3 className='--mt'>Contact Us</h3>
      <div className='section'>
        <form onSubmit={sendMail}>
          <input
            type='text'
            name='subject'
            value={subject}
            placeholder='Subject'
            required
            onChange={(e) => setSubject(e.target.value)}
          />
          <textarea
            name='message'
            value={message}
            placeholder='Message'
            required
            onChange={(e) => setMessage(e.target.value)}
            cols={40}
            rows={5}
          />
          <button className='--btn --btn-primary'>Send Message</button>
        </form>

        <Card cardClass={'contact'}>
          <h3>Contact Information</h3>
          <p>
            <FaPhoneAlt />
            &nbsp; 0123456789
          </p>
          <p>
            <FaEnvelope /> &nbsp; bobanpp@dummy.com
          </p>
          <p>
            <FaLocationArrow /> &nbsp; Niš, Srbija
          </p>
          <p>
            <FaTwitter /> &nbsp; @bobanpp
          </p>
        </Card>
      </div>
    </div>
  )
}

export default Contact
